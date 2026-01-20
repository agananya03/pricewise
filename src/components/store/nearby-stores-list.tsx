"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"

interface Store {
    id: string
    name: string
    latitude: number
    longitude: number
    address: string
}

interface NearbyStoresListProps {
    stores: Store[]
    userLocation: [number, number] | null
}

export function NearbyStoresList({ stores, userLocation }: NearbyStoresListProps) {
    if (!userLocation) {
        return (
            <Card className="rounded-none border-black shadow-none">
                <CardHeader className="border-b border-black pb-4">
                    <CardTitle className="text-lg uppercase font-black tracking-tight">Nearby Stores</CardTitle>
                    <CardDescription className="uppercase font-bold text-xs tracking-widest text-black/60">Triangulating...</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-center p-4 text-xs font-mono uppercase tracking-widest text-black bg-black/5 border border-black">
                        <MapPin className="w-4 h-4 mr-2 animate-pulse" />
                        Awaiting Permissions...
                    </div>
                </CardContent>
            </Card>
        )
    }

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371 // km
        const dLat = (lat2 - lat1) * Math.PI / 180
        const dLon = (lon2 - lon1) * Math.PI / 180
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c
    }

    const sortedStores = stores
        .map(store => ({
            ...store,
            distance: calculateDistance(userLocation[0], userLocation[1], store.latitude, store.longitude)
        }))
        .filter(store => store.distance < 200) // Filter out stores > 200km away
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5) // Top 5

    return (
        <Card className="h-full rounded-none border-black shadow-none">
            <CardHeader className="border-b border-black pb-4">
                <CardTitle className="text-lg flex items-center uppercase font-black tracking-tight">
                    <MapPin className="w-5 h-5 mr-2 text-black" />
                    Nearby Nodes
                </CardTitle>
                <CardDescription className="uppercase font-bold text-xs tracking-widest text-black/60">Proximity Vector</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {sortedStores.map(store => (
                    <div key={store.id} className="flex items-center justify-between border-b border-black/10 pb-3 last:border-0 last:pb-0 hover:bg-black/5 p-2 transition-colors -mx-2 px-4">
                        <div>
                            <div className="font-bold uppercase text-sm tracking-tight">{store.name}</div>
                            <div className="text-[10px] uppercase font-mono text-black/50">{store.address}</div>
                            <div className="text-xs font-bold font-mono text-black mt-1">
                                {store.distance.toFixed(1)} KM
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-none border-black hover:bg-black hover:text-white"
                            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`, '_blank')}
                        >
                            <Navigation className="w-3 h-3" />
                        </Button>
                    </div>
                ))}
                {sortedStores.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center">No stores found with valid coordinates.</p>
                )}
            </CardContent>
        </Card>
    )
}
