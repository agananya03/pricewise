import { NextRequest, NextResponse } from 'next/server';

export const dynamic = "force-dynamic"
import { auth } from '@/lib/auth';
import { PriceComparator } from '@/services/pricing/comparator';
import { z } from 'zod';

const compareSchema = z.object({
    productId: z.string(),
    currentPrice: z.number().positive(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    radius: z.number().default(10),
});

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { productId, currentPrice, latitude, longitude, radius } =
            compareSchema.parse(body);

        const comparator = new PriceComparator();
        const comparison = await comparator.comparePrice(
            productId,
            currentPrice,
            latitude,
            longitude,
            radius
        );

        return NextResponse.json(comparison);
    } catch (error) {
        console.error('Price comparison error:', error);
        return NextResponse.json(
            { error: 'Failed to compare prices' },
            { status: 500 }
        );
    }
}