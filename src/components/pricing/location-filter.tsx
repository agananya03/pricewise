"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MapPin, Loader2, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

export function LocationFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState(false)
    const [radius, setRadius] = useState(50)

    useEffect(() => {
        const lat = searchParams.get("lat")
        const lng = searchParams.get("lng")
        const r = searchParams.get("radius")

        if (lat && lng) {
            setActive(true)
        }
        if (r) {
            setRadius(parseInt(r))
        }
    }, [searchParams])

    const handleLocate = () => {
        setLoading(true)
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser")
            setLoading(false)
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toString()
                const lng = position.coords.longitude.toString()

                const params = new URLSearchParams(searchParams.toString())
                params.set("lat", lat)
                params.set("lng", lng)
                params.set("radius", radius.toString())

                router.push(`?${params.toString()}`)
                toast.success("Location updated successfully")
                setLoading(false)
                setActive(true)
            },
            (error) => {
                console.error(error)
                toast.error("Unable to retrieve your location")
                setLoading(false)
            }
        )
    }

    const handleReset = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete("lat")
        params.delete("lng")
        params.delete("radius")
        router.push(`?${params.toString()}`)
        setActive(false)
    }

    const handleRadiusChange = (vals: number[]) => {
        setRadius(vals[0])
        if (active) {
            // Update URL only if we are already using location
            const params = new URLSearchParams(searchParams.toString())
            params.set("radius", vals[0].toString())
            router.push(`?${params.toString()}`)
        }
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Location Filter</span>
                        {active && (
                            <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 px-2 text-muted-foreground">
                                <RotateCcw className="w-3 h-3 mr-1" />
                                Clear
                            </Button>
                        )}
                    </div>

                    {!active ? (
                        <Button onClick={handleLocate} disabled={loading} className="w-full">
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MapPin className="mr-2 h-4 w-4" />}
                            Use My Location
                        </Button>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-2 rounded text-sm font-medium">
                                <MapPin className="w-4 h-4" />
                                <span>Using Current Location</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Radius</span>
                                    <span>{radius} km</span>
                                </div>
                                <Slider
                                    value={[radius]}
                                    onValueChange={handleRadiusChange}
                                    max={200}
                                    min={5}
                                    step={5}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
