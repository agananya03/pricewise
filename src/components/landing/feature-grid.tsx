"use client"

import { ScanBarcode, Receipt, ListTodo, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function FeatureGrid() {
    return (
        <section id="features" className="py-24 bg-black border-b border-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase">
                        Toolkit
                    </h2>
                    <p className="text-xl text-gray-400 font-mono">
                        // ESSENTIAL TOOLS FOR SMART SHOPPING
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Feature 1 */}
                    <Link href="/scan">
                        <Card className="bg-black border-2 border-white rounded-none shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200 h-full">
                            <CardContent className="p-8 text-center space-y-6">
                                <div className="h-20 w-20 border-2 border-white flex items-center justify-center mx-auto text-white">
                                    <ScanBarcode className="h-10 w-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Instant Scan</h3>
                                    <p className="text-gray-400 text-sm font-mono leading-relaxed">
                                        {'>'} Point phone.<br />{'>'} Get prices.<br />{'>'} Save money.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Feature 2 */}
                    <Link href="/receipt">
                        <Card className="bg-black border-2 border-white rounded-none shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200 h-full">
                            <CardContent className="p-8 text-center space-y-6">
                                <div className="h-20 w-20 border-2 border-white flex items-center justify-center mx-auto text-white">
                                    <Receipt className="h-10 w-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Receipt AI</h3>
                                    <p className="text-gray-400 text-sm font-mono leading-relaxed">
                                        {'>'} Upload receipt.<br />{'>'} AI analysis.<br />{'>'} Auto-track.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Feature 3 */}
                    <Link href="/shopping-list">
                        <Card className="bg-black border-2 border-white rounded-none shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200 h-full">
                            <CardContent className="p-8 text-center space-y-6">
                                <div className="h-20 w-20 border-2 border-white flex items-center justify-center mx-auto text-white">
                                    <ListTodo className="h-10 w-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Shopping List</h3>
                                    <p className="text-gray-400 text-sm font-mono leading-relaxed">
                                        {'>'} Add products.<br />{'>'} Track spend.<br />{'>'} Stay organized.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Feature 4 */}
                    <Link href="/community">
                        <Card className="bg-black border-2 border-white rounded-none shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200 h-full">
                            <CardContent className="p-8 text-center space-y-6">
                                <div className="h-20 w-20 border-2 border-white flex items-center justify-center mx-auto text-white">
                                    <Users className="h-10 w-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Community</h3>
                                    <p className="text-gray-400 text-sm font-mono leading-relaxed">
                                        {'>'} Real prices.<br />{'>'} Real people.<br />{'>'} Real savings.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                </div>
            </div>
        </section>
    )
}
