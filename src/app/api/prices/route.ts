
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function POST(req: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { barcode, price, store, productData } = body

        if (!barcode || !price || !store) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        // 1. Upsert Product to ensure it exists in our DB
        // We use the data fetched from the API (passed in body) to populate it if it's new
        const product = await prisma.product.upsert({
            where: { barcode },
            update: {}, // No updates if it exists
            create: {
                barcode,
                name: productData.name || "Unknown Product",
                category: productData.category || "Uncategorized",
                imageUrl: productData.imageUrl,
                source: "api_submission", // Marker that this was added via user submission flow
            },
        })

        // 2. Find or Create Store
        // For now, we simple-match by name. In future, use geo-location.
        let storeRecord = await prisma.store.findFirst({
            where: { name: store }
        })

        if (!storeRecord) {
            // Create a dummy store for now if not found (or ideally require structured store selection)
            // Since schema requires address/lat/long, we'll put placeholders or make them optional in schema?
            // Checking schema: address, city, state are required. 
            // We will mock them for this simple "text entry" version or strictly we should change schema.
            // For this MVP, let's create a "User Submitted Store" or just handle the Price without a Store relation if allowed?
            // Schema: storeId is optional on Price. So we can just set storeId to null if store doesn't exist, 
            // OR we create a store. Let's create a store with placeholder data to satisfy schema constraints for now.
            storeRecord = await prisma.store.create({
                data: {
                    name: store,
                    address: "User Submitted",
                    city: "Unknown",
                    state: "XX",
                    zipCode: "00000",
                    latitude: 0,
                    longitude: 0
                }
            })
        }

        // 3. Create Price
        const newPrice = await prisma.price.create({
            data: {
                product: { connect: { id: product.id } },
                amount: price,
                store: { connect: { id: storeRecord.id } },
                verified: false, // User submitted
            },
        })

        return NextResponse.json(newPrice)
    } catch (error) {
        console.error("Error creating price:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
