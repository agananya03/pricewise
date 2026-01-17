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
        <div className="container py-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Financial Analytics</h1>
                    <p className="text-muted-foreground">
                        Track your spending, categories, and shopping habits.
                    </p>
                </div>
                <ExportControls data={data} />
            </div>

            {/* Metrics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${summary.totalSpent.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Estimated Settings</CardTitle>
                        <PiggyBank className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">${summary.totalSaved.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">You saved ~12% on deals</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Receipts</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{summary.dealCount}</div>
                        <p className="text-xs text-muted-foreground">Scanned receipts</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Transaction</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${(summary.totalSpent / summary.dealCount).toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Per shopping trip</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-7">
                <SpendingChart data={charts.spending.data} labels={charts.spending.labels} />
                <CategoryBreakdown data={charts.categories} />
            </div>

            {/* Recent Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Your last 5 purchases</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentActivity.map((activity: any) => (
                            <div key={activity.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">{activity.store}</p>
                                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                                </div>
                                <div className="font-medium flex items-center">
                                    <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
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
