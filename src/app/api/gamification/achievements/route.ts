import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
    try {
        // Demostration: Get first user's achievements
        const user = await prisma.user.findFirst({
            include: { achievements: true }
        })

        if (!user) return NextResponse.json([])

        return NextResponse.json(user.achievements)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const { type } = await req.json()
        const user = await prisma.user.findFirst()
        if (!user) throw new Error("No user")

        // Check if already unlocked
        const existing = await prisma.achievement.findFirst({
            where: { userId: user.id, type }
        })

        if (existing) return NextResponse.json(existing)

        const achievement = await prisma.achievement.create({
            data: {
                userId: user.id,
                type
            }
        })
        return NextResponse.json(achievement)
    } catch (error) {
        return NextResponse.json({ error: "Failed to unlock" }, { status: 500 })
    }
}
