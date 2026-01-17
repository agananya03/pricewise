import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const q = searchParams.get("q") || ""

        // if (q.length < 2) return NextResponse.json({ products: [] })

        const products = await prisma.product.findMany({
            where: q ? {
                name: { contains: q, mode: 'insensitive' }
            } : undefined,
            take: 20,
            include: {
                prices: {
                    orderBy: { amount: 'asc' },
                    take: 1
                }
            }
        })

        return NextResponse.json({ products })
    } catch (error) {
        return NextResponse.json({ error: "Search failed" }, { status: 500 })
    }
}
