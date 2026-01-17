"use client"

import { Users, TrendingUp, Award, MapPin, ThumbsUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CommunitySection() {
    return (
        <section className="py-24 bg-black border-b border-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
                        Community <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Power</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-mono tracking-wide">REAL PEOPLE. REAL PRICES. REAL SAVINGS.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {/* Feed */}
                    <Card className="lg:col-span-2 bg-black border-2 border-white rounded-none shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                        <CardContent className="p-8">
                            <h3 className="flex items-center gap-2 font-bold text-xl mb-8 uppercase tracking-widest text-white border-b border-white/20 pb-4">
                                <TrendingUp className="h-5 w-5 text-white" />
                                Trending in Mumbai
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { user: "Priya M.", item: "Amul Milk", price: "₹68", store: "D-Mart", deal: "23% below avg", time: "2m ago", likes: 12 },
                                    { user: "Rahul K.", item: "Fortune Oil", price: "₹149", store: "Reliance Fresh", deal: "18% below avg", time: "15m ago", likes: 8 },
                                    { user: "Sneha P.", item: "Britannia Bread", price: "₹45", store: "More Supermarket", deal: "Fair price", time: "1h ago", likes: 3 }
                                ].map((post, i) => (
                                    <div key={i} className="flex gap-4 pb-6 border-b border-white/20 last:border-0 last:pb-0">
                                        <Avatar className="h-10 w-10 border border-white">
                                            <AvatarImage src={`https://i.pravatar.cc/150?u=${i + 10}`} className="grayscale" />
                                            <AvatarFallback className="bg-black text-white">{post.user[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="font-bold text-sm text-white uppercase">{post.user}</span>
                                                    <span className="text-gray-500 text-xs uppercase font-mono"> reported:</span>
                                                </div>
                                                <span className="text-xs text-gray-500 font-mono">{post.time}</span>
                                            </div>
                                            <div className="font-bold mt-1 text-lg text-white">
                                                {post.item} <span className="text-gray-600 font-light mx-2">|</span> <span className="text-white border-b border-white">{post.price}</span>
                                            </div>
                                            <div className="text-xs text-gray-400 flex items-center gap-2 mt-2 font-mono uppercase">
                                                <MapPin className="h-3 w-3" /> {post.store}
                                            </div>
                                            <div className="flex items-center gap-4 mt-3">
                                                <span className={`text-[10px] px-2 py-1 uppercase font-bold tracking-wider border ${post.deal.includes('below') ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-gray-600'}`}>
                                                    {post.deal}
                                                </span>
                                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                                    <ThumbsUp className="h-3 w-3" /> {post.likes}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Leaderboard */}
                    <Card className="bg-black border-2 border-white rounded-none shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                        <CardContent className="p-8">
                            <h3 className="flex items-center gap-2 font-bold text-xl mb-8 uppercase tracking-widest text-white border-b border-white/20 pb-4">
                                <Award className="h-5 w-5 text-white" />
                                Top Savers
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { rank: 1, name: "Amit S.", saved: "₹12,450", scans: 247 },
                                    { rank: 2, name: "Kavya R.", saved: "₹10,200", scans: 198 },
                                    { rank: 3, name: "Deepak M.", saved: "₹9,870", scans: 215 },
                                ].map((user, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-white/5 p-4 border border-white/10 hover:border-white transition-colors cursor-default group">
                                        <div className={`h-8 w-8 flex items-center justify-center font-black text-lg
                                            ${i === 0 ? 'text-white' : 'text-gray-500'}`}>
                                            #{user.rank}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-sm text-white uppercase">{user.name}</div>
                                            <div className="text-xs text-gray-500 font-mono">{user.scans} SCANS</div>
                                        </div>
                                        <div className="font-bold text-white text-sm border-2 border-white px-2 py-1 group-hover:bg-white group-hover:text-black transition-colors">{user.saved}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/20 text-center">
                                <div className="text-xs text-gray-500 uppercase font-mono mb-2">Your Rank</div>
                                <div className="text-4xl font-black text-white">#247</div>
                                <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider">Keep scanning to climb</p>
                            </div>
                        </CardContent>
                    </Card>

                </div>

                <div className="flex justify-center mt-12">
                    <Link href="/community">
                        <Button className="bg-white text-black hover:bg-gray-200 rounded-none h-14 px-8 uppercase font-black tracking-widest border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none scale-110">
                            Join the Community
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
