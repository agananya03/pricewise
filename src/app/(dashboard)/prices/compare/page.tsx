import { PriceComparison } from "@/components/pricing/price-comparison"
import { prisma } from "@/lib/prisma"
import { PriceComparator } from "@/services/pricing/comparator"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, ShoppingBag } from "lucide-react"

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PriceComparePage({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams
    const productId = typeof resolvedSearchParams.productId === 'string' ? resolvedSearchParams.productId : undefined
    const comparator = new PriceComparator()

    // Fetch products that have prices
    const products = await prisma.product.findMany({
        where: {
            prices: {
                some: {} // Only get products that have at least one price
            }
        },
        include: {
            _count: {
                select: { prices: true }
            },
            prices: {
                orderBy: { createdAt: 'desc' },
                take: 1
            }
        },
        orderBy: {
            updatedAt: 'desc'
        },
        take: 10
    })

    let comparisonData = null
    let selectedProduct = null

    if (productId) {
        selectedProduct = products.find(p => p.id === productId) || await prisma.product.findUnique({
            where: { id: productId },
            include: {
                _count: { select: { prices: true } },
                prices: { orderBy: { createdAt: 'desc' }, take: 1 }
            }
        })

        if (selectedProduct && selectedProduct.prices.length > 0) {
            // Compare the most recent price against historical data
            const currentPrice = selectedProduct.prices[0].amount
            comparisonData = await comparator.comparePrice(
                selectedProduct.id,
                currentPrice
            )
        }
    }

    return (
        <div className="container py-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Price Comparison</h1>
                <p className="text-muted-foreground">Select a product to see how its price compares to the market average.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-12">
                {/* Product List Sidebar */}
                <div className="md:col-span-4 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Recent Products</CardTitle>
                            <CardDescription>Products with identified prices</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            {products.length === 0 ? (
                                <p className="text-sm text-muted-foreground py-4 text-center">
                                    No price data found. Scan some items first!
                                </p>
                            ) : (
                                products.map((product) => (
                                    <Button
                                        key={product.id}
                                        variant={productId === product.id ? "secondary" : "ghost"}
                                        className="w-full justify-start h-auto py-3 px-4"
                                        asChild
                                    >
                                        <Link href={`/prices/compare?productId=${product.id}`}>
                                            <div className="flex flex-col items-start gap-1 w-full overflow-hidden">
                                                <div className="font-semibold truncate w-full">{product.name}</div>
                                                <div className="text-xs text-muted-foreground flex items-center gap-2">
                                                    <ShoppingBag className="w-3 h-3" />
                                                    {product._count.prices} prices found
                                                </div>
                                            </div>
                                            {productId === product.id && <ArrowRight className="ml-auto w-4 h-4 opacity-50" />}
                                        </Link>
                                    </Button>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Comparison View */}
                <div className="md:col-span-8">
                    {comparisonData && selectedProduct ? (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                                <p className="text-muted-foreground text-sm">Category: {selectedProduct.category}</p>
                            </div>

                            <PriceComparison comparison={comparisonData} />

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Price Tips</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                        <li>Historical lowest price was <strong>${comparisonData.stats.min.toFixed(2)}</strong>.</li>
                                        <li>Average market price is <strong>${comparisonData.stats.avg.toFixed(2)}</strong>.</li>
                                        {comparisonData.rating === 'good' && (
                                            <li className="text-green-600 font-medium">This is currently a great time to buy!</li>
                                        )}
                                        {comparisonData.rating === 'poor' && (
                                            <li className="text-red-500 font-medium">Consider waiting for a better deal or checking other stores.</li>
                                        )}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <Card className="h-full flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-muted/20 border-dashed">
                            <div className="p-4 bg-background rounded-full mb-4">
                                <ShoppingBag className="w-8 h-8 text-muted-foreground/50" />
                            </div>
                            <h3 className="text-lg font-semibold">No Product Selected</h3>
                            <p className="text-muted-foreground max-w-sm mt-2">
                                Select a product from the list on the left to analyze its price based on your collected data.
                            </p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
