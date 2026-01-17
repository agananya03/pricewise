import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { fetchNearbyPlaces } from "@/services/geolocation/osm-places"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const latParam = searchParams.get('lat')
    const lngParam = searchParams.get('lng')

    try {
        // 1. Fetch DB Stores
        const dbStores = await prisma.store.findMany({
            where: {
                latitude: { gte: -90 },
                longitude: { gte: -180 }
            },
            select: {
                id: true,
                name: true,
                latitude: true,
                longitude: true,
                address: true,
                chain: true
            }
        })

        let allStores = dbStores.map(s => ({
            ...s,
            latitude: s.latitude!,
            longitude: s.longitude!
        }))

        // 2. Fetch OSM Stores if location provided
        if (latParam && lngParam) {
            const lat = parseFloat(latParam)
            const lng = parseFloat(lngParam)

            // Only fetch from OSM, don't worry about merging duplicates yet
            // @ts-ignore
            const osmStores = await fetchNearbyPlaces(lat, lng)

            // @ts-ignore
            allStores = [...allStores, ...osmStores]
        }

        return NextResponse.json(allStores)
    } catch (error) {
        console.error("Error fetching stores:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
