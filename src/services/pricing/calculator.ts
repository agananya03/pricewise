export const calculatePriceMetrics = (prices: number[]) => {
    if (!prices || prices.length === 0) return { average: 0, min: 0, max: 0 }
    const sum = prices.reduce((acc, p) => acc + p, 0)
    return {
        average: sum / prices.length,
        min: Math.min(...prices),
        max: Math.max(...prices)
    }
}
