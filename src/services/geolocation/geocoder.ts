export const getCoordinates = async (address: string) => {
    try {
        const query = encodeURIComponent(address)
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`, {
            headers: {
                'User-Agent': 'PricewiseApp/1.0'
            }
        })
        const data = await res.json()
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
                displayName: data[0].display_name
            }
        }
        return null
    } catch (error) {
        console.error("Geocoding error:", error)
        return null
    }
}

export const reverseGeocode = async (lat: number, lng: number) => {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`, {
            headers: {
                'User-Agent': 'PricewiseApp/1.0'
            }
        })
        const data = await res.json()
        if (data) {
            return {
                displayName: data.display_name,
                city: data.address?.city || data.address?.town || data.address?.village,
                state: data.address?.state,
                country: data.address?.country
            }
        }
        return null
    } catch (error) {
        console.error("Reverse geocoding error:", error)
        return null
    }
}
