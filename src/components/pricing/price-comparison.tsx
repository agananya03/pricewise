import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingDown, TrendingUp, Minus } from "lucide-react"

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
        rating: 'good' | 'fair' | 'poor'
    }
}

export function PriceComparison({ comparison }: PriceComparisonProps) {
    const { currentPrice, stats, rating } = comparison

    // Calculate position percent for progress bar
    // min = 0%, max = 100%
    const range = stats.max - stats.min
    const percent = range === 0 ? 50 : ((currentPrice - stats.min) / range) * 100

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">Price Analysis</CardTitle>
                    {rating === 'good' && <Badge className="bg-green-500">Good Deal</Badge>}
                    {rating === 'fair' && <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-700">Fair Price</Badge>}
                    {rating === 'poor' && <Badge variant="destructive">Overpriced</Badge>}
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Current</span>
                        <span className="font-bold text-xl">${currentPrice.toFixed(2)}</span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>${stats.min.toFixed(2)} (Min)</span>
                            <span>${stats.max.toFixed(2)} (Max)</span>
                        </div>
                        <Progress value={percent} className="h-2" />
                        <div className="flex justify-center text-xs font-medium text-muted-foreground">
                            Market Average: ${stats.avg.toFixed(2)}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                        <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                            <span className="text-xs text-muted-foreground">vs Average</span>
                            {currentPrice < stats.avg ? (
                                <span className="text-sm font-semibold text-green-600 flex items-center">
                                    <TrendingDown className="w-3 h-3 mr-1" />
                                    {((1 - currentPrice / stats.avg) * 100).toFixed(0)}% Lower
                                </span>
                            ) : (
                                <span className="text-sm font-semibold text-red-600 flex items-center">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    {((currentPrice / stats.avg - 1) * 100).toFixed(0)}% Higher
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                            <span className="text-xs text-muted-foreground">Rating</span>
                            <span className="text-sm font-semibold capitalize">{rating}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
