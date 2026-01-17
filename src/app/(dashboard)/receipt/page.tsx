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
        <div className="container max-w-2xl py-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Receipt Scanner</h1>
                    <p className="text-muted-foreground">
                        Upload a receipt to automatically extract prices and products.
                    </p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/receipt/history">
                        <History className="mr-2 h-4 w-4" />
                        View History
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
    )
}
