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

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin h-6 w-6 text-black" /></div>

    return (
        <Card className="h-full flex flex-col overflow-visible border-black rounded-none shadow-none">
            <CardHeader className="pb-6 border-b border-black">
                <CardTitle className="flex justify-between items-center">
                    <span className="uppercase tracking-tighter text-2xl font-black">Shopping list</span>
                    <Badge variant="outline" className="text-lg rounded-none border-black border-2 px-3 py-1 font-mono font-bold">
                        ₹{estimatedTotal.toFixed(2)}
                    </Badge>
                </CardTitle>
                <CardDescription className="text-black/60 font-medium uppercase tracking-wide text-xs mt-1">
                    Manage your tech catalog and acquisitions.
                </CardDescription>
            </CardHeader>


            <div className="px-6 pb-2 relative z-20 mt-6">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-black" />
                        <Input
                            placeholder="SEARCH PRODUCTS..."
                            value={newItem}
                            onChange={(e) => searchProducts(e.target.value)}
                            onFocus={() => !newItem && browseProducts()}
                            onKeyDown={(e) => e.key === 'Enter' && addItem()}
                            className="pl-9 border-black rounded-none focus-visible:ring-0 focus-visible:border-black/60 font-medium uppercase placeholder:text-black/40"
                        />
                    </div>
                    <Button
                        onClick={() => newItem ? addItem() : browseProducts()}
                        size="icon"
                        className="rounded-none bg-black text-white hover:bg-black/80 border border-black"
                    >
                        {newItem ? <Plus className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                    </Button>
                </div>
                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                    <div className="absolute left-6 right-6 z-50 bg-white border border-black shadow-none mt-0 max-h-64 overflow-auto rounded-none">
                        {suggestions.map(p => (
                            <div
                                key={p.id}
                                className="p-3 hover:bg-black hover:text-white cursor-pointer flex justify-between text-sm border-b border-black last:border-0 transition-colors"
                                onClick={() => selectProduct(p)}
                            >
                                <span className="font-bold uppercase tracking-tight">{p.name}</span>
                                <span className="font-mono">
                                    ₹{p.prices?.[0]?.amount.toFixed(2) || '?'}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <CardContent className="space-y-4 flex-1 overflow-auto pt-6 z-10">
                <div className="space-y-0 text-black">
                    {items.length === 0 && (
                        <div className="text-center py-12 text-black/40 space-y-2 border-2 border-dashed border-black/20 m-2">
                            <Search className="h-8 w-8 mx-auto opacity-50" />
                            <p className="uppercase font-bold tracking-widest text-xs">List is empty</p>
                        </div>
                    )}
                    {items.map(item => (
                        <div key={item.id} className="flex items-center gap-4 p-4 border-b border-black/10 last:border-0 hover:bg-black/5 transition-colors group">
                            <div
                                className={`h-6 w-6 min-w-6 border-2 flex items-center justify-center cursor-pointer transition-all rounded-none ${item.checked ? 'bg-black border-black text-white' : 'border-black bg-transparent'
                                    }`}
                                onClick={() => toggleItem(item.id, !item.checked)}
                            >
                                {item.checked && <Check className="h-4 w-4" />}
                            </div>

                            <div className="flex-1 min-w-0">
                                <span className={`font-bold block truncate uppercase tracking-tight ${item.checked ? 'line-through text-black/30 decoration-2' : 'text-black'}`}>
                                    {item.name}
                                </span>
                                {item.product?.prices?.[0] && (
                                    <span className={`text-xs block truncate font-mono mt-1 ${item.checked ? 'text-black/30' : 'text-black/60'}`}>
                                        BEST: ₹{item.product.prices[0].amount.toFixed(2)}
                                        {item.product.prices[0].store && ` @ ${item.product.prices[0].store.name}`}
                                    </span>
                                )}
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 text-black hover:text-white hover:bg-black rounded-none"
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
