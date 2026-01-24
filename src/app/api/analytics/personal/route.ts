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

        // Fetch real receipts for the logged-in user
        const receipts = await prisma.receipt.findMany({
            where: { userId: session.user.id },
            orderBy: { date: 'desc' },
            take: 50,
            include: { items: true }
        })

        // 1. Calculate Totals
        const totalSpent = receipts.reduce((sum, r) => sum + r.total, 0)

        // Fetch user stats for exact totalSaved
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { totalSaved: true }
        })
        const totalSaved = user?.totalSaved || 0

        // 2. Spending Trends (Last 6 months)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const spendingData = new Array(6).fill(0)
        const labels = []

        const today = new Date()
        for (let i = 5; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
            labels.push(months[d.getMonth()])
        }

        receipts.forEach(r => {
            const date = new Date(r.date)
            const diffMonths = (today.getFullYear() - date.getFullYear()) * 12 + (today.getMonth() - date.getMonth())
            if (diffMonths >= 0 && diffMonths < 6) {
                // index 0 = 5 months ago, index 5 = this month
                spendingData[5 - diffMonths] += r.total
            }
        })

        // 3. Category Breakdown
        const categories = [
            { name: "Groceries", value: 0, fill: "#22c55e" }, // green
            { name: "Electronics", value: 0, fill: "#3b82f6" }, // blue
            { name: "Home", value: 0, fill: "#f59e0b" }, // amber
            { name: "Other", value: 0, fill: "#94a3b8" }, // slate
        ]

        receipts.forEach(r => {
            // Naive categorization logic
            if (r.store.toLowerCase().includes('mart') || r.store.toLowerCase().includes('food')) {
                categories[0].value += r.total
            } else if (r.store.toLowerCase().includes('tech') || r.store.toLowerCase().includes('buy')) {
                categories[1].value += r.total
            } else {
                categories[3].value += r.total
            }
        })

        const finalCategories = categories.filter(c => c.value > 0)

        // Return real data (empty if no data, don't fallback to dummy data)
        return NextResponse.json({
            summary: {
                totalSpent: totalSpent,
                totalSaved: totalSaved,
                dealCount: receipts.length,
            },
            charts: {
                spending: {
                    labels,
                    data: spendingData
                },
                categories: finalCategories
            },
            recentActivity: receipts.slice(0, 5).map(r => ({
                id: r.id,
                store: r.store,
                date: new Date(r.date).toLocaleDateString(),
                amount: r.total
            }))
        })

    } catch (error) {
        console.error("Analytics Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
