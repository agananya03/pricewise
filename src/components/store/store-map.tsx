"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet.heat"
import { Button } from "@/components/ui/button"
import { Navigation } from "lucide-react"

// Fix for default Leaflet markers in Next.js
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

const HeatmapLayer = ({ points }: { points: [number, number, number][] }) => {
    const map = useMap()

    useEffect(() => {
        if (!points.length) return

        // @ts-ignore
        const heat = L.heatLayer(points, {
            radius: 25,
            blur: 15,
            maxZoom: 17,
        }).addTo(map)

        return () => {
            map.removeLayer(heat)
        }
    }, [points, map])

    return null
}

const RecenterMap = ({ center }: { center: [number, number] }) => {
    const map = useMap()
    useEffect(() => {
        map.setView(center)
    }, [center, map])
    return null
}

interface Store {
    id: string
    name: string
    latitude: number
    longitude: number
    address: string
}

interface StoreMapProps {
    stores: Store[]
    userLocation: [number, number] | null
}

export default function StoreMap({ stores, userLocation }: StoreMapProps) {
    const [center, setCenter] = useState<[number, number]>([40.7128, -74.0060]) // Default NYC

    useEffect(() => {
        if (userLocation) {
            setCenter(userLocation)
        }
    }, [userLocation])

    // Prepare heatmap data: [lat, lng, intensity]
    // Intensity could be dynamic based on deal count, but we'll use 0.5 for presence
    const heatPoints: [number, number, number][] = stores
        .filter(s => s.latitude && s.longitude)
        .map(s => [s.latitude, s.longitude, 0.5])

    return (
        <div className="h-[600px] w-full rounded-lg overflow-hidden border relative">
            <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {stores.map((store) => (
                    <Marker key={store.id} position={[store.latitude, store.longitude]}>
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold">{store.name}</h3>
                                <p className="text-sm text-gray-600">{store.address}</p>
                                <Button
                                    size="sm"
                                    className="mt-2 w-full"
                                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`, '_blank')}
                                >
                                    <Navigation className="w-3 h-3 mr-1" />
                                    Navigate
                                </Button>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {userLocation && (
                    <Marker position={userLocation} icon={new L.Icon({
                        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
                        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    })}>
                        <Popup>You are here</Popup>
                    </Marker>
                )}

                <HeatmapLayer points={heatPoints} />
                <RecenterMap center={center} />
            </MapContainer>
        </div>
    )
}
