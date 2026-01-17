"use client"

import Link from "next/link"
import { LayoutDashboard, Users, ShoppingCart, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function QuickLinks() {
    return (
        <section className="py-24 bg-gray-50 dark:bg-zinc-900/50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Explore the Ecosystem</h2>
                    <p className="text-lg text-muted-foreground">Everything you need to shop smarter, all in one place.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Dashboard Card */}
                    <Card className="group hover:border-purple-500 transition-all hover:shadow-lg">
                        <CardHeader>
                            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                                <LayoutDashboard className="h-6 w-6" />
                            </div>
                            <CardTitle>Analytics Dashboard</CardTitle>
                            <CardDescription>
                                Track your monthly savings, monitor spending habits, and get personalized insights.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/dashboard">
                                <Button variant="ghost" className="w-full group-hover:bg-purple-50 group-hover:text-purple-700 justify-between">
                                    Go to Dashboard
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Community Card */}
                    <Card className="group hover:border-blue-500 transition-all hover:shadow-lg">
                        <CardHeader>
                            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                                <Users className="h-6 w-6" />
                            </div>
                            <CardTitle>Community Hub</CardTitle>
                            <CardDescription>
                                Compete on leaderboards, earn badges, and share deals with other smart shoppers.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/community">
                                <Button variant="ghost" className="w-full group-hover:bg-blue-50 group-hover:text-blue-700 justify-between">
                                    Join Community
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Shopping List Card */}
                    <Card className="group hover:border-green-500 transition-all hover:shadow-lg">
                        <CardHeader>
                            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                                <ShoppingCart className="h-6 w-6" />
                            </div>
                            <CardTitle>Smart Shopping List</CardTitle>
                            <CardDescription>
                                Create lists that automatically find the cheapest store for your entire basket.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/shopping-list">
                                <Button variant="ghost" className="w-full group-hover:bg-green-50 group-hover:text-green-700 justify-between">
                                    Manage List
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
