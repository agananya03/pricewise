export const getCoordinates = async (address: string, retries = 1) => {
    const query = encodeURIComponent(address);
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`, {
                headers: {
                    'User-Agent': 'PricewiseApp/1.0 (https://github.com/agananya03/pricewise)'
                },
                signal: AbortSignal.timeout(5000) // 5 second timeout
            });

            if (res.status === 429) {
                console.warn('[Geocoder Rate Limit] OpenStreetMap returned 429 Too Many Requests.');
                return null;
            }

            if (!res.ok) {
                if (res.status >= 500 && attempt < retries) {
                    await new Promise(r => setTimeout(r, 500));
                    continue;
                }
                return null;
            }

            const data = await res.json();
            if (Array.isArray(data) && data.length > 0 && data[0]?.lat && data[0]?.lon) {
                return {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon),
                    displayName: data[0].display_name
                };
            }
            return null;
        } catch (error: any) {
            if (attempt < retries && error.name !== 'AbortError') {
                await new Promise(r => setTimeout(r, 500));
                continue;
            }
            console.error("Geocoding error:", error);
            return null;
        }
    }
    return null;
}

export const reverseGeocode = async (lat: number, lng: number, retries = 1) => {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`, {
                headers: {
                    'User-Agent': 'PricewiseApp/1.0 (https://github.com/agananya03/pricewise)'
                },
                signal: AbortSignal.timeout(5000) // 5 second timeout
            });

            if (res.status === 429) {
                console.warn('[Reverse Geocoder Rate Limit] OpenStreetMap returned 429 Too Many Requests.');
                return null;
            }

            if (!res.ok) {
                if (res.status >= 500 && attempt < retries) {
                    await new Promise(r => setTimeout(r, 500));
                    continue;
                }
                return null;
            }

            const data = await res.json();
            if (data && typeof data === 'object') {
                return {
                    displayName: data.display_name,
                    city: data.address?.city || data.address?.town || data.address?.village,
                    state: data.address?.state,
                    country: data.address?.country
                };
            }
            return null;
        } catch (error: any) {
            if (attempt < retries && error.name !== 'AbortError') {
                await new Promise(r => setTimeout(r, 500));
                continue;
            }
            console.error("Reverse geocoding error:", error);
            return null;
        }
    }
    return null;
}
