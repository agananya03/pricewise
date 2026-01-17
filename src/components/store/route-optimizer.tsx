"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Map, Navigation } from "lucide-react"
import { toast } from "sonner"

interface Store {
    id: string
    name: string
    latitude: number
    longitude: number
    address: string
}

export function RouteOptimizer({ stores }: { stores: Store[] }) {
    const [selectedStores, setSelectedStores] = useState<string[]>([])

    const toggleStore = (id: string) => {
        setSelectedStores(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        )
    }

    const handleOptimize = () => {
        if (selectedStores.length < 1) {
            toast.error("Select at least one store")
            return
        }

        // Build Google Maps Multi-stop URL
        // Format: https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=Last+Store&waypoints=Store1|Store2|Store3

        // We need coordinates for distinct waypoints
        const selectedObj = stores.filter(s => selectedStores.includes(s.id))

        // Simple logic: Origin = Current Location (handled by Maps), Destination = Last selected, Waypoints = Others
        // For better "optimization", a TSP algorithm would sort them.
        // Let's sort them by latitude as a "naive" optimization to group north-south
        const sorted = [...selectedObj].sort((a, b) => b.latitude - a.latitude)

        const destination = sorted[sorted.length - 1]
        const waypoints = sorted.slice(0, sorted.length - 1)

        const waypointsStr = waypoints.map(s => `${s.latitude},${s.longitude}`).join('|')
        const destinationStr = `${destination.latitude},${destination.longitude}`

        let url = `https://www.google.com/maps/dir/?api=1&destination=${destinationStr}`
        if (waypointsStr) {
            url += `&waypoints=${waypointsStr}`
        }

        window.open(url, '_blank')
        toast.success("Route plan opened in Google Maps")
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Map className="w-5 h-5" />
                    Trip Planner
                </CardTitle>
                <CardDescription>Select stores to build an optimized shopping route.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto">
                    {stores.map(store => (
                        <div key={store.id} className="flex items-center space-x-2 border p-2 rounded">
                            <Checkbox
                                id={`store-${store.id}`}
                                checked={selectedStores.includes(store.id)}
                                onCheckedChange={() => toggleStore(store.id)}
                            />
                            <label
                                htmlFor={`store-${store.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                                {store.name}
                            </label>
                        </div>
                    ))}
                </div>

                <Button onClick={handleOptimize} className="w-full" disabled={selectedStores.length === 0}>
                    <Navigation className="w-4 h-4 mr-2" />
                    Plan Optimized Route ({selectedStores.length})
                </Button>
            </CardContent>
        </Card>
    )
}
