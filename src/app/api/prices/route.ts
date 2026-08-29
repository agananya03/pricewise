
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function POST(req: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { barcode, price, store, productData, latitude, longitude } = body

        if (!barcode || !price || !store) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        const numericPrice = typeof price === "number" ? price : parseFloat(price)
        const latNum = latitude !== undefined && latitude !== null ? parseFloat(latitude) : undefined
        const lonNum = longitude !== undefined && longitude !== null ? parseFloat(longitude) : undefined

        // 1. Upsert Product to ensure it exists in DB
        const product = await prisma.product.upsert({
            where: { barcode },
            update: {}, 
            create: {
                barcode,
                name: productData?.name || "Unknown Product",
                category: productData?.category || "Uncategorized",
                imageUrl: productData?.imageUrl,
                source: "api_submission",
            },
        })

        // 2. Find or Create Store
        let storeRecord = await prisma.store.findFirst({
            where: { name: store }
        })

        if (!storeRecord) {
            storeRecord = await prisma.store.create({
                data: {
                    name: store,
                    address: "User Submitted",
                    city: "Unknown",
                    state: "XX",
                    zipCode: "00000",
                    latitude: latNum ?? 0,
                    longitude: lonNum ?? 0
                }
            })
        } else if (latNum !== undefined && lonNum !== undefined && (storeRecord.latitude === 0 && storeRecord.longitude === 0)) {
            // Update store location if it previously had zero placeholders
            storeRecord = await prisma.store.update({
                where: { id: storeRecord.id },
                data: {
                    latitude: latNum,
                    longitude: lonNum
                }
            })
        }

        // 3. Create Price
        const newPrice = await prisma.price.create({
            data: {
                product: { connect: { id: product.id } },
                amount: numericPrice,
                store: { connect: { id: storeRecord.id } },
                latitude: latNum,
                longitude: lonNum,
                verified: false,
            },
        })

        // 4. Evaluate Price Alerts
        const matchingAlerts = await prisma.priceAlert.findMany({
            where: {
                productId: product.id,
                active: true,
                targetPrice: {
                    gte: numericPrice, // Price dropped below or reached target
                },
            },
        })

        if (matchingAlerts.length > 0) {
            await prisma.priceAlert.updateMany({
                where: {
                    id: { in: matchingAlerts.map(a => a.id) }
                },
                data: {
                    notified: true
                }
            })
        }

        return NextResponse.json({
            ...newPrice,
            alertsTriggeredCount: matchingAlerts.length,
            triggeredAlerts: matchingAlerts
        })
    } catch (error) {
        console.error("Error creating price:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

