export interface OSMStore {
    id: string
    name: string
    latitude: number
    longitude: number
    address: string
    chain?: string
}

// List of Overpass API mirrors to try
const ENDPOINTS = [
    "https://overpass.kumi.systems/api/interpreter", // Often faster/less busy
    "https://overpass-api.de/api/interpreter",       // Main instance (busy)
]

export const fetchNearbyPlaces = async (lat: number, lng: number, radiusMs: number = 3000): Promise<OSMStore[]> => {
    // Try each endpoint in order
    for (const endpoint of ENDPOINTS) {
        try {
            console.log(`Fetching OSM places from ${endpoint}...`)
            const data = await fetchFromEndpoint(endpoint, lat, lng, radiusMs)
            console.log(`Success! Found ${data.length} real places.`)
            return data
        } catch (error) {
            console.warn(`Failed to fetch from ${endpoint}:`, error)
            // Continue to next endpoint
        }
    }

    console.warn("All OSM endpoints failed. Falling back to simulation.")
    return getSimulatedStores(lat, lng)
}

async function fetchFromEndpoint(url: string, lat: number, lng: number, radiusMs: number): Promise<OSMStore[]> {
    // 25s timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 25000)

    try {
        const query = `
            [out:json][timeout:25];
            (
              node["shop"~"supermarket|convenience|department_store|mall"](around:${radiusMs},${lat},${lng});
            );
            out body;
        `

        const response = await fetch(url, {
            method: "POST",
            body: query,
            signal: controller.signal
        })

        if (!response.ok) throw new Error(`Status ${response.status}`)

        const data = await response.json()
        const stores: OSMStore[] = []

        if (data && data.elements) {
            for (const el of data.elements) {
                if (el.tags && el.tags.name) {
                    let address = "Local Store"
                    const street = el.tags["addr:street"] || ""
                    const city = el.tags["addr:city"]

                    if (city && street) address = `${street}, ${city}`
                    else if (street) address = street
                    else address = "Nearby Location"

                    stores.push({
                        id: `osm-${el.id}`,
                        name: el.tags.name,
                        latitude: el.lat,
                        longitude: el.lon,
                        address: address,
                        chain: el.tags.brand || undefined
                    })
                }
            }
        }

        if (stores.length === 0) throw new Error("No results returned")
        return stores
    } finally {
        clearTimeout(timeoutId)
    }
}

function getSimulatedStores(lat: number, lng: number): OSMStore[] {
    const r = 0.005
    return [
        {
            id: 'sim-1',
            name: 'Local Supermarket (Simulated)',
            latitude: lat + r,
            longitude: lng + r,
            address: 'Simulated Address',
            chain: 'SuperMart'
        },
        {
            id: 'sim-2',
            name: 'Express Mart (Simulated)',
            latitude: lat - r,
            longitude: lng + r,
            address: 'Simulated Address',
        },
        {
            id: 'sim-3',
            name: 'Fresh Groceries (Simulated)',
            latitude: lat + r,
            longitude: lng - r,
            address: 'Simulated Address',
        },
        {
            id: 'sim-4',
            name: 'City Mall (Simulated)',
            latitude: lat - (r * 2),
            longitude: lng,
            address: 'Simulated Address',
        }
    ]
}
