"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface CategoryData {
    name: string
    value: number
    fill: string
}

export function CategoryBreakdown({ data }: { data?: CategoryData[] }) {
    const defaultData: CategoryData[] = [
        { name: "Groceries", value: 450, fill: "#22c55e" },
        { name: "Electronics", value: 300, fill: "#3b82f6" },
        { name: "Clothing", value: 150, fill: "#f59e0b" },
        { name: "Others", value: 100, fill: "#64748b" }
    ]

    const chartData = data && data.length > 0 ? data : defaultData

    return (
        <Card className="col-span-3 h-full">
            <CardHeader>
                <CardTitle>Category Analysis</CardTitle>
                <CardDescription>Where your money goes</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={index} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-4 justify-center mt-4">
                    {chartData.map((item, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.fill }} />
                            {item.name}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
