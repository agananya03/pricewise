
import axios from 'axios';

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
    // Note: UPC Database usually requires an API key, implemented here as a placeholder structure
    // private static readonly UPC_API_URL = 'https://api.upcdatabase.org/product'; 

    static async search(barcode: string): Promise<ProductData | null> {
        // Try Open Food Facts first (free, no key required)
        const offResult = await this.fetchFromOpenFoodFacts(barcode);
        if (offResult) return offResult;

        // Fallback to other providers or return null
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
