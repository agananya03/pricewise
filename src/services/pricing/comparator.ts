import { prisma } from '@/lib/prisma';

export class PriceComparator {
    private getPriceStatistics(prices: number[]) {
        if (prices.length === 0) return { min: 0, max: 0, avg: 0, median: 0 };

        // 1. Sort prices
        let sorted = [...prices].sort((a, b) => a - b);

        // 2. Outlier Detection (IQR Method) - Only apply if we have enough data points (e.g. > 4)
        if (sorted.length > 4) {
            const q1 = sorted[Math.floor(sorted.length * 0.25)];
            const q3 = sorted[Math.ceil(sorted.length * 0.75) - 1]; // Adjust index
            const iqr = q3 - q1;
            const lowerBound = q1 - 1.5 * iqr;
            const upperBound = q3 + 1.5 * iqr;

            // Filter out extreme values
            const filtered = sorted.filter(p => p >= lowerBound && p <= upperBound);
            if (filtered.length > 0) {
                sorted = filtered;
            }
        }

        const min = sorted[0];
        const max = sorted[sorted.length - 1];
        const sum = sorted.reduce((a, b) => a + b, 0);
        const avg = sum / sorted.length;

        const mid = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 !== 0
            ? sorted[mid]
            : (sorted[mid - 1] + sorted[mid]) / 2;

        return { min, max, avg, median };
    }

    async comparePrice(
        productId: string,
        currentPrice: number,
        latitude?: number,
        longitude?: number,
        radius: number = 10
    ) {
        // 1. Get other prices for this product
        const others = await prisma.price.findMany({
            where: {
                productId,
                createdAt: {
                    gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) // Last 90 days only
                }
                // TODO: Filter by location/radius if coordinates provided
            },
            include: {
                store: true,
            },
            orderBy: {
                amount: 'asc',
            },
            take: 20, // Increased sample size for better stats
        });

        // Extract raw price amounts including the current one for fair market analysis
        const allPrices = [...others.map(p => p.amount), currentPrice];
        const stats = this.getPriceStatistics(allPrices);

        const lowest = others[0]?.amount || currentPrice;
        const difference = currentPrice - lowest;
        const savings = Math.max(0, difference);

    private getTrend(prices: { amount: number, createdAt: Date }[]) {
        if (prices.length < 2) return 'stable';

        // Simple linear regression or start/end comparison
        // Let's do a simple comparison of the average of the first half vs second half of the time window
        const sortedByDate = [...prices].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        const mid = Math.floor(sortedByDate.length / 2);

        const firstHalf = sortedByDate.slice(0, mid);
        const secondHalf = sortedByDate.slice(mid);

        const avgFirst = firstHalf.reduce((a, b) => a + b.amount, 0) / firstHalf.length;
        const avgSecond = secondHalf.reduce((a, b) => a + b.amount, 0) / secondHalf.length;

        const percentChange = (avgSecond - avgFirst) / avgFirst;

        if (percentChange > 0.05) return 'rising';
        if (percentChange < -0.05) return 'falling';
        return 'stable';
    }

    private getDealScore(currentPrice: number, stats: { min: number, max: number, avg: number }) {
        if (currentPrice <= stats.min) return 100; // Best deal possible
        if (currentPrice >= stats.max) return 0;   // Worst deal possible

        // Linear interpolation between min (100) and max (0)
        // This is a simplified model. We could use standard deviation for Z-score.
        const range = stats.max - stats.min;
        if (range === 0) return 50;

        const score = 100 - ((currentPrice - stats.min) / range) * 100;
        return Math.round(score);
    }

    private getBadge(score: number): 'Great' | 'Good' | 'Fair' | 'High' | 'Warning' {
        if (score >= 90) return 'Great';
        if (score >= 70) return 'Good';
        if (score >= 40) return 'Fair';
        if (score >= 20) return 'High';
        return 'Warning';
    }

    async comparePrice(
        productId: string,
        currentPrice: number,
        latitude?: number,
        longitude?: number,
        radius: number = 10
    ) {
        // 1. Get other prices for this product
        const others = await prisma.price.findMany({
            where: {
                productId,
                createdAt: {
                    gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) // Last 90 days only
                }
                // TODO: Filter by location/radius if coordinates provided
            },
            include: {
                store: true,
            },
            orderBy: {
                amount: 'asc',
            },
            take: 50, // Increase limit for better trends
        });

        // Extract raw price amounts including the current one for fair market analysis
        const allPrices = [...others.map(p => p.amount), currentPrice];
        const stats = this.getPriceStatistics(allPrices);

        const lowest = others[0]?.amount || currentPrice;
        const difference = currentPrice - lowest;
        const savings = Math.max(0, difference);

        // Advanced Analytics
        const score = this.getDealScore(currentPrice, stats);
        const badge = this.getBadge(score);
        const trend = this.getTrend([...others, { amount: currentPrice, createdAt: new Date() }]);

        // History for charts
        const history = [...others, { amount: currentPrice, createdAt: new Date(), store: { name: 'Current' } }]
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
            .map(p => ({
                date: p.createdAt.toISOString().split('T')[0],
                price: p.amount,
                store: p.store?.name || 'Unknown'
            }));

        return {
            currentPrice,
            lowestPrice: lowest,
            difference,
            savings,
            cheaperOptions: others.filter((p: typeof others[number]) => p.amount < currentPrice),
            isBestPrice: currentPrice <= lowest,
            stats,
            score,
            badge,
            trend,
            history
        };
    }
}
