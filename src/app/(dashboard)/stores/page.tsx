"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { RouteOptimizer } from "@/components/store/route-optimizer"
import { NearbyStoresList } from "@/components/store/nearby-stores-list"
import { toast } from "sonner"

// Dynamically import StoreMap to avoid SSR issues with Leaflet
const StoreMap = dynamic(() => import("@/components/store/store-map"), {
    ssr: false,
    loading: () => (
        <div className="h-[600px] w-full flex items-center justify-center bg-muted animate-pulse rounded-lg">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading Map...</span>
        </div>
    ),
})

interface Store {
    id: string
    name: string
    latitude: number
    longitude: number
    address: string
}

export default function StoresPage() {
    const [stores, setStores] = useState<Store[]>([])
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
    const [loading, setLoading] = useState(true)

    // 1. Get Location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("Got location:", position.coords)
                    setUserLocation([position.coords.latitude, position.coords.longitude])
                },
                (error) => {
                    console.error("Location error", error)
                    toast.error("Could not access location. Showing default stores.")
                }
            )
        }
    }, [])

    // 2. Fetch Stores (Refetch when location changes)
    useEffect(() => {
        const fetchStores = async () => {
            setLoading(true)
            try {
                let url = '/api/stores'

                // If we have a location, ask API to find nearby OSM places
                if (userLocation) {
                    url += `?lat=${userLocation[0]}&lng=${userLocation[1]}`
                    console.log("Fetching nearby stores from:", url)
                } else {
                    console.log("Fetching default stores (no location yet)")
                }

                const res = await fetch(url)
                if (!res.ok) throw new Error('Failed to fetch stores')
                const data = await res.json()
                console.log("Stores received:", data.length)
                setStores(data)

                if (userLocation && data.length > 5 && !data.some((s: any) => s.id.startsWith('osm-'))) {
                    // If we have location but no OSM stores, maybe OSM failed?
                    console.warn("Location active but no OSM stores found?")
                }

            } catch (error) {
                console.error(error)
                toast.error("Failed to load stores")
            } finally {
                setLoading(false)
            }
        }

        fetchStores()
    }, [userLocation])

    return (
        <div className="container py-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Store Locator</h1>
                <p className="text-muted-foreground">
                    Discover discount hot-zones and find nearby stores. Yellow glow indicates high store density.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card className="h-[800px]">
                        <CardHeader className="pb-3">
                            <CardTitle>Interactive Map</CardTitle>
                            <CardDescription>
                                {stores.length} stores mapped. {userLocation ? "Showing stores near you." : "Enable location to see local stores."}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="h-[720px] p-0 overflow-hidden relative">
                            <StoreMap stores={stores} userLocation={userLocation} />
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-1 space-y-6">
                    <NearbyStoresList stores={stores} userLocation={userLocation} />
                    <RouteOptimizer stores={stores} />
                </div>
            </div>
        </div>
    )
}
