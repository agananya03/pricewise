
import axios, { AxiosError } from 'axios';
import { redis } from '@/lib/redis';

export interface ProductData {
    barcode: string;
    name: string;
    description?: string;
    imageUrl?: string;
    category?: string;
    brand?: string;
    source: 'OpenFoodFacts' | 'UPCDatabase' | 'Unknown';
}

export class ProductLookupService {
    private static readonly OFF_API_URL = 'https://world.openfoodfacts.org/api/v2/product';
    private static readonly CACHE_TTL_SECONDS = 60 * 60 * 24; // Cache for 24 hours

    static async search(barcode: string): Promise<ProductData | null> {
        const cacheKey = `product:${barcode}`;

        // 1. Check Redis cache first
        try {
            const cachedProduct = await redis.get<ProductData>(cacheKey);
            if (cachedProduct) {
                console.log(`[Redis Cache Hit] Product barcode: ${barcode}`);
                return cachedProduct;
            }
        } catch (err) {
            console.warn('[Redis Cache Error] Proceeding without cache:', err);
        }

        // 2. Fetch from Open Food Facts if cache miss
        const offResult = await this.fetchFromOpenFoodFacts(barcode);
        
        if (offResult) {
            // Save result to Redis cache
            try {
                await redis.set(cacheKey, offResult, { ex: this.CACHE_TTL_SECONDS });
                console.log(`[Redis Cache Set] Product barcode: ${barcode}`);
            } catch (err) {
                console.warn('[Redis Cache Write Error]:', err);
            }
            return offResult;
        }

        // 3. Fallback for non-food / unlisted / unavailable external API barcodes
        const fallbackResult: ProductData = {
            barcode,
            name: `Scanned Item (${barcode.slice(-4)})`,
            description: 'Product information temporarily unavailable.',
            category: 'General Goods',
            source: 'Unknown',
        };

        return fallbackResult;
    }



    private static async fetchFromOpenFoodFacts(
        barcode: string,
        retries = 2,
        delayMs = 500
    ): Promise<ProductData | null> {
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const response = await axios.get(`${this.OFF_API_URL}/${barcode}.json`, {
                    timeout: 5000, // 5 second timeout
                    headers: {
                        'User-Agent': 'PricewiseApp/1.0 (https://github.com/agananya03/pricewise)'
                    }
                });

                const data = response.data;

                // Validate response payload
                if (data && data.status === 1 && data.product && typeof data.product === 'object') {
                    return {
                        barcode: data.product._id || barcode,
                        name: typeof data.product.product_name === 'string' && data.product.product_name.trim() !== ''
                            ? data.product.product_name
                            : 'Unknown Product',
                        description: typeof data.product.generic_name === 'string' ? data.product.generic_name : undefined,
                        imageUrl: typeof data.product.image_url === 'string' ? data.product.image_url : undefined,
                        category: typeof data.product.categories === 'string' ? data.product.categories : undefined,
                        brand: typeof data.product.brands === 'string' ? data.product.brands : undefined,
                        source: 'OpenFoodFacts',
                    };
                }
                // Product not found in OFF catalog (status !== 1)
                return null;
            } catch (error: unknown) {
                const axiosErr = error as AxiosError;
                // Handle 429 Rate Limit
                if (axiosErr.response?.status === 429) {
                    console.warn(`[OpenFoodFacts Rate Limit] 429 Too Many Requests for barcode: ${barcode}`);
                    return null;
                }

                const isNetworkOr5xx = !axiosErr.response || (axiosErr.response.status >= 500 && axiosErr.response.status < 600);

                // Selective Retry for network errors and 5xx server issues
                if (isNetworkOr5xx && attempt < retries) {
                    console.warn(`[OpenFoodFacts Retry] Attempt ${attempt + 1}/${retries} failed (${axiosErr.message}). Retrying in ${delayMs}ms...`);
                    await new Promise((res) => setTimeout(res, delayMs));
                    delayMs *= 2; // Exponential backoff
                    continue;
                }

                console.error(`[OpenFoodFacts Error] Final failure for barcode ${barcode}:`, axiosErr.message);
                break;
            }
        }
        return null;
    }
}

