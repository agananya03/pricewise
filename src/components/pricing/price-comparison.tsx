import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingDown, TrendingUp, Minus, AlertCircle } from "lucide-react"
import { PriceHistoryChart } from "./price-history-chart"

interface PriceComparisonProps {
    comparison: {
        currentPrice: number
        lowestPrice: number
        stats: {
            min: number
            max: number
            avg: number
            median: number
        }
        score: number
        badge: 'Great' | 'Good' | 'Fair' | 'High' | 'Warning'
        trend: 'rising' | 'falling' | 'stable'
        history: {
            date: string
            price: number
            store: string
        }[]
    }
}

export function PriceComparison({ comparison }: PriceComparisonProps) {
    const { currentPrice, stats, score, badge, trend, history } = comparison

    // Calculate position percent for progress bar
    const range = stats.max - stats.min
    const percent = range === 0 ? 50 : ((currentPrice - stats.min) / range) * 100

    const getBadgeColor = (badge: string) => {
        switch (badge) {
            case 'Great': return "bg-green-500 hover:bg-green-600"
            case 'Good': return "bg-emerald-500 hover:bg-emerald-600"
            case 'Fair': return "bg-yellow-500 hover:bg-yellow-600"
            case 'High': return "bg-orange-500 hover:bg-orange-600"
            case 'Warning': return "bg-red-500 hover:bg-red-600"
            default: return "bg-slate-500"
        }
    }

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-green-600"
        if (score >= 70) return "text-emerald-600"
        if (score >= 50) return "text-yellow-600"
        if (score >= 30) return "text-orange-600"
        return "text-red-600"
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-medium">Deal Score</CardTitle>
                            <Badge className={`${getBadgeColor(badge)} text-white`}>{badge}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-6">
                            <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
                                {score}
                            </div>
                            <span className="text-sm text-muted-foreground mt-2">out of 100</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm">
                            {trend === 'falling' && <TrendingDown className="text-green-500 w-4 h-4" />}
                            {trend === 'rising' && <TrendingUp className="text-red-500 w-4 h-4" />}
                            {trend === 'stable' && <Minus className="text-slate-500 w-4 h-4" />}
                            <span className="capitalize">{trend} Price Trend</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium">Market Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Current</p>
                                <p className="text-2xl font-bold">${currentPrice.toFixed(2)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Market Average</p>
                                <p className="text-2xl font-bold">${stats.avg.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>${stats.min.toFixed(2)} (Best)</span>
                                <span>${stats.max.toFixed(2)} (High)</span>
                            </div>
                            <Progress value={percent} className="h-2" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <PriceHistoryChart data={history} />
        </div>
    )
}
