"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Trophy, Users } from "lucide-react"

export function SocialProofEnhanced() {
    return (
        <section className="py-24 bg-black border-b border-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center mb-16 text-white">
                    Community <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Wins</span>
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Card 1: Testimonial */}
                    <Card className="bg-black border-2 border-white rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] h-full group hover:bg-white hover:text-black transition-colors">
                        <CardContent className="p-8 flex flex-col h-full">
                            <div className="flex gap-1 mb-6 text-white group-hover:text-black">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                            </div>
                            <p className="text-sm font-mono leading-relaxed mb-8 flex-1 uppercase">
                                "I discovered I was overpaying ₹600/month on groceries! The shopping list feature tracks everything automatically."
                            </p>
                            <div className="flex items-center gap-4 pt-4 border-t-2 border-current">
                                <Avatar className="h-10 w-10 border-2 border-current rounded-none">
                                    <AvatarImage src="https://i.pravatar.cc/150?u=1" className="grayscale" />
                                    <AvatarFallback>SM</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-bold text-sm uppercase">Sarah M.</div>
                                    <Badge variant="outline" className="border-current text-current rounded-none text-[10px] mt-1">Saved ₹7,200</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 2: Community Win */}
                    <Card className="bg-black border-2 border-white border-dashed rounded-none h-full transform md:-translate-y-4">
                        <CardContent className="p-8 flex flex-col h-full justify-center text-center">
                            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-black outline outline-2 outline-white">
                                <Users className="h-8 w-8 text-black" />
                            </div>
                            <h3 className="font-black text-xl mb-4 text-white uppercase tracking-widest">Achievement Unlocked</h3>
                            <p className="text-gray-400 font-mono text-xs mb-8 uppercase tracking-wide">
                                "Together we've reported 50,000 prices in Mumbai this month"
                            </p>
                            <div className="font-black text-4xl text-white mb-2">12,000+</div>
                            <div className="text-xs text-white border-t border-white pt-2 uppercase font-bold tracking-widest">Families Helped</div>
                        </CardContent>
                    </Card>

                    {/* Card 3: Testimonial */}
                    <Card className="bg-black border-2 border-white rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] h-full group hover:bg-white hover:text-black transition-colors">
                        <CardContent className="p-8 flex flex-col h-full">
                            <div className="flex gap-1 mb-6 text-white group-hover:text-black">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                            </div>
                            <p className="text-sm font-mono leading-relaxed mb-8 flex-1 uppercase">
                                "The shared shopping list with my wife is a game-changer. We both add items and see the best prices instantly."
                            </p>
                            <div className="flex items-center gap-4 pt-4 border-t-2 border-current">
                                <Avatar className="h-10 w-10 border-2 border-current rounded-none">
                                    <AvatarImage src="https://i.pravatar.cc/150?u=2" className="grayscale" />
                                    <AvatarFallback>RK</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-bold text-sm uppercase">Rahul K.</div>
                                    <Badge variant="outline" className="border-current text-current rounded-none text-[10px] mt-1">Premium Member</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 4: Leaderboard Highlight */}
                    <Card className="bg-white text-black border-2 border-black h-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <CardContent className="p-8 flex flex-col h-full items-center text-center relative z-10">
                            <div className="h-12 w-12 bg-black text-white rounded-none flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                                <Trophy className="h-6 w-6" />
                            </div>
                            <h3 className="font-black text-black uppercase tracking-widest mb-2">Saver of the Month</h3>
                            <div className="my-6 relative">
                                <Avatar className="h-20 w-20 mx-auto border-4 border-black rounded-full grayscale">
                                    <AvatarImage src="https://i.pravatar.cc/150?u=3" />
                                    <AvatarFallback>AS</AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-2 -right-2 bg-black text-white text-xs font-bold px-2 py-1">#1</div>
                            </div>
                            <div className="font-bold text-xl text-black uppercase">Amit S.</div>
                            <p className="text-sm font-mono text-gray-800 mb-4 border-b border-black pb-2 w-full">Saved ₹12,450</p>
                            <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500">247 Products Scanned</div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </section>
    )
}
