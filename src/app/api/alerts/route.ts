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
        const { productId, targetPrice, condition } = body

        if (!productId || !targetPrice || !condition) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        const alert = await prisma.priceAlert.create({
            data: {
                userId: session.user.id,
                productId,
                targetPrice,
                condition, // "BELOW" or "ABOVE" - make sure this matches enum in schema?
                // Schema has AlertCondition enum: BELOW, ABOVE, CHANGE, DEAL
            }
        })

        return NextResponse.json(alert)
    } catch (error) {
        console.error("Error creating alert:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
