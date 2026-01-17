
"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Upload, FileText, Loader2, Camera, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { OCRProcessor } from "@/services/ocr/processor"
import { toast } from "sonner"

interface ReceiptUploaderProps {
    onTextExtracted?: (text: string, file: File) => void
}

export function ReceiptUploader({ onTextExtracted }: ReceiptUploaderProps) {
    const [image, setImage] = useState<string | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [extractedText, setExtractedText] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0]
            setFile(selectedFile)
            setImage(URL.createObjectURL(selectedFile))
            setExtractedText(null)
            setProgress(0)
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const selectedFile = e.dataTransfer.files[0]
            if (selectedFile.type.startsWith('image/')) {
                setFile(selectedFile)
                setImage(URL.createObjectURL(selectedFile))
                setExtractedText(null)
                setProgress(0)
            } else {
                toast.error("Please upload an image file")
            }
        }
    }

    const processReceipt = async () => {
        if (!file) return

        setIsProcessing(true)
        setProgress(0)

        try {
            const result = await OCRProcessor.processImage(file, (p) => {
                setProgress(Math.round(p * 100))
            })
            setExtractedText(result.text)
            if (onTextExtracted) {
                onTextExtracted(result.text, file)
            } else {
                toast.success("Receipt processed successfully")
            }
        } catch (error) {
            toast.error("Failed to extract text from receipt")
        } finally {
            setIsProcessing(false)
        }
    }

    const clearImage = () => {
        setImage(null)
        setFile(null)
        setExtractedText(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    return (
        <div className="space-y-6">
            <div
                className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer relative"
                onClick={() => !image && fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                {image ? (
                    <div className="relative aspect-[3/4] max-h-96 mx-auto w-full max-w-sm rounded-md overflow-hidden bg-black/5">
                        <Image
                            src={image}
                            alt="Receipt"
                            fill
                            className="object-contain"
                        />
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={(e) => {
                                e.stopPropagation()
                                clearImage()
                            }}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="py-8 space-y-4">
                        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Upload className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Upload Receipt</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Drag and drop or click to select
                            </p>
                        </div>
                        <Button type="button" variant="outline" size="sm">
                            <Camera className="mr-2 h-4 w-4" /> Open Camera
                        </Button>
                    </div>
                )}
            </div>

            {image && !extractedText && (
                <Button
                    className="w-full"
                    size="lg"
                    onClick={processReceipt}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing ({progress}%)
                        </>
                    ) : (
                        <>
                            <FileText className="mr-2 h-4 w-4" />
                            Extract Text
                        </>
                    )}
                </Button>
            )}

            {isProcessing && (
                <Progress value={progress} className="w-full" />
            )}

            {extractedText && !onTextExtracted && (
                <Card>
                    <CardContent className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Extracted Text</h3>
                            <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(extractedText)}>
                                Copy
                            </Button>
                        </div>
                        <div className="bg-muted p-4 rounded-md text-sm font-mono whitespace-pre-wrap max-h-60 overflow-y-auto">
                            {extractedText}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
