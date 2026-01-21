import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
    try {
        const topSavers = await prisma.user.findMany({
            orderBy: { totalSaved: 'desc' },
            take: 10,
            select: {
                id: true,
                name: true,
                image: true,
                totalSaved: true,
                achievements: {
                    select: { type: true }
                }
            }
        })

        return NextResponse.json(topSavers)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 })
    }
}
