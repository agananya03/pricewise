"use client"

import { Zap, MapPin } from "lucide-react"

export function LiveActivity() {
    return (
        <section className="bg-black text-white py-4 overflow-hidden border-b border-white z-40 relative">
            <div className="container mx-auto px-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3 text-red-500 font-bold animate-pulse font-mono uppercase text-xs tracking-widest border border-red-500 px-2 py-1">
                    <div className="h-2 w-2 bg-red-500 rounded-full" />
                    LIVE ACTIVITY
                </div>
                <div className="text-xs text-white font-mono uppercase tracking-widest hidden md:block">
                    🔥 847 scans in the last hour
                </div>
            </div>

            {/* Horizontal Scroller */}
            <div className="relative flex overflow-x-hidden">
                <div className="animate-marquee whitespace-nowrap flex gap-8">
                    {[
                        { text: "Ravi scanned Amul Milk at ₹68 (12% below avg)", loc: "Mumbai", time: "Just now" },
                        { text: "Priya found Surf Excel at ₹249 (Great deal!)", loc: "Delhi", time: "15s ago" },
                        { text: "Arjun added 5 items to 'Monthly Groceries'", loc: "Bangalore", time: "32s ago" },
                        { text: "Community flagged price spike: Fortune Oil +34%", loc: "Pune", time: "1m ago" },
                        { text: "Sarah saved ₹145 on her shopping trip", loc: "Mumbai", time: "2m ago" },
                        { text: "Rahul scanned Britannia Bread at ₹45", loc: "Chennai", time: "2m ago" },
                        { text: "New Deal: 50% off on Dove Soap at Reliance", loc: "Hyderabad", time: "3m ago" },
                        // Duplicate for smooth loop
                        { text: "Ravi scanned Amul Milk at ₹68 (12% below avg)", loc: "Mumbai", time: "Just now" },
                        { text: "Priya found Surf Excel at ₹249 (Great deal!)", loc: "Delhi", time: "15s ago" },
                        { text: "Arjun added 5 items to 'Monthly Groceries'", loc: "Bangalore", time: "32s ago" },
                        { text: "Community flagged price spike: Fortune Oil +34%", loc: "Pune", time: "1m ago" },
                    ].map((item, i) => (
                        <div key={i} className="inline-flex items-center gap-4 bg-black px-4 py-2 border border-white hover:bg-white hover:text-black transition-colors group">
                            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 group-hover:text-black">
                                <span className="text-yellow-500">⚡</span>
                                {item.time}
                            </div>
                            <div className="text-sm font-bold uppercase tracking-wide">{item.text}</div>
                            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 border-l border-white/20 pl-4 group-hover:border-black/20 group-hover:text-black">
                                <MapPin className="h-3 w-3" /> {item.loc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
