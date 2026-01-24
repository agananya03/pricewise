import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function GET() {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Find or create default list for the logged-in user
        const list = await prisma.shoppingList.findFirst({
            where: { userId: session.user.id },
            include: {
                items: {
                    include: {
                        product: {
                            include: { prices: true }
                        }
                    },
                    orderBy: {
                        id: 'asc'
                    }
                }
            }
        })

        return NextResponse.json(list || { items: [] })
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch list" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { productId, name, quantity, listId } = body

        let targetListId = listId

        // If no list provided, find first or create for this user
        if (!targetListId) {
            const firstList = await prisma.shoppingList.findFirst({
                where: { userId: session.user.id }
            })
            if (firstList) {
                targetListId = firstList.id
            } else {
                const newList = await prisma.shoppingList.create({
                    data: {
                        name: "My Shopping List",
                        userId: session.user.id
                    }
                })
                targetListId = newList.id
            }
        }

        let finalProductId = productId
        let finalName = name || "Unknown Item"

        // Auto-link: If no productId, try to find a product by name
        if (!finalProductId && name) {
            const productMatch = await prisma.product.findFirst({
                where: {
                    name: { contains: name, mode: 'insensitive' }
                },
                include: { prices: true }
            })

            if (productMatch) {
                finalProductId = productMatch.id
            }
        }

        const item = await prisma.shoppingListItem.create({
            data: {
                shoppingListId: targetListId,
                productId: finalProductId,
                name: finalName,
                quantity: quantity || 1
            },
            include: { // Return item WITH product data so UI updates immediately
                product: {
                    include: { prices: true }
                }
            }
        })

        return NextResponse.json(item)

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to add item" }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { itemId, checked } = body

        const updated = await prisma.shoppingListItem.update({
            where: { id: itemId },
            data: { checked }
        })

        return NextResponse.json(updated)
    } catch (error) {
        return NextResponse.json({ error: "Failed to update item" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const url = new URL(req.url)
        const itemId = url.searchParams.get("itemId")

        if (!itemId) throw new Error("No item ID")

        await prisma.shoppingListItem.delete({
            where: { id: itemId }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete item" }, { status: 500 })
    }
}
