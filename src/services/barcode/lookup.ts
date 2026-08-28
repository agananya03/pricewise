import { prisma } from '@/lib/prisma';
import { ProductLookupService as ExternalProductLookupService } from '@/services/product/lookup';

export class ProductLookupService {
    async findOrCreateProduct(barcode: string) {
        // 1. Try to find in local DB
        const existing = await prisma.product.findUnique({
            where: { barcode },
        });

        if (existing) return existing;

        // 2. Fetch external product data (uses Redis cache + OpenFoodFacts)
        const externalData = await ExternalProductLookupService.search(barcode);

        return await prisma.product.create({
            data: {
                barcode,
                name: externalData?.name || `Unknown Product (${barcode})`,
                category: externalData?.category || 'Uncategorized',
                brand: externalData?.brand,
                imageUrl: externalData?.imageUrl,
                description: externalData?.description || 'Auto-created from scan',
                source: externalData?.source || 'manual',
            },
        });
    }
}

