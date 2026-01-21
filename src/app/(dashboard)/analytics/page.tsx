"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SpendingChart } from "@/components/analytics/spending-chart"
import { CategoryBreakdown } from "@/components/analytics/category-breakdown"
import { ExportControls } from "@/components/analytics/export-controls"
import { ArrowDown, DollarSign, PiggyBank, TrendingUp, Wallet } from "lucide-react"

export default function AnalyticsPage() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/analytics/personal')
            .then(res => res.json())
            .then(data => {
                setData(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [])

    if (loading || !data) {
        return <div className="p-8 text-center">Loading analytics...</div>
    }

    const { summary, charts, recentActivity } = data

    return (
        <div className="container py-12 space-y-12 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-foreground pb-6">
                <div>
                    <h1 className="text-6xl font-black tracking-tighter uppercase mb-2">Financial <br /> Analytics</h1>
                    <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm max-w-md">
                        Ledger analysis of spending categories and shopping habits.
                    </p>
                </div>
                <ExportControls data={data} />
            </div>

            {/* Metrics Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="rounded-none border-foreground shadow-none transition-all hover:bg-foreground/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-foreground/10 mx-4 px-0 pt-4">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider">Total Spent</CardTitle>
                        <DollarSign className="h-4 w-4 text-foreground" />
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="text-3xl font-black tracking-tighter">${summary.totalSpent.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground font-mono mt-1 font-bold">+2.5% FROM LAST MONTH</p>
                    </CardContent>
                </Card>
                <Card className="rounded-none border-foreground shadow-none transition-all hover:bg-foreground/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-foreground/10 mx-4 px-0 pt-4">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider">Estimated Savings</CardTitle>
                        <PiggyBank className="h-4 w-4 text-foreground" />
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="text-3xl font-black tracking-tighter text-foreground">${summary.totalSaved.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground font-mono mt-1 font-bold">SAVED ~12% ON DEALS</p>
                    </CardContent>
                </Card>
                <Card className="rounded-none border-foreground shadow-none transition-all hover:bg-foreground/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-foreground/10 mx-4 px-0 pt-4">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider">Receipts</CardTitle>
                        <FileText className="h-4 w-4 text-foreground" />
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="text-3xl font-black tracking-tighter">{summary.dealCount}</div>
                        <p className="text-xs text-muted-foreground font-mono mt-1 font-bold">SCANNED RECEIPTS</p>
                    </CardContent>
                </Card>
                <Card className="rounded-none border-foreground shadow-none transition-all hover:bg-foreground/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-foreground/10 mx-4 px-0 pt-4">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider">Avg. Transaction</CardTitle>
                        <Wallet className="h-4 w-4 text-foreground" />
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="text-3xl font-black tracking-tighter">${(summary.totalSpent / Math.max(summary.dealCount, 1)).toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground font-mono mt-1 font-bold">PER SHOPPING TRIP</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-7">
                <SpendingChart data={charts.spending.data} labels={charts.spending.labels} />
                <CategoryBreakdown data={charts.categories} />
            </div>

            {/* Recent Table */}
            <Card className="rounded-none border-foreground shadow-none">
                <CardHeader className="border-b border-foreground pb-4">
                    <CardTitle className="uppercase font-black tracking-tight text-xl">Recent Transactions</CardTitle>
                    <CardDescription className="uppercase text-xs font-bold text-muted-foreground tracking-wider">Five most recent inputs</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        {recentActivity.map((activity: any) => (
                            <div key={activity.id} className="flex items-center justify-between border-b border-foreground/10 pb-4 last:border-0 last:pb-0 hover:bg-foreground/5 p-2 transition-colors -mx-2 px-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold uppercase tracking-tight">{activity.store}</p>
                                    <p className="text-xs text-muted-foreground font-mono">{activity.date}</p>
                                </div>
                                <div className="font-bold flex items-center font-mono text-lg">
                                    ${activity.amount.toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
import { FileText } from "lucide-react"
