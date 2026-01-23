
"use client"

import { useState } from "react"
import { BarcodeScanner } from "@/components/scanner/barcode-scanner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ScanPage() {
    const router = useRouter()
    const [lastScanned, setLastScanned] = useState<string | null>(null)
    const [isScanning, setIsScanning] = useState(true)
    const [scanHistory, setScanHistory] = useState<string[]>([])

    const handleDetected = (code: string) => {
        if (code === lastScanned) return
        setLastScanned(code)
        setIsScanning(false)
        setScanHistory(prev => [code, ...prev.filter(c => c !== code)].slice(0, 10))
        if (navigator.vibrate) navigator.vibrate(200)
    }

    const resetScan = () => {
        setLastScanned(null)
        setIsScanning(true)
    }

    return (
        <div className="container mx-auto max-w-6xl p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="rounded-none border-foreground shadow-none">
                        <CardHeader className="border-b border-foreground pb-4">
                            <CardTitle className="uppercase font-black tracking-tighter text-3xl">Universal Scanner</CardTitle>
                            <CardDescription className="uppercase font-bold text-xs tracking-widest text-muted-foreground">
                                Input Optical Data
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center gap-6 pt-6">
                            {isScanning ? (
                                <div className="w-full aspect-video bg-black relative border-4 border-foreground overflow-hidden">
                                    <BarcodeScanner
                                        onDetected={handleDetected}
                                        className="w-full h-full opacity-80"
                                    />
                                    {/* Viewfinder Overlay */}
                                    <div className="absolute inset-0 pointer-events-none">
                                        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-white"></div>
                                        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-white"></div>
                                        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-white"></div>
                                        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-white"></div>
                                        <div className="absolute top-1/2 left-1/2 w-full h-[2px] bg-red-500/50 -translate-x-1/2 -translate-y-1/2"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4 w-full">
                                    <div className="text-center p-8 bg-foreground/5 border border-foreground w-full">
                                        <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground mb-2">Scanned Code</p>
                                        <p className="text-4xl font-mono font-black tracking-widest">{lastScanned}</p>
                                    </div>
                                    <div className="flex gap-4 w-full">
                                        <Button onClick={resetScan} variant="outline" className="flex-1 rounded-none border-foreground hover:bg-foreground hover:text-background uppercase font-bold tracking-wider h-12">
                                            Scan Again
                                        </Button>
                                        <Button
                                            className="flex-1 rounded-none bg-black text-white hover:bg-black/90 uppercase font-bold tracking-wider h-12"
                                            onClick={() => router.push(`/product/${lastScanned}`)}
                                        >
                                            Lookup Product
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card className="rounded-none border-foreground shadow-none h-full">
                        <CardHeader className="border-b border-foreground pb-4">
                            <CardTitle className="uppercase font-black tracking-tighter text-xl">Recent Scans</CardTitle>
                            <CardDescription className="uppercase font-bold text-xs tracking-widest text-muted-foreground">
                                Session History
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            {scanHistory.length === 0 ? (
                                <div className="p-6 text-center text-muted-foreground uppercase text-xs font-bold tracking-widest">
                                    No scans yet
                                </div>
                            ) : (
                                <div className="divide-y divide-foreground">
                                    {scanHistory.map((code, i) => (
                                        <div key={code} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors group">
                                            <span className="font-mono font-bold">{code}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => router.push(`/product/${code}`)}
                                                className="opacity-0 group-hover:opacity-100 uppercase text-xs font-bold tracking-widest"
                                            >
                                                View
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
