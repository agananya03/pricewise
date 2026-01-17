"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

export function PricingUpdated() {
    return (
        <section id="pricing" className="py-24 bg-black border-b border-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center mb-16 text-white">
                    <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Choose</span> Your Plan
                </h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {/* Free */}
                    <Card className="bg-black border-2 border-white rounded-none flex flex-col h-full hover:bg-white hover:text-black transition-colors group">
                        <CardHeader className="text-center pb-2">
                            <div className="h-6 mb-4"></div> {/* Spacer */}
                            <CardTitle className="text-2xl font-black uppercase tracking-widest">Free</CardTitle>
                            <CardDescription className="font-mono text-xs uppercase tracking-widest text-gray-500 group-hover:text-gray-600">Entry Level</CardDescription>
                            <div className="text-5xl font-black mt-4 font-mono">₹0<span className="text-lg font-normal text-muted-foreground group-hover:text-gray-600">/mo</span></div>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-1">
                            <ul className="space-y-3 text-sm font-mono mt-8">
                                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white group-hover:text-black" /> 50 scans/month</li>
                                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white group-hover:text-black" /> 3 shopping lists</li>
                                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white group-hover:text-black" /> Basic alerts</li>
                                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white group-hover:text-black" /> Community access</li>
                                <li className="flex items-center gap-3 opacity-50"><Check className="h-4 w-4" /> Ad-supported</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link href="/dashboard" className="w-full">
                                <Button className="w-full bg-white text-black hover:bg-gray-200 rounded-none uppercase font-bold tracking-widest border border-black group-hover:bg-black group-hover:text-white group-hover:border-black">Start Free</Button>
                            </Link>
                        </CardFooter>
                    </Card>

                    {/* Premium */}
                    <Card className="bg-black border-4 border-white rounded-none flex flex-col h-full relative transform md:-translate-y-4 shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
                        <CardHeader className="text-center pb-2">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black text-xs font-bold px-4 py-1 text-center uppercase tracking-widest border-2 border-black">Most Popular</div>
                            <CardTitle className="text-2xl font-black uppercase tracking-widest text-white mt-4">Premium</CardTitle>
                            <CardDescription className="font-mono text-xs uppercase tracking-widest text-gray-400">Best Value</CardDescription>
                            <div className="text-5xl font-black mt-4 font-mono text-white">₹99<span className="text-lg font-normal text-gray-400">/mo</span></div>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-1 text-white">
                            <ul className="space-y-3 text-sm font-mono mt-8">
                                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white" /> Unlimited scans</li>
                                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white" /> Unlimited lists</li>
                                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white" /> Advanced analytics</li>
                                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white" /> Price drop alerts</li>
                                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white" /> Family sharing (5)</li>
                                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white" /> Ad-free experience</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link href="/dashboard" className="w-full">
                                <Button className="w-full bg-white text-black hover:bg-gray-200 rounded-none uppercase font-black tracking-widest h-14 text-lg">Go Premium</Button>
                            </Link>
                        </CardFooter>
                    </Card>

                    {/* Pro */}
                    <Card className="bg-black border-2 border-white rounded-none flex flex-col h-full hover:bg-white hover:text-black transition-colors group">
                        <CardHeader className="text-center pb-2">
                            <div className="h-6 mb-4"></div> {/* Spacer */}
                            <CardTitle className="text-2xl font-black uppercase tracking-widest">Pro</CardTitle>
                            <CardDescription className="font-mono text-xs uppercase tracking-widest text-gray-500 group-hover:text-gray-600">Power Users</CardDescription>
                            <div className="text-5xl font-black mt-4 font-mono">₹299<span className="text-lg font-normal text-muted-foreground group-hover:text-gray-600">/mo</span></div>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-1">
                            <ul className="space-y-3 text-sm font-mono mt-8">
                                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white group-hover:text-black" /> Everything in Premium</li>
                                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white group-hover:text-black" /> API Access</li>
                                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white group-hover:text-black" /> Bulk scanning</li>
                                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white group-hover:text-black" /> Custom reports</li>
                                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white group-hover:text-black" /> White-labeling</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link href="/dashboard" className="w-full">
                                <Button className="w-full bg-white text-black hover:bg-gray-200 rounded-none uppercase font-bold tracking-widest border border-black group-hover:bg-black group-hover:text-white group-hover:border-black">Get Pro</Button>
                            </Link>
                        </CardFooter>
                    </Card>

                </div>
            </div>
        </section>
    )
}
