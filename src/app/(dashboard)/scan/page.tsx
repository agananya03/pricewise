
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

    const handleDetected = (code: string) => {
        if (code === lastScanned) return
        setLastScanned(code)
        setIsScanning(false)
        if (navigator.vibrate) navigator.vibrate(200)
    }

    const resetScan = () => {
        setLastScanned(null)
        setIsScanning(true)
    }

    return (
        <div className="container mx-auto max-w-lg p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Scan Barcode</CardTitle>
                    <CardDescription>
                        Point your camera at a product barcode to scan it.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                    {isScanning ? (
                        <div className="w-full aspect-[4/3] bg-black rounded-lg overflow-hidden">
                            <BarcodeScanner
                                onDetected={handleDetected}
                                className="w-full h-full"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 w-full">
                            <div className="text-center p-8 bg-muted rounded-lg w-full">
                                <p className="text-sm text-muted-foreground mb-2">Scanned Code</p>
                                <p className="text-3xl font-mono font-bold">{lastScanned}</p>
                            </div>
                            <div className="flex gap-4 w-full">
                                <Button onClick={resetScan} variant="outline" className="flex-1">
                                    Scan Again
                                </Button>
                                <Button
                                    className="flex-1"
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
    )
}
