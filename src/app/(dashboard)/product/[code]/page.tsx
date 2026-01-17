
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Loader2, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ManualEntryForm } from "@/components/product/manual-entry-form"
import { PriceSubmissionForm } from "@/components/pricing/price-submission-form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface ProductData {
    barcode: string
    name: string
    description?: string
    imageUrl?: string
    category?: string
    brand?: string
    source: string
}

export default function ProductPage() {
    const params = useParams<{ code: string }>()
    const router = useRouter()
    const [product, setProduct] = useState<ProductData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchProduct() {
            if (!params.code) return

            try {
                const res = await fetch(`/api/products/${params.code}`)
                if (!res.ok) {
                    if (res.status === 404) {
                        setError("Product not found")
                    } else {
                        setError("Failed to fetch product details")
                    }
                    setProduct(null)
                } else {
                    const data = await res.json()
                    setProduct(data)
                    setError(null)
                }
            } catch (err) {
                setError("An unexpected error occurred")
                setProduct(null)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [params.code])

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    return (
        <div className="container max-w-2xl py-6 space-y-6">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {error ? (
                <Card className="border-destructive/50">
                    <CardHeader>
                        <CardTitle className="text-destructive">Product Not Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-6">
                            We couldn't find any information for barcode <strong>{params?.code}</strong>.
                        </p>
                        <Separator className="my-4" />
                        <ManualEntryForm />
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="text-2xl">{product?.name}</CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">{product?.brand}</p>
                            </div>
                            {product?.category && <Badge variant="secondary">{product.category}</Badge>}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {product?.imageUrl && (
                            <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-lg border bg-white">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-4"
                                    unoptimized // External images might not be optimized
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">Details</h3>
                            <p className="text-sm"><strong>Barcode:</strong> {product?.barcode}</p>
                            {product?.description && <p className="text-sm text-muted-foreground">{product.description}</p>}
                            <p className="text-xs text-muted-foreground pt-2">Source: {product?.source}</p>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Price
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add Price</DialogTitle>
                                        <DialogDescription>
                                            Submit a new price for {product?.name}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <PriceSubmissionForm
                                        barcode={params.code}
                                        productData={{
                                            name: product?.name || "",
                                            category: product?.category,
                                            imageUrl: product?.imageUrl
                                        }}
                                        onSuccess={() => {
                                            // Ideally refresh data or close dialog
                                        }}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
