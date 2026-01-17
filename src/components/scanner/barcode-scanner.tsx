
"use client"

import React, { useEffect, useRef, useState } from "react"
import Quagga from "quagga"
import { cn } from "@/lib/utils"

interface BarcodeScannerProps {
    onDetected: (code: string) => void
    onError?: (error: any) => void
    aspectRatio?: { min: number; max: number }
    className?: string
}

export function BarcodeScanner({
    onDetected,
    onError,
    className,
}: BarcodeScannerProps) {
    const scannerRef = useRef<HTMLDivElement>(null)
    const [initialized, setInitialized] = useState(false)
    const lastScannedCode = useRef<string | null>(null)
    const scanCount = useRef<number>(0)
    const REQUIRED_SCANS = 3

    useEffect(() => {
        if (!scannerRef.current) return

        Quagga.init(
            {
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: scannerRef.current,
                    constraints: {
                        width: 1280,
                        height: 720,
                        facingMode: "environment",
                    },
                },
                locator: {
                    patchSize: "medium",
                    halfSample: false,
                },
                numOfWorkers: 2,
                decoder: {
                    readers: [
                        "ean_reader",
                        "ean_8_reader",
                        "code_128_reader",
                        "upc_reader",
                        "upc_e_reader",
                    ],
                },
                locate: true,
            },
            (err) => {
                if (err) {
                    console.error("Error starting Quagga:", err)
                    if (onError) onError(err)
                    return
                }
                Quagga.start()
                setInitialized(true)
            }
        )

        Quagga.onDetected((result) => {
            const code = result.codeResult.code
            if (!code) return

            // Stability check: Only accept code if scanned multiple times in a row
            if (code === lastScannedCode.current) {
                scanCount.current += 1
                if (scanCount.current >= REQUIRED_SCANS) {
                    onDetected(code)
                    // Optional: reset count to avoid spamming, or keep firing?
                    // Usually better to debounce on parent side, but we can reset here.
                    scanCount.current = 0
                    lastScannedCode.current = null // Reset so we need fresh scans for next trigger
                }
            } else {
                lastScannedCode.current = code
                scanCount.current = 1
            }
        })

        return () => {
            Quagga.stop()
        }
    }, [onDetected, onError])

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return

        const file = e.target.files[0]
        const objectUrl = URL.createObjectURL(file)

        Quagga.decodeSingle(
            {
                decoder: {
                    readers: [
                        "ean_reader",
                        "ean_8_reader",
                        "code_128_reader",
                        "upc_reader",
                        "upc_e_reader",
                    ],
                },
                locate: true,
                src: objectUrl,
            },
            (result: any) => {
                if (result?.codeResult) {
                    onDetected(result.codeResult.code)
                } else {
                    if (onError) onError(new Error("No barcode found in image"))
                }
                URL.revokeObjectURL(objectUrl)
                // Reset input value to allow selecting same file again
                if (fileInputRef.current) fileInputRef.current.value = ""
            }
        )
    }

    return (
        <div
            ref={scannerRef}
            className={cn(
                "relative overflow-hidden rounded-lg bg-black group",
                className
            )}
        >
            {!initialized && (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                    Initializing Camera...
                </div>
            )}
            {/* Overlay for scanning area guidance */}
            {initialized && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-48 w-64 rounded-lg border-2 border-white/50 bg-transparent shadow-[0_0_0_1000px_rgba(0,0,0,0.5)]" />
                </div>
            )}

            {/* Upload Button Overlay */}
            <div className="absolute bottom-4 right-4 z-10">
                <input
                    type="file"
                    accept="image/*" // Correct attribute for file input
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                <button
                    onClick={handleUploadClick}
                    type="button" // Prevent form submission if inside a form
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/40 text-white"
                    title="Upload Barcode Image"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" x2="12" y1="3" y2="15" />
                    </svg>
                    <span className="sr-only">Upload Image</span>
                </button>
            </div>
        </div>
    )
}
