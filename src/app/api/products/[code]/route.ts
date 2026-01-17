
import { NextRequest, NextResponse } from "next/server";
import { ProductLookupService } from "@/services/product/lookup";

export const dynamic = 'force-dynamic';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ code: string }> }
) {
    const code = (await params).code;

    if (!code) {
        return NextResponse.json(
            { error: "Product code is required" },
            { status: 400 }
        );
    }

    try {
        const product = await ProductLookupService.search(code);

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
