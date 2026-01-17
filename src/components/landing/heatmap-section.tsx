"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeatmapSection() {
    return (
        <section className="py-24 bg-black text-white overflow-hidden relative border-b border-white">
            <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
                <div className="inline-block px-4 py-1.5 border border-white text-white font-mono text-xs mb-4 uppercase tracking-widest">
                    Live Data
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                    Price <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Heatmaps</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto font-mono text-sm leading-loose uppercase">
                    See which neighborhoods have the best deals. Our interactive map filters by category so you never drive to an expensive store again.
                </p>

                {/* Interactive Map Visual Sim */}
                <div className="max-w-4xl mx-auto h-[450px] bg-black rounded-none border-2 border-white relative overflow-hidden shadow-[20px_20px_0px_0px_rgba(255,255,255,0.15)] mt-12 group">
                    <div className="absolute inset-0 bg-neutral-900/50 flex items-center justify-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40">
                        {/* Grid Lines */}
                        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
                        <span className="text-white font-mono uppercase tracking-widest bg-black px-4 py-2 border border-white text-xs z-10">Map Visualization Loading...</span>
                    </div>

                    {/* Fake Pins */}
                    <div className="absolute top-1/4 left-1/4 h-3 w-3 bg-white rounded-none rotate-45 animate-ping" />
                    <div className="absolute top-1/2 left-1/2 h-3 w-3 bg-white rounded-none rotate-45 animate-ping delay-100" />
                    <div className="absolute bottom-1/3 right-1/4 h-3 w-3 bg-white rounded-none rotate-45 animate-ping delay-200" />

                    <div className="absolute bottom-1/4 left-1/3 h-2 w-2 bg-white rounded-none rotate-45 animate-ping delay-500 opacity-80" />
                    <div className="absolute top-1/3 right-1/3 h-2 w-2 bg-white rounded-none rotate-45 animate-ping delay-700 opacity-80" />

                    {/* Overlay */}
                    <div className="absolute bottom-6 left-6 bg-black px-6 py-4 border border-white text-left shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)]">
                        <div className="font-bold uppercase tracking-widest text-sm mb-1">15 Stores Tracked</div>
                        <div className="text-gray-400 font-mono text-xs uppercase">Mumbai, Maharashtra</div>
                        <div className="flex flex-col gap-1 mt-3 text-[10px] font-mono text-gray-500 uppercase">
                            <span className="text-white">● 23 Great Deals</span>
                            <span className="text-gray-600">● 8 Overpriced</span>
                        </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                        <Link href="/stores">
                            <Button size="lg" className="bg-white text-black hover:bg-gray-200 rounded-none uppercase font-black tracking-widest border-2 border-white scale-125">
                                Explore Map
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
