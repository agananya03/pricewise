"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface CategoryData {
    name: string
    value: number
    fill: string
    [key: string]: any
}

export function CategoryBreakdown({ data }: { data?: CategoryData[] }) {
    const defaultData: CategoryData[] = [
        { name: "Groceries", value: 450, fill: "#000000" },
        { name: "Electronics", value: 300, fill: "#404040" },
        { name: "Clothing", value: 150, fill: "#737373" },
        { name: "Others", value: 100, fill: "#a3a3a3" }
    ]

    const chartData = data && data.length > 0 ? data : defaultData

    return (
        <Card className="col-span-3 h-full rounded-none border-black shadow-none">
            <CardHeader className="border-b border-black pb-4">
                <CardTitle className="uppercase font-black tracking-tight">Category Analysis</CardTitle>
                <CardDescription className="uppercase text-xs font-bold text-black/60 tracking-wider">Where your money goes</CardDescription>
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
                                    <Cell key={index} fill={entry.fill} stroke="white" strokeWidth={2} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: any) => [`$${Number(value).toFixed(2)}`, "Value"]}
                                contentStyle={{ borderRadius: '0px', border: '1px solid black', boxShadow: 'none' }}
                                itemStyle={{ color: 'black', fontFamily: 'monospace', fontWeight: 'bold' }}
                            />
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
