"use client"

import { Users, ShoppingBag, MapPin, Zap, TrendingUp } from "lucide-react"

export function StatsBar() {
    return (
        <section className="bg-black border-y border-white relative z-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 divide-x divide-white/20">

                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-white font-black text-2xl md:text-4xl tracking-tighter">
                            <TrendingUp className="h-6 w-6" />
                            $12.4M
                        </div>
                        <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Saved Global</p>
                    </div>

                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-white font-black text-2xl md:text-4xl tracking-tighter">
                            <ShoppingBag className="h-6 w-6" />
                            2.1M
                        </div>
                        <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Products</p>
                    </div>

                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-white font-black text-2xl md:text-4xl tracking-tighter">
                            <MapPin className="h-6 w-6" />
                            15K+
                        </div>
                        <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Stores</p>
                    </div>

                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-white font-black text-2xl md:text-4xl tracking-tighter">
                            <Users className="h-6 w-6" />
                            100K+
                        </div>
                        <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Users</p>
                    </div>

                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-white font-black text-2xl md:text-4xl tracking-tighter">
                            <Zap className="h-6 w-6 text-white fill-white" />
                            LIVE
                        </div>
                        <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Status</p>
                    </div>

                </div>
            </div>
        </section>
    )
}
