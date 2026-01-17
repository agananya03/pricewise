"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowUpRight, TrendingUp, AlertCircle, ShoppingBag } from "lucide-react"

export function AnalyticsPreview() {
    const data = [
        { name: "Groceries", value: 45, fill: "#8b5cf6" }, // Purple
        { name: "Household", value: 25, fill: "#3b82f6" }, // Blue
        { name: "Personal", value: 15, fill: "#f59e0b" }, // Orange
        { name: "Beverages", value: 15, fill: "#10b981" }, // Green
    ]

    return (
        <section className="py-24 bg-black border-b border-white">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
                            Money <br /><span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Flow</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-12 font-mono">
                            // VISUALIZE SPENDING.<br />
                            // PLUG LEAKS.<br />
                            // OPTIMIZE BUDGET.
                        </p>

                        <div className="space-y-6">
                            {/* Insight 1 */}
                            <div className="flex gap-4 p-6 bg-black border border-white hover:bg-white hover:text-black transition-colors group">
                                <div className="h-10 w-10 border border-white flex items-center justify-center shrink-0 group-hover:border-black">
                                    <AlertCircle className="h-5 w-5 text-white group-hover:text-black" />
                                </div>
                                <div>
                                    <h4 className="font-bold uppercase tracking-wider text-white group-hover:text-black">ALERT: Milk Overpayment</h4>
                                    <p className="text-sm text-gray-500 group-hover:text-gray-600 font-mono mt-1">Avg: ₹72 | Market: ₹58</p>
                                    <p className="text-sm font-bold mt-2 uppercase text-white group-hover:text-black border-l-2 border-white group-hover:border-black pl-2">Save ₹840/YR</p>
                                </div>
                            </div>

                            {/* Insight 2 */}
                            <div className="flex gap-4 p-6 bg-black border border-white/50 opacity-80">
                                <div className="h-10 w-10 border border-white flex items-center justify-center shrink-0">
                                    <TrendingUp className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold uppercase tracking-wider text-white">Status: Bread Optimized</h4>
                                    <p className="text-sm text-gray-500 font-mono mt-1">Beating market avg by 15%</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Link href="/analytics">
                                <Button className="bg-white text-black hover:bg-gray-200 rounded-none h-14 px-8 uppercase font-bold tracking-widest border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
                                    View Analytics
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Dashboard Mockup */}
                    <div className="bg-black rounded-none p-6 shadow-[15px_15px_0px_0px_rgba(255,255,255,0.2)] border-2 border-white">
                        {/* Metrics Row */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-black p-4 border border-white/50">
                                <div className="text-xs text-gray-500 uppercase font-mono mb-2">Total Saved</div>
                                <div className="text-3xl font-black text-white">₹18,450</div>
                                <div className="text-[10px] text-white flex items-center mt-2 border-l border-white pl-2">
                                    <ArrowUpRight className="h-3 w-3 mr-1" /> +12% VS LAST MONTH
                                </div>
                            </div>
                            <div className="bg-black p-4 border border-white/50">
                                <div className="text-xs text-gray-500 uppercase font-mono mb-2">Total Scans</div>
                                <div className="text-3xl font-black text-white">347</div>
                                <div className="text-[10px] text-white flex items-center mt-2 border-l border-white pl-2">
                                    <TrendingUp className="h-3 w-3 mr-1" /> TOP 5% USER
                                </div>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="bg-white p-6 border border-white/20 mb-6 relative overflow-hidden">
                            {/* Inverted for contrast - White bg chart card */}
                            <h4 className="font-bold mb-4 text-black uppercase tracking-wider text-sm border-b border-black pb-2">Spending Breakdown</h4>
                            <div className="h-[200px] flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={2}
                                            dataKey="value"
                                            stroke="none"
                                        >

                                            <Cell fill="#000000" />
                                            <Cell fill="#444444" />
                                            <Cell fill="#888888" />
                                            <Cell fill="#cccccc" />

                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute text-center">
                                    <div className="text-3xl font-black text-black">₹28k</div>
                                    <div className="text-[10px] uppercase font-bold text-gray-500">Total</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
