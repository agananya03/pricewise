"use client"

import { SpendingChart } from "@/components/analytics/spending-chart"
import { CategoryBreakdown } from "@/components/analytics/category-breakdown"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScanBarcode, ShoppingBag, TrendingDown, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function DashboardPage() {
    const [stats, setStats] = useState({ saved: 0, total: 0, items: 0 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/analytics/personal')
            .then(res => res.json())
            .then(data => {
                setStats({
                    saved: data.totalSaved || 10450.00, // Fallback for demo
                    total: data.totalSpent || 38500.20,
                    items: data.totalItems || 15
                })
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    return (
        <div className="space-y-8 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back! Here's your savings overview.</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/scan">
                        <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                            <ScanBarcode className="mr-2 h-5 w-5" />
                            Scan New Item
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
                        <TrendingDown className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">₹{stats.saved.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{stats.total.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Items Tracked</CardTitle>
                        <ScanBarcode className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.items}</div>
                        <p className="text-xs text-muted-foreground">+5 new items this week</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid gap-8 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Spending Trends</CardTitle>
                        <CardDescription>Your spending activity over the last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <SpendingChart />
                    </CardContent>
                </Card>
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Spending by Category</CardTitle>
                        <CardDescription>Where your money is going</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CategoryBreakdown />
                    </CardContent>
                </Card>
            </div>

            {/* Quick Links / Recent Activity Placeholder */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Scans</CardTitle>
                        <CardDescription>Your recently scanned products and their prices.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
                                            📦
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">Sample Product {i}</p>
                                            <p className="text-xs text-muted-foreground">Scanned 2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="font-medium">
                                        ₹399.00
                                    </div>
                                </div>
                            ))}
                            <Link href="/history" className="block w-full">
                                <Button variant="outline" className="w-full mt-4">
                                    View Scan History <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Link href="/shopping-list" className="block">
                            <Button variant="secondary" className="w-full justify-start h-12">
                                <ShoppingBag className="mr-2 h-5 w-5" /> Manage Shopping List
                            </Button>
                        </Link>
                        <Link href="/community" className="block">
                            <Button variant="secondary" className="w-full justify-start h-12">
                                <TrendingDown className="mr-2 h-5 w-5" /> Check Leaderboard
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
