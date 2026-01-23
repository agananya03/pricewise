"use client"

import { ScanBarcode, Receipt, ShieldAlert, MapPin, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Features() {
    return (
        <section id="features" className="py-24 bg-gray-50 dark:bg-zinc-900/50">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        How PriceWise Protects Your Wallet
                    </h2>
                    <p className="text-xl text-gray-500 dark:text-gray-400">
                        Powerful tools to ensure you never pay more than you should.
                    </p>
                </div>

                {/* 3-Column Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {/* Feature 1 */}
                    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                        <CardContent className="p-8 space-y-6 text-center">
                            <div className="h-16 w-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto text-purple-600 mb-6">
                                <ScanBarcode className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Instant Scanning</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Point your phone at any product barcode. Get instant price comparisons from stores in your area within seconds.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Feature 2 */}
                    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                        <CardContent className="p-8 space-y-6 text-center">
                            <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto text-blue-600 mb-6">
                                <Receipt className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Receipt Analysis</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Upload receipts and our AI automatically identifies overpriced items and suggests where to buy cheaper next time.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Feature 3 */}
                    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                        <CardContent className="p-8 space-y-6 text-center">
                            <div className="h-16 w-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto text-red-600 mb-6">
                                <ShieldAlert className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Gouging Alerts</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Get real-time notifications when prices spike above 25% of market average in your location.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Live Demo Section */}
                <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-zinc-700">
                    <div className="grid md:grid-cols-2">
                        {/* Left: Product Image */}
                        <div className="bg-gray-100 dark:bg-zinc-900 p-12 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-80 hover:scale-105 transition-transform duration-700" />
                            <div className="relative z-10 bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg font-bold text-gray-900">
                                Premium Almond Milk
                            </div>
                        </div>

                        {/* Right: Comparison Table */}
                        <div className="p-8 md:p-12 space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Live Price Check</h3>
                                <p className="text-gray-500">See how much you could save right now.</p>
                            </div>

                            <div className="space-y-4">
                                {/* Row 1: Your Price */}
                                <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-red-500" />
                                        <span className="font-medium text-gray-900 dark:text-white">Your Store</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-xl text-red-600">₹499</div>
                                        <div className="text-xs text-red-500 font-medium">23% ABOVE AVG ⚠️</div>
                                    </div>
                                </div>

                                {/* Row 2: Average */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-700/50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-gray-400" />
                                        <span className="font-medium text-gray-600 dark:text-gray-300">Market Average</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-xl text-gray-700 dark:text-gray-300">₹380</div>
                                    </div>
                                </div>

                                {/* Row 3: Best Deal */}
                                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/20 shadow-sm relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                            <Search className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-900 dark:text-white block">Target</span>
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <MapPin className="h-3 w-3" /> 2.3 miles away
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-2xl text-green-600">₹299</div>
                                        <div className="text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-full inline-block">Best Deal</div>
                                    </div>
                                </div>
                            </div>

                            <Link href="/stores" className="block w-full">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-lg h-12">
                                    Find Better Deals Near You
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
