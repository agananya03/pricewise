"use client"

import { TrendingDown, Users, Map, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export function ShoppingListDeepDive() {
    return (
        <section className="py-24 bg-black border-b border-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center mb-16 text-white leading-none">
                    Lists that <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Think</span>
                </h2>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {/* Feature 1 */}
                    <Card className="text-center p-8 bg-black border-2 border-white rounded-none hover:bg-white hover:text-black transition-colors group">
                        <CardContent className="space-y-6 pt-0">
                            <div className="h-16 w-16 bg-black border-2 border-white rounded-none flex items-center justify-center mx-auto text-white group-hover:bg-white group-hover:border-black group-hover:text-black">
                                <TrendingDown className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-xl uppercase tracking-wider">Price Drop Alerts</h3>
                            <p className="text-gray-400 font-mono text-sm leading-relaxed group-hover:text-gray-600">Get notified immediately when items on your specific list go on sale nearby.</p>
                            <div className="bg-black border border-white p-3 text-left w-full max-w-xs mx-auto text-sm flex items-center gap-3 group-hover:bg-white group-hover:border-black">
                                <div className="h-8 w-8 bg-white border border-black rounded-none group-hover:bg-black" />
                                <div>
                                    <div className="font-bold uppercase text-xs">Olive Oil</div>
                                    <div className="text-white group-hover:text-black font-bold text-[10px] bg-red-600 px-1 inline-block mt-1">DROP: 28%</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Feature 2 */}
                    <Card className="text-center p-8 bg-black border-2 border-white rounded-none hover:bg-white hover:text-black transition-colors group">
                        <CardContent className="space-y-6 pt-0">
                            <div className="h-16 w-16 bg-black border-2 border-white rounded-none flex items-center justify-center mx-auto text-white group-hover:bg-white group-hover:border-black group-hover:text-black">
                                <Users className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-xl uppercase tracking-wider">Collaborative</h3>
                            <p className="text-gray-400 font-mono text-sm leading-relaxed group-hover:text-gray-600">Share with family or roommates. Add items together and save together.</p>
                            <div className="flex items-center justify-center -space-x-3 mt-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-10 w-10 rounded-none border-2 border-white bg-black group-hover:border-black group-hover:bg-white" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Feature 3 */}
                    <Card className="text-center p-8 bg-black border-2 border-white rounded-none hover:bg-white hover:text-black transition-colors group">
                        <CardContent className="space-y-6 pt-0">
                            <div className="h-16 w-16 bg-black border-2 border-white rounded-none flex items-center justify-center mx-auto text-white group-hover:bg-white group-hover:border-black group-hover:text-black">
                                <Map className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-xl uppercase tracking-wider">Optimized Routes</h3>
                            <p className="text-gray-400 font-mono text-sm leading-relaxed group-hover:text-gray-600">We'll calculate the perfect route to hit the best prices for your list.</p>
                            <div className="bg-black border border-white/30 h-16 w-full mt-4 flex items-center justify-center text-[10px] text-gray-500 font-mono uppercase group-hover:border-black/30">
                                [ROUTE MAP VISUALIZATION]
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* List Builder Demo */}
                <div className="bg-black rounded-none shadow-[20px_20px_0px_0px_rgba(255,255,255,0.1)] overflow-hidden max-w-4xl mx-auto border-2 border-white">
                    <div className="bg-white p-4 border-b-2 border-black flex items-center justify-between">
                        <div className="font-black text-black uppercase tracking-widest text-sm">Demo: Build List</div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-8 gap-2 rounded-none border-black hover:bg-black hover:text-white uppercase font-bold text-xs"><Plus className="h-3 w-3" /> Add Item</Button>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 bg-black">
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-white" />
                                <input type="text" placeholder="SEARCH PRODUCTS..." className="w-full pl-9 pr-4 py-2 rounded-none bg-black border border-white text-white font-mono text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-white" />
                            </div>
                            <div className="space-y-2">
                                {[
                                    { name: "Milk", price: "₹58", store: "D-MART (1.2KM)" },
                                    { name: "Bread", price: "₹45", store: "CURRENT STORE" },
                                    { name: "Coffee", price: "₹189", store: "RELIANCE (2.3KM)" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 hover:bg-white hover:text-black rounded-none border border-white/20 hover:border-white transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="h-4 w-4 border border-white group-hover:bg-black group-hover:border-black" />
                                            <span className="font-bold uppercase text-sm text-white group-hover:text-black">{item.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-sm block text-white group-hover:text-black">{item.price}</div>
                                            <div className="text-[10px] text-gray-500 font-mono uppercase">{item.store}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-black border border-white p-6 flex flex-col justify-center text-center relative">
                            {/* Decorative corner */}
                            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white" />
                            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white" />

                            <div className="text-xs text-gray-500 mb-1 uppercase font-mono">Standard Total</div>
                            <div className="text-xl font-medium line-through decoration-white mb-4 text-gray-600">₹336</div>

                            <div className="text-xs text-white mb-1 uppercase font-mono tracking-widest">PriceWise Total</div>
                            <div className="text-4xl font-black text-white mb-4">₹292</div>
                            <div className="inline-block bg-white text-black text-xs font-bold px-3 py-1 uppercase tracking-widest mx-auto mb-6">
                                Save ₹44
                            </div>

                            <Link href="/shopping-list" className="w-full">
                                <Button className="w-full bg-white text-black hover:bg-gray-200 rounded-none uppercase font-bold tracking-widest h-12">View Plan</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
