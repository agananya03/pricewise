import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        // In a real app, we'd filter by authenticated user ID
        // const session = await auth()
        // const userId = session?.user?.id

        // For demo, fetch recent receipts
        const receipts = await prisma.receipt.findMany({
            orderBy: { date: 'desc' },
            take: 50,
            include: { items: true }
        })

        // 1. Calculate Totals
        const totalSpent = receipts.reduce((sum, r) => sum + r.total, 0)

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

        // If no data, fill with dummy data for demo visualization
        const finalSpendingData = totalSpent > 0 ? spendingData : [120, 190, 300, 250, 400, 320]

        // 3. Category Breakdown (Simulated based on dummy store names or item names)
        // Since our Receipt model is simple, we might guess categories
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

        // Fallback demo data if empty
        const finalCategories = categories.some(c => c.value > 0)
            ? categories.filter(c => c.value > 0)
            : [
                { name: "Groceries", value: 450, fill: "#22c55e" },
                { name: "Electronics", value: 300, fill: "#3b82f6" },
                { name: "Dining", value: 150, fill: "#f59e0b" },
                { name: "Transport", value: 80, fill: "#8b5cf6" },
            ]

        // 4. Savings (Randomized for demo or calculated against MSRP)
        const totalSaved = Math.round(totalSpent * 0.12) // Assume 12% savings average

        return NextResponse.json({
            summary: {
                totalSpent: totalSpent > 0 ? totalSpent : 1245.50,
                totalSaved: totalSaved > 0 ? totalSpent * 0.12 : 185.20,
                dealCount: receipts.length > 0 ? receipts.length : 14,
            },
            charts: {
                spending: {
                    labels,
                    data: finalSpendingData
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
