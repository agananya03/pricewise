import { LocationFilter } from "@/components/pricing/location-filter"
import { reverseGeocode } from "@/services/geolocation/geocoder"
import { PriceComparison } from "@/components/pricing/price-comparison"
import { CreateAlertDialog } from "@/components/pricing/create-alert-dialog"
import { prisma } from "@/lib/prisma"
import { PriceComparator } from "@/services/pricing/comparator"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, ShoppingBag, MapPin } from "lucide-react"

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PriceComparePage({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams
    const productId = typeof resolvedSearchParams.productId === 'string' ? resolvedSearchParams.productId : undefined
    const lat = typeof resolvedSearchParams.lat === 'string' ? parseFloat(resolvedSearchParams.lat) : undefined
    const lng = typeof resolvedSearchParams.lng === 'string' ? parseFloat(resolvedSearchParams.lng) : undefined
    const radius = typeof resolvedSearchParams.radius === 'string' ? parseFloat(resolvedSearchParams.radius) : 50

    const comparator = new PriceComparator()

    // Get location context if active
    let locationName = null
    if (lat && lng) {
        const geo = await reverseGeocode(lat, lng)
        if (geo) {
            locationName = `${geo.city || 'Unknown City'}, ${geo.state || ''}`
        }
    }

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
                currentPrice,
                lat,
                lng,
                radius
            )
        }
    }

    return (
        <div className="container py-8 space-y-8">
            <div className="border-b-4 border-foreground pb-4">
                <h1 className="text-5xl font-black tracking-tighter uppercase mb-1">Price Comparison</h1>
                <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Market Intelligence & Analysis</p>
            </div>

            <div className="grid gap-6 md:grid-cols-12">
                {/* Product List Sidebar */}
                <div className="md:col-span-4 space-y-4">
                    <LocationFilter />

                    <Card className="rounded-none border-foreground shadow-none">
                        <CardHeader className="border-b border-foreground pb-3">
                            <CardTitle className="text-lg uppercase font-black tracking-tight">Recent Products</CardTitle>
                            <CardDescription className="uppercase text-xs font-bold text-muted-foreground tracking-wider">Identified Inventory</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-0 p-0">
                            {products.length === 0 ? (
                                <p className="text-sm text-muted-foreground py-8 text-center font-mono uppercase">
                                    No data found.<br />Scan items to populate.
                                </p>
                            ) : (
                                products.map((product) => (
                                    <Button
                                        key={product.id}
                                        variant="ghost"
                                        className={`w-full justify-start h-auto py-4 px-4 rounded-none border-b last:border-0 border-foreground/10 hover:bg-foreground hover:text-background transition-all group ${productId === product.id ? "bg-foreground text-background" : ""}`}
                                        asChild
                                    >
                                        <Link href={`/prices/compare?productId=${product.id}`}>
                                            <div className="flex flex-col items-start gap-1 w-full overflow-hidden">
                                                <div className="font-bold uppercase tracking-tight truncate w-full">{product.name}</div>
                                                <div className={`text-[10px] font-mono uppercase flex items-center gap-2 ${productId === product.id ? "text-background/60" : "text-muted-foreground group-hover:text-background/60"}`}>
                                                    <ShoppingBag className="w-3 h-3" />
                                                    {product._count.prices} prices found
                                                </div>
                                            </div>
                                            {productId === product.id && <ArrowRight className="ml-auto w-4 h-4" />}
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
                            <div className="border-b-2 border-foreground pb-6">
                                <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">{selectedProduct.name}</h2>
                                <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Category // {selectedProduct.category}</p>
                                {locationName && (
                                    <p className="text-xs font-bold font-mono text-foreground mt-2 flex items-center uppercase">
                                        <MapPin className="w-3 h-3 mr-2" />
                                        Targeting: {locationName}
                                    </p>
                                )}
                            </div>


                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <PriceComparison comparison={comparisonData as any} />
                                </div>
                            </div>

                            <CreateAlertDialog
                                productId={selectedProduct.id}
                                currentPrice={comparisonData.currentPrice}
                            />


                            <Card className="rounded-none border-black shadow-none bg-black text-white">
                                <CardHeader className="border-b border-white/20">
                                    <CardTitle className="text-lg font-black uppercase tracking-tight">Analysis Protocol</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <ul className="list-none text-sm space-y-3 font-mono">
                                        <li className="flex justify-between border-b border-white/20 pb-2">
                                            <span className="opacity-70">HISTORICAL LOW</span>
                                            <span className="font-bold">${comparisonData.stats.min.toFixed(2)}</span>
                                        </li>
                                        <li className="flex justify-between border-b border-white/20 pb-2">
                                            <span className="opacity-70">MARKET MEDIAN</span>
                                            <span className="font-bold">${comparisonData.stats.avg.toFixed(2)}</span>
                                        </li>
                                        {comparisonData.badge === 'Great' && (
                                            <li className="text-white font-bold uppercase tracking-wider pt-2 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                                Optimum Purchase Timing
                                            </li>
                                        )}
                                        {comparisonData.badge === 'Warning' && (
                                            <li className="text-white/80 font-bold uppercase tracking-wider pt-2 flex items-center gap-2">
                                                <div className="w-2 h-2 border border-white rounded-full"></div>
                                                Delay Purchase / Seek Alternatives
                                            </li>
                                        )}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <Card className="h-full flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-white border-2 border-dashed border-black/20 rounded-none">
                            <div className="p-6 bg-black text-white rounded-none mb-6">
                                <ShoppingBag className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight">No Product Selected</h3>
                            <p className="text-black/60 font-medium uppercase tracking-wide text-xs max-w-sm mt-2">
                                Select inventory from the sidebar to analyze pricing metrics.
                            </p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
