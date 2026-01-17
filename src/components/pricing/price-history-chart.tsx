"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PriceHistoryChartProps {
    data: {
        date: string
        price: number
        store: string
    }[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background border rounded-lg shadow-sm p-3 text-sm">
                <p className="font-medium mb-1">{label}</p>
                <p className="text-primary font-bold">
                    ${payload[0].value.toFixed(2)}
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                    {payload[0].payload.store}
                </p>
            </div>
        )
    }
    return null
}

export function PriceHistoryChart({ data }: PriceHistoryChartProps) {
    // Format data slightly if needed, e.g. parse dates
    // For now, assuming ISO string dates YYYY-MM-DD

    return (
        <Card className="col-span-1">
            <CardHeader className="pb-4">
                <CardTitle className="text-base font-medium">Price History</CardTitle>
            </CardHeader>
            <CardContent className="pl-0">
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return `${date.getMonth() + 1}/${date.getDate()}`;
                                }}
                                fontSize={10}
                                stroke="#888888"
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`}
                                fontSize={10}
                                stroke="#888888"
                                domain={['dataMin - 1', 'dataMax + 1']}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 3 }}
                                activeDot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
