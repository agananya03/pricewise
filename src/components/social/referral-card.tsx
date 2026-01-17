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
        <Card>
            <CardHeader>
                <CardTitle>Invite Friends</CardTitle>
                <CardDescription>Earn badges for growing the community.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <Input readOnly value={`https://pricewise.app/join?code=${code}`} />
                    <Button variant="outline" size="icon" onClick={handleCopy}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <Button className="w-full" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Link
                </Button>
            </CardContent>
        </Card>
    )
}
