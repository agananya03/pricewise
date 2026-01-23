import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
    try {
        // Mock user for demo - normally get from session
        // const userId = ...

        // Find or create default list
        const lists = await prisma.shoppingList.findMany({
            include: {
                items: {
                    include: {
                        product: {
                            include: { prices: true }
                        }
                    }
                }
            }
        })

        // For demo purposes, if no list exists, we might return empty or create one?
        // Let's assume the frontend handles creation or we return empty.

        // We really need a userId to query. Since we don't have auth fully wired in these snippets,
        // we'll fetch the first list found (dangerous in prod, fine for single-user local demo).
        const list = lists[0]

        return NextResponse.json(list || null)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch list" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { productId, name, quantity, listId } = body

        let targetListId = listId

        // If no list provided, find first or create
        if (!targetListId) {
            const firstList = await prisma.shoppingList.findFirst()
            if (firstList) {
                targetListId = firstList.id
            } else {
                // Create default list
                let user = await prisma.user.findFirst() // Fallback user

                if (!user) {
                    // Create a demo user if none exists
                    user = await prisma.user.create({
                        data: {
                            email: "demo@pricewise.app",
                            name: "Demo User"
                        }
                    })
                }

                const newList = await prisma.shoppingList.create({
                    data: {
                        name: "My Shopping List",
                        userId: user.id
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
                // Use the precise product name if we found a match? 
                // formattedName = productMatch.name 
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
