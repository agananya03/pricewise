"use client"

import { useState, useEffect } from "react"
import { Check, Plus, Trash, Loader2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

interface ListItem {
    id: string
    name: string
    quantity: number
    checked: boolean
    product?: {
        name: string
        prices: { amount: number, store?: { name: string } }[]
    }
}

interface ProductSuggestion {
    id: string
    name: string
    prices: { amount: number }[]
}

export function ShoppingListManager() {
    const [items, setItems] = useState<ListItem[]>([])
    const [newItem, setNewItem] = useState("")
    const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([])
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchList()
    }, [])

    const fetchList = async () => {
        try {
            const res = await fetch('/api/shopping-list')
            const list = await res.json()
            if (list && list.items) {
                setItems(list.items)
            }
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    const searchProducts = async (query: string) => {
        setNewItem(query)
        setSelectedProductId(null) // Reset selection on type

        if (query.length > 0) {
            try {
                const res = await fetch(`/api/products/search?q=${query}`)
                const data = await res.json()
                setSuggestions(data.products || [])
            } catch (e) {
                // ignore
            }
        } else {
            setSuggestions([])
        }
    }

    const browseProducts = async () => {
        try {
            const res = await fetch(`/api/products/search`) // Empty query = get all
            const data = await res.json()
            setSuggestions(data.products || [])
        } catch (e) { }
    }

    const addItem = async () => {
        if (!newItem.trim()) return

        try {
            const res = await fetch('/api/shopping-list', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newItem,
                    quantity: 1,
                    productId: selectedProductId
                })
            })
            if (!res.ok) throw new Error("Failed")
            const savedItem = await res.json()
            setItems([...items, savedItem])
            setNewItem("")
            setSuggestions([])
            setSelectedProductId(null)
            toast.success("Item added")
        } catch (error) {
            toast.error("Could not add item")
        }
    }

    const deleteItem = async (id: string) => {
        // Optimistic delete
        const oldItems = items
        setItems(items.filter(i => i.id !== id))

        try {
            await fetch(`/api/shopping-list?itemId=${id}`, { method: 'DELETE' })
            toast.success("Item removed")
        } catch (error) {
            setItems(oldItems)
            toast.error("Could not delete item")
        }
    }

    const toggleItem = async (id: string, checked: boolean) => {
        setItems(items.map(i => i.id === id ? { ...i, checked } : i))
        try {
            await fetch('/api/shopping-list', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemId: id, checked })
            })
        } catch (error) { }
    }

    const selectProduct = (p: ProductSuggestion) => {
        setNewItem(p.name)
        setSelectedProductId(p.id)
        setSuggestions([])
        // Optional: Auto-add? Or let user click plus? Let's just fill input.
    }

    const estimatedTotal = items
        .filter(i => !i.checked)
        .reduce((sum, item) => {
            const price = item.product?.prices?.[0]?.amount || 0
            return sum + (price * item.quantity)
        }, 0)

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>

    return (
        <Card className="h-full flex flex-col overflow-visible">
            <CardHeader className="pb-4">
                <CardTitle className="flex justify-between items-center">
                    <span>Shopping List</span>
                    <Badge variant="secondary" className="text-lg">
                        ${estimatedTotal.toFixed(2)}
                    </Badge>
                </CardTitle>
                <CardDescription>Add items from your catalog or manually.</CardDescription>
            </CardHeader>

            <div className="px-6 pb-2 relative z-20">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search products (e.g. Milk)..."
                            value={newItem}
                            onChange={(e) => searchProducts(e.target.value)}
                            onFocus={() => !newItem && browseProducts()}
                            onKeyDown={(e) => e.key === 'Enter' && addItem()}
                            className="pl-8"
                        />
                    </div>
                    <Button
                        onClick={() => newItem ? addItem() : browseProducts()}
                        size="icon"
                        variant={newItem ? "default" : "outline"}
                    >
                        {newItem ? <Plus className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                    </Button>
                </div>
                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                    <div className="absolute left-6 right-6 z-50 bg-background border rounded-md shadow-xl mt-1 max-h-64 overflow-auto">
                        {suggestions.map(p => (
                            <div
                                key={p.id}
                                className="p-3 hover:bg-muted cursor-pointer flex justify-between text-sm border-b last:border-0"
                                onClick={() => selectProduct(p)}
                            >
                                <span className="font-medium">{p.name}</span>
                                <span className="text-green-600 font-bold">
                                    ${p.prices?.[0]?.amount.toFixed(2) || '?'}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <CardContent className="space-y-4 flex-1 overflow-auto pt-2 z-10">
                <div className="space-y-2">
                    {items.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground space-y-2">
                            <Search className="h-8 w-8 mx-auto opacity-20" />
                            <p>List is empty. Search to add products!</p>
                        </div>
                    )}
                    {items.map(item => (
                        <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group">
                            <div
                                className={`h-5 w-5 min-w-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${item.checked ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'
                                    }`}
                                onClick={() => toggleItem(item.id, !item.checked)}
                            >
                                {item.checked && <Check className="h-3 w-3" />}
                            </div>

                            <div className="flex-1 min-w-0">
                                <span className={`font-medium block truncate ${item.checked ? 'line-through text-muted-foreground' : ''}`}>
                                    {item.name}
                                </span>
                                {item.product?.prices?.[0] && (
                                    <span className="text-xs text-green-600 block truncate">
                                        Best: ${item.product.prices[0].amount.toFixed(2)}
                                        {item.product.prices[0].store && ` @ ${item.product.prices[0].store.name}`}
                                    </span>
                                )}
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => deleteItem(item.id)}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
