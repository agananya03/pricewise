"use client"

import { ReceiptUploader } from "@/components/receipt/receipt-uploader"
import { ReceiptReviewForm } from "@/components/receipt/receipt-review-form"
import { ReceiptParser } from "@/services/receipt/receipt-parser"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { History } from "lucide-react"

export default function ReceiptPage() {
    const [step, setStep] = useState<"upload" | "review">("upload")
    const [parsedData, setParsedData] = useState<any>(null)
    const [imageBase64, setImageBase64] = useState<string | null>(null)

    const handleTextExtracted = async (text: string, file: File) => {
        const data = ReceiptParser.parse(text)
        setParsedData(data)

        // Convert file to base64
        const reader = new FileReader()
        reader.onloadend = () => {
            setImageBase64(reader.result as string)
        }
        reader.readAsDataURL(file)

        setStep("review")
    }

    const handleSave = async (data: any) => {
        const payload = { ...data, imageBase64 }

        const res = await fetch('/api/receipts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        if (!res.ok) throw new Error("Failed to save")

        // Reset
        setStep("upload")
        setImageBase64(null)
        setParsedData(null)
    }

    return (
        <div className="container mx-auto max-w-6xl py-12 px-4">
            <div className="grid lg:grid-cols-2 gap-12">

                {/* Left Column: Functionality */}
                <div className="border-2 border-black min-h-[600px] p-12 flex flex-col justify-between relative bg-white">
                    <div className="space-y-8">
                        <div className="flex items-center justify-between border-b-2 border-black pb-6">
                            <div>
                                <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Receipt Scanner</h1>
                                <p className="text-muted-foreground font-bold font-mono uppercase tracking-wide text-[10px]">
                                    Upload / Extract / Analyze
                                </p>
                            </div>
                            <Button variant="outline" asChild className="rounded-none border-2 border-black hover:bg-black hover:text-white uppercase font-bold tracking-wider text-xs h-8">
                                <Link href="/receipt/history">
                                    <History className="mr-2 h-3 w-3" />
                                    History
                                </Link>
                            </Button>
                        </div>

                        {step === "upload" && (
                            <ReceiptUploader onTextExtracted={handleTextExtracted} />
                        )}

                        {step === "review" && parsedData && (
                            <ReceiptReviewForm
                                initialData={parsedData}
                                onSave={handleSave}
                                onCancel={() => {
                                    setStep("upload")
                                    setImageBase64(null)
                                }}
                            />
                        )}
                    </div>

                    <div className="pt-8 mt-auto border-t-2 border-dashed border-gray-200">
                        <div className="flex justify-between text-[10px] items-center font-mono uppercase text-gray-400">
                            <span>System Status: Online</span>
                            <span>v2.4.0</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Promo/Info Card */}
                <div className="bg-black text-white p-12 min-h-[600px] flex flex-col justify-between text-center relative overflow-hidden border-2 border-transparent hover:border-white transition-all group">
                    {/* Grid Pattern Background */}
                    <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')] z-0 pointer-events-none" />

                    <div className="relative z-10 space-y-8 flex-1 flex flex-col justify-center">
                        <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none uppercase">
                            Turn Paper <br />
                            <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Into Power</span>
                        </h2>

                        <div className="border-l-2 border-white pl-6 text-left max-w-sm mx-auto">
                            <p className="font-mono text-sm tracking-widest uppercase leading-relaxed">
                                Don't let your data fade away.
                                <br />
                                Scan receipts to unlock historical pricing and spending insights instantly.
                            </p>
                        </div>

                        <div className="pt-8 space-y-4 w-full max-w-xs mx-auto">
                            <div className="flex items-center gap-4 text-left">
                                <div className="h-8 w-8 rounded-full border border-white flex items-center justify-center font-bold">1</div>
                                <div className="font-mono text-xs uppercase tracking-widest">Snap a photo</div>
                            </div>
                            <div className="flex items-center gap-4 text-left">
                                <div className="h-8 w-8 rounded-full border border-white flex items-center justify-center font-bold">2</div>
                                <div className="font-mono text-xs uppercase tracking-widest">AI Extracts Data</div>
                            </div>
                            <div className="flex items-center gap-4 text-left">
                                <div className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center font-bold">3</div>
                                <div className="font-bold text-xs uppercase tracking-widest">Track & Save</div>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-center gap-8 pt-12 opacity-50 relative z-10">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🔒</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest">Secure & Private</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">⚡</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest">Instant Analysis</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
