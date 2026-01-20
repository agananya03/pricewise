"use client"

import { Copy, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export function ReferralCard({ code = "SAVE2024" }: { code?: string }) {

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Join Pricewise',
                    text: 'Join me on Pricewise and save money on your groceries! Use my code:',
                    url: `https://pricewise.app/join?code=${code}`,
                })
            } catch (err) {
                console.error(err)
            }
        } else {
            handleCopy()
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(`https://pricewise.app/join?code=${code}`)
        toast.success("Link copied to clipboard!")
    }

    return (
        <Card className="border-black rounded-none shadow-none">
            <CardHeader className="border-b border-black pb-4">
                <CardTitle className="uppercase tracking-tighter font-black text-2xl">Invite Friends</CardTitle>
                <CardDescription className="uppercase text-xs tracking-widest font-bold text-black/60">Expand the Network</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
                <div className="flex gap-2">
                    <Input readOnly value={`https://pricewise.app/join?code=${code}`} className="rounded-none border-black focus-visible:ring-0 font-mono text-xs bg-black/5" />
                    <Button variant="outline" size="icon" onClick={handleCopy} className="rounded-none border-black hover:bg-black hover:text-white transition-colors">
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <Button className="w-full rounded-none bg-black text-white hover:bg-black/80 font-bold uppercase tracking-widest" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Link
                </Button>
            </CardContent>
        </Card>
    )
}
