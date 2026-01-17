"use client"

import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, AreaChart, Area, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface SpendingChartProps {
    data?: number[]
    labels?: string[]
}

export function SpendingChart({ data, labels }: SpendingChartProps) {
    // Default Demo Data if no props provided
    const demoData = [120, 300, 240, 450, 380, 520]
    const demoLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

    const finalData = data || demoData
    const finalLabels = labels || demoLabels

    // Safety check: ensure lengths match or slice
    const chartData = finalLabels.map((label, i) => ({
        month: label,
        amount: finalData[i] || 0
    }))

    return (
        <Card className="col-span-4 h-full">
            <CardHeader>
                <CardTitle>Spending History</CardTitle>
                <CardDescription>Your monthly expenditure over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="month"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                            <Tooltip
                                formatter={(value: number) => [`$${value.toFixed(2)}`, "Spent"]}
                                contentStyle={{ borderRadius: '8px' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="amount"
                                stroke="#22c55e"
                                fillOpacity={1}
                                fill="url(#colorAmount)"
                                strokeWidth={3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
