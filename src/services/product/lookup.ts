
import axios from 'axios';
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

        return null;
    }

    private static async fetchFromOpenFoodFacts(barcode: string): Promise<ProductData | null> {
        try {
            const response = await axios.get(`${this.OFF_API_URL}/${barcode}.json`);
            const data = response.data;

            if (data.status === 1 && data.product) {
                return {
                    barcode: data.product._id || barcode,
                    name: data.product.product_name || 'Unknown Product',
                    description: data.product.generic_name,
                    imageUrl: data.product.image_url,
                    category: data.product.categories,
                    brand: data.product.brands,
                    source: 'OpenFoodFacts',
                };
            }
        } catch (error) {
            console.error(`Error fetching from OpenFoodFacts for ${barcode}:`, error);
        }
        return null;
    }
}

