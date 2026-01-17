"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function FavoriteButton({ productId, initialFavorited = false }: { productId: string, initialFavorited?: boolean }) {
    const [favorited, setFavorited] = useState(initialFavorited)

    const toggle = async (e: React.MouseEvent) => {
        e.preventDefault() // Prevent link clicks
        const newState = !favorited
        setFavorited(newState) // Optimistic

        try {
            const res = await fetch('/api/products/favorite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId })
            })
            const data = await res.json()
            setFavorited(data.favorited)
            toast.success(data.favorited ? "Added to favorites" : "Removed from favorites")
        } catch (error) {
            setFavorited(!newState) // Revert
            toast.error("Failed to update favorites")
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent"
            onClick={toggle}
        >
            <Heart
                className={cn(
                    "h-5 w-5 transition-colors",
                    favorited ? "fill-red-500 text-red-500" : "text-muted-foreground"
                )}
            />
        </Button>
    )
}
