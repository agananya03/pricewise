"use client"

import { format } from "date-fns"
import { ShoppingBag, Calendar, Image as ImageIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Receipt {
    id: string
    store: string
    date: Date
    total: number
    imageUrl?: string | null
    items: Array<{ id: string, name: string, price: number, quantity: number }>
}

interface ReceiptHistoryListProps {
    receipts: Receipt[]
}

export function ReceiptHistoryList({ receipts }: ReceiptHistoryListProps) {
    if (receipts.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground space-y-4">
                    <ShoppingBag className="h-12 w-12 opacity-50" />
                    <p>No receipts found. Upload your first one!</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {receipts.map((receipt) => (
                <Card key={receipt.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-semibold truncate pr-2">
                            {receipt.store}
                        </CardTitle>
                        <Badge variant="secondary" className="font-mono">
                            ${receipt.total.toFixed(2)}
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground mt-2">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                <span>{format(new Date(receipt.date as any), "PPP")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="h-4 w-4" />
                                <span>{receipt.items.length} items</span>
                            </div>
                            {receipt.imageUrl && (
                                <a
                                    href={receipt.imageUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-primary hover:underline mt-1"
                                >
                                    <ImageIcon className="h-4 w-4" />
                                    View Receipt Image
                                </a>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
