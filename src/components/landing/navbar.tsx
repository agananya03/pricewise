"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScanBarcode, ShoppingBag, Users, LayoutDashboard, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function LandingNavbar() {
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { name: "Features", href: "#features" },
        { name: "Community", href: "/community" },
        { name: "Pricing", href: "#pricing" },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 font-black text-xl tracking-tight uppercase text-white group">
                    <div className="h-10 w-10 border-2 border-white flex items-center justify-center text-white rounded-none group-hover:bg-white group-hover:text-black transition-colors">
                        <ScanBarcode className="h-6 w-6" />
                    </div>
                    <span>PriceWise</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-mono uppercase tracking-widest text-white hover:text-gray-300 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all hover:after:w-full"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="font-mono text-xs uppercase tracking-widest text-white hover:text-black hover:bg-white rounded-none border border-transparent hover:border-transparent">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/scan">
                        <Button className="bg-white text-black hover:bg-gray-200 rounded-none border-2 border-white px-8 uppercase font-bold tracking-widest text-xs shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
                            Start Scanning
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white hover:text-black rounded-none">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="bg-black border-l border-white text-white">
                        <div className="flex flex-col gap-8 mt-12">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-black uppercase tracking-tighter hover:text-gray-300 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-white/20 my-2" />
                            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                <Button className="w-full justify-start rounded-none border border-white text-white hover:bg-white hover:text-black font-mono uppercase tracking-widest" variant="ghost">
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    Dashboard
                                </Button>
                            </Link>
                            <Link href="/scan" onClick={() => setIsOpen(false)}>
                                <Button className="w-full justify-start bg-white text-black hover:bg-gray-200 rounded-none font-bold uppercase tracking-widest">
                                    <ScanBarcode className="mr-2 h-4 w-4" />
                                    Scan Now
                                </Button>
                            </Link>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
