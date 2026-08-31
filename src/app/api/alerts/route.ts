import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function POST(req: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
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
                user: {
                    connect: {
                        id: session.user.id
                    }
                },
                productId,
                targetPrice,
                condition: condition,
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

export async function GET() {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const alerts = await prisma.priceAlert.findMany({
            where: {
                userId: session.user.id,
                active: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return NextResponse.json(alerts)
    } catch (error) {
        console.error("Error fetching alerts:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json({ error: "Alert ID required" }, { status: 400 })
        }

        const alert = await prisma.priceAlert.findUnique({
            where: { id },
        })

        if (!alert || alert.userId !== session.user.id) {
            return NextResponse.json({ error: "Alert not found or forbidden" }, { status: 404 })
        }

        await prisma.priceAlert.delete({
            where: { id },
        })

        return NextResponse.json({ success: true, id })
    } catch (error) {
        console.error("Error deleting alert:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

