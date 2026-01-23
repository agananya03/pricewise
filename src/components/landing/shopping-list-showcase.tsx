"use client"

import { Check, Bell, Users, Search, ShoppingCart, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ShoppingListShowcase() {
    return (
        <section className="py-24 bg-black border-b border-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left: Interactive Mockup - Wireframe Style */}
                    <div className="flex-1 w-full max-w-md lg:max-w-xl">
                        <div className="bg-black rounded-3xl p-6 md:p-8 shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] border-2 border-white relative">
                            {/* Decorative Elements */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                            </div>

                            <div className="flex items-center justify-between mb-8 border-b border-white/20 pb-4">
                                <h3 className="font-bold text-xl flex items-center gap-2 text-white uppercase tracking-widest">
                                    <ShoppingCart className="h-5 w-5 text-white" />
                                    Weekly List
                                </h3>
                                <Badge variant="outline" className="border-white text-white rounded-none px-2 font-mono text-xs">SHARED: FAMILY</Badge>
                            </div>

                            <div className="space-y-4 font-mono">
                                {/* Item 1: Overpaying */}
                                <div className="bg-black p-4 border border-white relative group hover:bg-white hover:text-black transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-4 w-4 border border-current" />
                                            <div>
                                                <div className="font-bold uppercase text-sm">Milk (1 Gal)</div>
                                                <div className="text-[10px] opacity-60">REQUEST: MOM</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-bold">₹240</span>
                                            <span className="text-[10px] block font-bold text-red-500 group-hover:text-red-600">HIGH PRICE</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 border-t border-dashed border-current/30 pt-2 flex items-center gap-2 text-xs">
                                        <MapPin className="h-3 w-3" />
                                        <strong>TARGET:</strong> ₹190 (-₹50)
                                    </div>
                                </div>

                                {/* Item 2: Good Deal */}
                                <div className="bg-black p-4 border border-white/50 relative opacity-60">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-4 w-4 bg-white flex items-center justify-center">
                                                <Check className="h-3 w-3 text-black" />
                                            </div>
                                            <div className="line-through text-sm">Bread (Wheat)</div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm">₹45</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Item 3: Price Drop */}
                                <div className="bg-black p-4 border border-white relative hover:bg-white hover:text-black transition-colors">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-3">
                                            <div className="h-4 w-4 border border-current" />
                                            <div className="font-bold uppercase text-sm">Olive Oil</div>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-bold">₹850</span>
                                            <span className="text-[10px] block font-bold text-white group-hover:text-black bg-white group-hover:bg-black px-1 mt-1">DROP: 28%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="mt-8 pt-4 border-t-2 border-white flex items-center justify-between text-sm uppercase font-bold text-white">
                                    <span>Est. Total: ₹1,085</span>
                                    <span className="bg-white text-black px-3 py-1">Save ₹250</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Benefits List */}
                    <div className="flex-1 space-y-8 text-white">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
                                Smart<br /><span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Shopping Lists</span>
                            </h2>
                            <p className="text-xl text-gray-400 font-light border-l-2 border-white pl-4">
                                Dynamic tracking. Real-time updates. The last shopping list you will ever need.
                            </p>
                        </div>

                        <div className="space-y-4 font-mono text-sm">
                            {[
                                "REAL-TIME PRICE TRACKING",
                                "AUTOMATIC DEAL ALERTS",
                                "FAMILY SYNC & SHARING",
                                "SMART STORE ROUTING",
                                "PRICE HISTORY CHARTS",
                            ].map((benefit, i) => (
                                <div key={i} className="flex items-center gap-3 group">
                                    <div className="h-2 w-2 bg-white rotate-45 group-hover:rotate-0 transition-transform" />
                                    <span className="text-gray-300 group-hover:text-white transition-colors tracking-widest">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/shopping-list">
                            <Button size="lg" className="bg-white text-black hover:bg-gray-200 h-14 px-8 text-lg rounded-none border-2 border-white uppercase font-bold tracking-widest shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
                                Create Smart List
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}
