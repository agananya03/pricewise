import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ProductLookupService } from '@/services/barcode/lookup';
import { z } from 'zod';

const barcodeSchema = z.object({
    code: z.string().min(3).max(20), // Adjusted constraints
    latitude: z.number().optional(),
    longitude: z.number().optional(),
});

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { code, latitude, longitude } = barcodeSchema.parse(body);

        // Lookup product
        const lookupService = new ProductLookupService();
        const product = await lookupService.findOrCreateProduct(code);

        // Save scan
        await prisma.scan.create({
            data: {
                userId: session.user.id,
                type: 'BARCODE',
                rawData: { code },
                results: { productId: product.id },
                latitude,
                longitude,
            },
        });

        return NextResponse.json({
            success: true,
            product,
        });
    } catch (error) {
        console.error('Barcode scan error:', error);
        return NextResponse.json(
            { error: 'Failed to process barcode' },
            { status: 500 }
        );
    }
}