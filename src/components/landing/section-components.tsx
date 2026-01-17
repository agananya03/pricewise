"use client"

import { Star, Check, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function Testimonials() {
    return (
        <section className="py-20 bg-white dark:bg-background border-y border-gray-100 dark:border-zinc-800">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Trusted by 100,000+ Smart Shoppers</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="bg-gray-50 dark:bg-zinc-900 border-none">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 italic">"I discovered I was overpaying $8 for olive oil! PriceWise saved me $430 in just 3 months. It's an absolute game changer."</p>
                                <div className="flex items-center gap-4 pt-4">
                                    <Avatar>
                                        <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                                        <AvatarFallback>SM</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-bold">Sarah M.</div>
                                        <div className="text-xs text-gray-500">Chicago, IL</div>
                                    </div>
                                    <div className="ml-auto bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                                        Saved $430
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function HowItWorks() {
    return (
        <section className="py-24 bg-black border-b border-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16 text-white">
                    How It <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Works</span>
                </h2>
                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-white/20 z-0 border-t border-dashed border-white/50" />

                    <div className="grid md:grid-cols-4 gap-8 relative z-10">
                        {[
                            { step: 1, title: "Scan", desc: "Point camera at any item" },
                            { step: 2, title: "Compare", desc: "See prices from all nearby stores" },
                            { step: 3, title: "Save", desc: "Buy from the cheapest option" },
                            { step: 4, title: "Track", desc: "Watch your savings grow" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center space-y-6 bg-black p-6 border-2 border-white rounded-none shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] transition-all group">
                                <div className="h-24 w-24 bg-black rounded-full flex items-center justify-center text-4xl font-black text-white mb-2 border-4 border-white group-hover:bg-white group-hover:text-black transition-colors">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-widest text-white">{item.title}</h3>
                                <p className="text-gray-400 font-mono text-xs uppercase">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-white dark:bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-16">Choose Your Savings Plan</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

                    {/* Free */}
                    <Card className="border hover:border-purple-200 transition-colors">
                        <CardHeader className="text-center pb-2">
                            <Badge variant="secondary" className="mb-4 mx-auto">Most Popular</Badge>
                            <CardTitle className="text-2xl">Free Tier</CardTitle>
                            <CardDescription>Perfect for casual shoppers</CardDescription>
                            <div className="text-4xl font-bold mt-4">$0<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> 50 scans/month</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Basic price alerts</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Ad-supported</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link href="/dashboard" className="w-full">
                                <Button variant="outline" className="w-full">Start Free</Button>
                            </Link>
                        </CardFooter>
                    </Card>

                    {/* Premium */}
                    <Card className="border-2 border-purple-600 shadow-xl scale-105 relative z-10">
                        <CardHeader className="text-center pb-2">
                            <div className="absolute top-0 left-0 right-0 bg-purple-600 text-white text-xs font-bold py-1 text-center uppercase tracking-wider rounded-t-lg">Recommended</div>
                            <CardTitle className="text-2xl mt-4">Premium</CardTitle>
                            <CardDescription>Serious savings</CardDescription>
                            <div className="text-4xl font-bold mt-4 text-purple-600">$4.99<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-600" /> Unlimited scans</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-600" /> Advanced analytics</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-600" /> Ad-free experience</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-600" /> Price history charts</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link href="/dashboard" className="w-full">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700">Go Premium</Button>
                            </Link>
                        </CardFooter>
                    </Card>

                    {/* Pro */}
                    <Card className="border hover:border-purple-200 transition-colors">
                        <CardHeader className="text-center pb-2">
                            <CardTitle className="text-2xl mt-8">Pro</CardTitle>
                            <CardDescription>For power users</CardDescription>
                            <div className="text-4xl font-bold mt-4">$9.99<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> Everything in Premium</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> API access</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> Bulk scanning</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> Custom reports</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link href="/dashboard" className="w-full">
                                <Button variant="outline" className="w-full">Get Pro</Button>
                            </Link>
                        </CardFooter>
                    </Card>

                </div>
            </div>
        </section>
    )
}

export function FinalCTA() {
    return (
        <section className="py-32 bg-black text-white text-center relative overflow-hidden border-b border-white">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="container mx-auto px-4 max-w-4xl space-y-12 relative z-10">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase" style={{ WebkitTextStroke: "2px white", color: "transparent" }}>
                    Ready to Stop Overpaying?
                </h2>
                <p className="text-xl md:text-2xl text-white font-mono uppercase tracking-widest max-w-2xl mx-auto border-l-4 border-white pl-6 text-left">
                    Join thousands of smart shoppers today.<br />No credit card required.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                    <Link href="/scan">
                        <Button size="lg" className="bg-white text-black hover:bg-gray-200 h-16 px-12 text-xl rounded-none uppercase font-black tracking-widest border-2 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)] active:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] active:translate-x-1 active:translate-y-1 transition-all">
                            Start Scanning Free
                        </Button>
                    </Link>
                </div>
                <div className="flex items-center justify-center gap-12 pt-12 grayscale opacity-70 hover:opacity-100 transition-opacity">
                    {/* Badges placeholder text */}
                    <div className="border border-white px-4 py-2 text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black cursor-pointer transition-colors">
                         App Store
                    </div>
                    <div className="border border-white px-4 py-2 text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black cursor-pointer transition-colors">
                        ▶ Google Play
                    </div>
                </div>
            </div>
        </section>
    )
}
