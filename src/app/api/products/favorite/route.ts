import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
    try {
        const { productId } = await req.json()

        // Mock user
        const user = await prisma.user.findFirst()
        if (!user) throw new Error("No user")

        // Check if exists
        const existing = await prisma.favoriteProduct.findUnique({
            where: {
                userId_productId: {
                    userId: user.id,
                    productId
                }
            }
        })

        if (existing) {
            // Remove
            await prisma.favoriteProduct.delete({
                where: { id: existing.id }
            })
            return NextResponse.json({ favorited: false })
        } else {
            // Add
            await prisma.favoriteProduct.create({
                data: {
                    userId: user.id,
                    productId
                }
            })
            return NextResponse.json({ favorited: true })
        }

    } catch (error) {
        return NextResponse.json({ error: "Failed to toggle favorite" }, { status: 500 })
    }
}
