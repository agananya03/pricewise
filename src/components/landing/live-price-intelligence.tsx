"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScanBarcode, TrendingUp, Store, Camera, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export function LivePriceIntelligence() {
    return (
        <section className="py-24 bg-black border-b border-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
                        Never <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Overpay Again</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-mono tracking-wide uppercase">Real-time price intelligence from 10,000+ shoppers all over the world</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Card 1: Product Showcase */}
                    <Link href="/prices/compare" className="block h-full">
                        <Card className="bg-black border-2 border-white rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] h-full group hover:bg-white hover:text-black transition-colors relative overflow-hidden">
                            <CardContent className="p-8 flex flex-col h-full items-center text-center">
                                <div className="absolute top-4 right-4">
                                    <ScanBarcode className="h-6 w-6 text-white group-hover:text-black" />
                                </div>
                                <div className="h-32 w-32 border-2 border-white group-hover:border-black flex items-center justify-center mb-6 relative">
                                    <div className="text-4xl">🥛</div>
                                    <Badge className="absolute -bottom-3 bg-white text-black border border-black group-hover:bg-black group-hover:text-white rounded-none uppercase font-bold text-[10px] tracking-wider">
                                        ₹299
                                    </Badge>
                                </div>
                                <h3 className="font-bold text-xl uppercase mb-2 text-white group-hover:text-black">Organic Milk</h3>
                                <p className="text-gray-400 group-hover:text-gray-600 font-mono text-xs uppercase">
                                    15 prices tracked in your area
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Card 2: Savings Stat */}
                    <Link href="/prices/compare" className="block h-full">
                        <Card className="bg-black border-2 border-white border-dashed rounded-none h-full group hover:border-solid hover:bg-white hover:text-black transition-all">
                            <CardContent className="p-8 flex flex-col h-full justify-center text-center">
                                <div className="h-12 w-12 border-2 border-white group-hover:border-black rounded-full flex items-center justify-center mx-auto mb-6">
                                    <TrendingUp className="h-6 w-6 text-white group-hover:text-black" />
                                </div>
                                <div className="font-black text-4xl text-white group-hover:text-black mb-2">₹12,450</div>
                                <div className="text-xs text-white group-hover:text-black border-t border-white group-hover:border-black pt-2 uppercase font-bold tracking-widest mb-4">
                                    Average Savings Per User
                                </div>
                                <p className="text-gray-500 group-hover:text-gray-400 font-mono text-[10px] uppercase">
                                    Based on 50,000+ price comparisons this month
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Card 3: Real-time Comparison */}
                    <Link href="/prices/compare" className="block h-full">
                        <Card className="bg-black border-2 border-white rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] h-full group hover:bg-white hover:text-black transition-colors">
                            <CardContent className="p-6 flex flex-col h-full">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 group-hover:text-gray-600">Live Comparison</h3>
                                <div className="space-y-3 flex-1">
                                    {[
                                        { store: "D-Mart", price: "₹299", color: "bg-green-500", text: "text-white" },
                                        { store: "Reliance", price: "₹315", color: "bg-transparent", text: "text-gray-400 group-hover:text-gray-600" },
                                        { store: "Nature's", price: "₹340", color: "bg-transparent", text: "text-gray-400 group-hover:text-gray-600" }
                                    ].map((item, i) => (
                                        <div key={i} className={`flex justify-between items-center p-2 border border-white/20 group-hover:border-black/20 ${item.color === 'bg-green-500' ? 'border-green-500' : ''}`}>
                                            <div className="flex items-center gap-2">
                                                <Store className={`h-3 w-3 ${item.text}`} />
                                                <span className={`text-xs font-bold uppercase ${item.store === 'D-Mart' ? 'text-green-500' : 'text-white group-hover:text-black'}`}>{item.store}</span>
                                            </div>
                                            <span className={`font-mono text-sm ${item.store === 'D-Mart' ? 'text-green-500 font-bold' : 'text-white group-hover:text-black'}`}>{item.price}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/20 group-hover:border-black/20 text-center">
                                    <span className="text-green-500 text-xs font-bold uppercase flex items-center justify-center gap-2">
                                        <CheckCircle className="h-3 w-3" /> Best Deal Found
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Card 4: CTA */}
                    <Link href="/prices/compare" className="block h-full">
                        <Card className="bg-white text-black border-2 border-white h-full group hover:bg-gray-100 transition-colors relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            <CardContent className="p-8 flex flex-col h-full items-center justify-center text-center relative z-10">
                                <div className="h-16 w-16 bg-black text-white rounded-none flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] group-hover:scale-110 transition-transform">
                                    <Camera className="h-8 w-8" />
                                </div>
                                <h3 className="font-black text-2xl uppercase tracking-tighter mb-2">Start Comparing</h3>
                                <p className="text-sm font-mono font-bold uppercase tracking-widest mb-6 border-b-2 border-black pb-1">
                                    Compare prices near your location
                                </p>
                                <ArrowRight className="h-6 w-6 animate-pulse" />
                            </CardContent>
                        </Card>
                    </Link>

                </div>
            </div>
        </section >
    )
}
