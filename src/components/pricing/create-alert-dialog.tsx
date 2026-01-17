"use client"

import { useState } from "react"
import { Bell, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

interface CreateAlertDialogProps {
    productId: string
    currentPrice: number
}

export function CreateAlertDialog({ productId, currentPrice }: CreateAlertDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [targetPrice, setTargetPrice] = useState(currentPrice.toString())
    const [condition, setCondition] = useState("BELOW")

    const onSubmit = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/alerts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId,
                    targetPrice: parseFloat(targetPrice),
                    condition
                })
            })

            if (!res.ok) throw new Error("Failed to create alert")

            toast.success("Price alert set successfully!")
            setOpen(false)
        } catch (error) {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    <Bell className="mr-2 h-4 w-4" />
                    Set Price Alert
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Set Price Alert</DialogTitle>
                    <DialogDescription>
                        We'll notify you when the price meets your criteria.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="condition" className="text-right">
                            Condition
                        </Label>
                        <Select value={condition} onValueChange={setCondition}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="BELOW">Price Drops Below</SelectItem>
                                <SelectItem value="ABOVE">Price Goes Above</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Target Price
                        </Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={targetPrice}
                            onChange={(e) => setTargetPrice(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={onSubmit} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Alert
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
