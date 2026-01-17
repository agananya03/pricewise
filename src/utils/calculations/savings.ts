export const calculateSavings = (originalPrice: number, currentPrice: number) => {
    if (originalPrice <= currentPrice) return 0
    return originalPrice - currentPrice
}
