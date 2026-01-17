
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
    return (
        <div className="flex h-screen flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-bold">Pricewise</h1>
            <p className="text-lg text-muted-foreground">Compare prices and save big.</p>
            <div className="flex space-x-4">
                <Button asChild>
                    <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild variant="secondary">
                    <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
            </div>
        </div>
    )
}
