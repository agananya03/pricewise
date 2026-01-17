"use client"

import { ScanBarcode, Github, Twitter, Instagram } from "lucide-react"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-black text-gray-300 py-16 border-t border-white">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-12">

                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 font-black text-xl text-white mb-6 uppercase tracking-wider">
                            <div className="h-8 w-8 border-2 border-white flex items-center justify-center text-white rounded-none">
                                <ScanBarcode className="h-5 w-5" />
                            </div>
                            <span>PriceWise</span>
                        </Link>
                        <p className="text-sm text-gray-500 font-mono">
                            Empowering shoppers with real-time community price intelligence. Stop overpaying. Start saving together.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Product</h4>
                        <ul className="space-y-3 text-sm font-mono">
                            <li><Link href="#features" className="hover:text-white hover:underline decoration-white/50 underline-offset-4 transition-all">Features</Link></li>
                            <li><Link href="/scan" className="hover:text-white hover:underline decoration-white/50 underline-offset-4 transition-all">Scanner</Link></li>
                            <li><Link href="/stores" className="hover:text-white hover:underline decoration-white/50 underline-offset-4 transition-all">Store Map</Link></li>
                            <li><Link href="/dashboard" className="hover:text-white hover:underline decoration-white/50 underline-offset-4 transition-all">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Community</h4>
                        <ul className="space-y-3 text-sm font-mono">
                            <li><Link href="/community" className="hover:text-white hover:underline decoration-white/50 underline-offset-4 transition-all">Leaderboard</Link></li>
                            <li><Link href="/" className="hover:text-white hover:underline decoration-white/50 underline-offset-4 transition-all">Success Stories</Link></li>
                            <li><Link href="/" className="hover:text-white hover:underline decoration-white/50 underline-offset-4 transition-all">Guidelines</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Legal</h4>
                        <ul className="space-y-3 text-sm font-mono">
                            <li><Link href="/" className="hover:text-white hover:underline decoration-white/50 underline-offset-4 transition-all">Privacy Policy</Link></li>
                            <li><Link href="/" className="hover:text-white hover:underline decoration-white/50 underline-offset-4 transition-all">Terms of Service</Link></li>
                            <li><Link href="/" className="hover:text-white hover:underline decoration-white/50 underline-offset-4 transition-all">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-gray-600 font-mono uppercase">
                        © 2024 PriceWise • Built for Smart Shoppers
                    </div>
                    <div className="flex gap-6">
                        <Github className="h-5 w-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                        <Twitter className="h-5 w-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                        <Instagram className="h-5 w-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>
            </div>
        </footer>
    )
}
