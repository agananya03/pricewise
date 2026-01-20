
import { Hero } from "@/components/landing/hero"


import { FeatureGrid } from "@/components/landing/feature-grid"

import { AnalyticsPreview } from "@/components/landing/analytics-preview"
import { LivePriceIntelligence } from "@/components/landing/live-price-intelligence"


import { HeatmapSection } from "@/components/landing/heatmap-section"


import { Footer } from "@/components/landing/footer"

// Keep existing basic sections if needed, but we have better ones now.
import { HowItWorks, FinalCTA } from "@/components/landing/section-components"


export default function Home() {
    return (
        <main className="min-h-screen bg-background relative selection:bg-purple-100 selection:text-purple-900">

            <Hero />

            <FeatureGrid />

            <AnalyticsPreview />
            <LivePriceIntelligence />


            <HeatmapSection />


            <HowItWorks />
            <FinalCTA />
            <Footer />
        </main>
    )
}
