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
        <Card className="col-span-4 h-full rounded-none border-black shadow-none">
            <CardHeader className="border-b border-black pb-4">
                <CardTitle className="uppercase font-black tracking-tight">Spending History</CardTitle>
                <CardDescription className="uppercase text-xs font-bold text-black/60 tracking-wider">Your monthly expenditure over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="month"
                                stroke="#000000"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: 'black', fontFamily: 'monospace', fontWeight: 'bold' }}
                                dy={10}
                            />
                            <YAxis
                                stroke="#000000"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`}
                                tick={{ fill: 'black', fontFamily: 'monospace' }}
                            />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} stroke="#000000" />
                            <Tooltip
                                formatter={(value: any) => [`$${Number(value).toFixed(2)}`, "Spent"]}
                                contentStyle={{ borderRadius: '0px', border: '1px solid black', boxShadow: 'none' }}
                                itemStyle={{ color: 'black', fontFamily: 'monospace', fontWeight: 'bold' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="amount"
                                stroke="#000000"
                                fillOpacity={1}
                                fill="url(#colorAmount)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
