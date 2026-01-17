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
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Nearby Stores</CardTitle>
                    <CardDescription>Locating you...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center p-4 text-sm text-muted-foreground bg-muted/50 rounded">
                        <MapPin className="w-4 h-4 mr-2 animate-pulse" />
                        Waiting for location permission...
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
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-lg flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-green-600" />
                    Nearby Stores
                </CardTitle>
                <CardDescription>Closest locations to you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {sortedStores.map(store => (
                    <div key={store.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                        <div>
                            <div className="font-semibold">{store.name}</div>
                            <div className="text-xs text-muted-foreground">{store.address}</div>
                            <div className="text-xs font-medium text-green-600 mt-1">
                                {store.distance.toFixed(1)} km away
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
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
