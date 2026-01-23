"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, ScanBarcode, Users, TrendingDown, CheckCircle, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function Hero() {
    return (
        <section className="relative w-full overflow-hidden min-h-[90vh] flex items-center bg-black">

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')] z-0 pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 pt-20">
                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Left Side: Content */}
                    <div className="flex-1 space-y-8 text-center md:text-left text-white">
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
                            Stop<br />
                            <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>Overpaying.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto md:mx-0 font-light leading-relaxed border-l-4 border-white pl-6">
                            Scan any barcode or receipt. Instant fair deal analysis. Join <span className="font-bold text-white">100,000+ shoppers</span> saving <span className="font-bold text-white">₹24,000/year</span>.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-8">
                            <Link href="/scan">
                                <Button size="lg" className="w-56 bg-white text-black hover:bg-gray-200 text-lg h-14 px-8 rounded-none border-2 border-white uppercase font-bold tracking-widest transition-all">
                                    <ScanBarcode className="mr-2 h-5 w-5" />
                                    Scan Item
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button size="lg" variant="outline" className="w-56 bg-transparent text-white hover:bg-white hover:text-black text-lg h-14 px-8 rounded-none border-2 border-white uppercase font-bold tracking-widest transition-all">
                                    Get Started
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>


                    </div>

                    {/* Right Side: Minimalist Phone Mockup */}
                    <div className="flex-1 relative w-full h-[600px] flex items-center justify-center">
                        {/* Wireframe Phone */}
                        <div className="relative z-10 w-[300px] h-[600px] border-4 border-white bg-black rounded-[3rem] p-4 shadow-[0_0_50px_rgba(255,255,255,0.1)] rotate-[-6deg] hover:rotate-0 transition-transform duration-700">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-black border-b border-l border-r border-white rounded-b-xl z-20" />

                            {/* Screen Content */}
                            <div className="w-full h-full rounded-[2rem] overflow-hidden relative border border-white/20">
                                <div className="absolute inset-0 bg-zinc-900 grid grid-cols-2 gap-[1px] bg-white/5 opacity-20">
                                    {/* Grid bg simulation */}
                                </div>

                                {/* UI Elements Wireframe */}
                                <div className="p-6 space-y-6 pt-16">
                                    <div className="h-8 w-2/3 bg-white/10 rounded" />
                                    <div className="h-40 w-full border-2 border-white/20 rounded-xl flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=600&auto=format&fit=crop')] opacity-20 bg-cover grayscale" />
                                        <ScanBarcode className="h-12 w-12 text-white animate-pulse" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-4 w-full bg-white/10 rounded" />
                                        <div className="h-4 w-5/6 bg-white/10 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card 1 - Minimal */}
                        <div className="absolute top-40 -right-4 bg-black border border-white p-4 w-64 z-20 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                            <div className="font-mono text-xs text-white mb-2 border-b border-white/20 pb-2">ALERT: OVERPAYING</div>
                            <div className="flex justify-between items-end">
                                <div className="text-3xl font-black text-white">₹199</div>
                                <div className="text-xs text-red-500 font-bold bg-white px-1">+23%</div>
                            </div>
                        </div>

                        {/* Floating Card 2 - Minimal */}
                        <div className="absolute bottom-32 -left-8 bg-white text-black p-4 w-64 z-20 shadow-[8px_8px_0px_0px_rgba(50,50,50,1)]">
                            <div className="font-mono text-xs text-black mb-2 border-b border-black/20 pb-2">COMMUNITY FIND</div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-xs font-bold">FOUND AT TARGET</div>
                                    <div className="text-3xl font-black">₹160</div>
                                </div>
                                <CheckCircle className="h-6 w-6" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
