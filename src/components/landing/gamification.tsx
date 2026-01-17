"use client"

import { Trophy, Target, Award, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function GamificationSection() {
    return (
        <section className="py-24 bg-black text-white border-b border-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                        Smart <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Rewards</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-mono">EARN XP. LEVEL UP. SAVE MORE.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">

                    {/* Achievements */}
                    <div className="bg-black text-white p-8 border-2 border-white rounded-none relative">
                        {/* Corner accent */}
                        <div className="absolute top-0 right-0 w-8 h-8 border-l-2 border-b-2 border-white bg-white"></div>

                        <div className="flex items-center gap-4 mb-8 border-b-2 border-white pb-4">
                            <Trophy className="h-8 w-8 text-white" />
                            <h3 className="text-2xl font-black uppercase tracking-widest">Achievements</h3>
                        </div>

                        <div className="space-y-4">
                            {[
                                { name: "First Scan", status: "Completed", icon: "🔓" },
                                { name: "Week Warrior", status: "7-day streak", icon: "🔥" },
                                { name: "Community Hero", status: "Report 50 prices", icon: "🔒", opacity: "opacity-40" },
                                { name: "Master Saver", status: "Save ₹10,000", icon: "🔒", opacity: "opacity-40" },
                            ].map((item, i) => (
                                <div key={i} className={`flex items-center justify-between p-4 border border-white/30 hover:border-white transition-colors bg-black ${item.opacity || ''}`}>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xl grayscale">{item.icon}</span>
                                        <span className="font-bold font-mono uppercase text-sm">{item.name}</span>
                                    </div>
                                    <span className="text-[10px] text-white border border-white px-2 py-1 uppercase tracking-wider font-bold">{item.status}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10">
                            <div className="flex justify-between text-xs font-mono mb-2 uppercase tracking-wider text-gray-400">
                                <span>Level 5 Smart Shopper</span>
                                <span>Total 450 XP</span>
                            </div>
                            <Progress value={80} className="h-4 bg-gray-900 border border-white rounded-none" indicatorClassName="bg-white" />
                            <div className="text-right text-[10px] text-gray-500 mt-2 uppercase font-mono">Target: Level 6 (50 XP away)</div>
                        </div>
                    </div>

                    {/* Challenges */}
                    <div className="bg-white text-black p-8 border-2 border-white rounded-none relative">
                        <div className="flex items-center gap-4 mb-8 border-b-2 border-black pb-4">
                            <Target className="h-8 w-8 text-black" />
                            <h3 className="text-2xl font-black uppercase tracking-widest">Active Challenges</h3>
                        </div>

                        <div className="space-y-6">
                            {/* Challenge 1 */}
                            <div className="border-2 border-black p-4 relative">
                                <div className="absolute top-0 right-0 bg-black text-white text-[10px] px-2 py-1 font-bold uppercase">2 Days Left</div>
                                <div className="flex justify-between items-start mb-2 mt-2">
                                    <h4 className="font-bold text-lg uppercase tracking-tight">📸 Weekend Reporter</h4>
                                </div>
                                <p className="text-xs font-mono text-gray-600 mb-4 border-l-2 border-black pl-2">Scan 10 products this weekend to verify prices.</p>
                                <div className="flex items-center justify-between text-sm mb-2 font-bold uppercase">
                                    <span className="flex items-center gap-2"><Star className="h-3 w-3 fill-black" /> 500 XP</span>
                                    <span>3/10</span>
                                </div>
                                <Progress value={30} className="h-2 bg-gray-200 rounded-none" indicatorClassName="bg-black" />
                            </div>

                            {/* Challenge 2 */}
                            <div className="border border-black p-4 border-dashed opacity-80 hover:opacity-100 transition-opacity">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-lg uppercase tracking-tight">🎯 Deal Hunter</h4>
                                </div>
                                <p className="text-xs font-mono text-gray-600 mb-4 border-l-2 border-black pl-2">Find 5 items priced below market average.</p>
                                <div className="flex items-center justify-between text-sm mb-2 font-bold uppercase">
                                    <span>₹50 Credit</span>
                                    <span>2/5</span>
                                </div>
                                <Progress value={40} className="h-2 bg-gray-200 rounded-none" indicatorClassName="bg-black" />
                            </div>
                        </div>

                        <Link href="/community">
                            <Button className="w-full mt-8 bg-black text-white hover:bg-gray-800 rounded-none h-12 uppercase font-bold tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                                View All Challenges
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}
