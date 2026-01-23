"use client"

import { Medal, ShoppingBag, Zap, Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const ALL_ACHIEVEMENTS = [
    { id: "FIRST_SCAN", name: "First Scan", description: "Scanned your first product", icon: Zap },
    { id: "SAVER_100", name: "Century Saver", description: "Saved over ₹10,000", icon: Trophy },
    { id: "DEAL_HUNTER", name: "Deal Hunter", description: "Found a 50% off deal", icon: ShoppingBag },
    { id: "REFERRAL_MASTER", name: "Community Builder", description: "Referred 5 friends", icon: Medal },
]

export function AchievementsList({ unlocked }: { unlocked: string[] }) {

    return (
        <Card className="border-black rounded-none shadow-none">
            <CardHeader className="border-b border-black pb-4">
                <CardTitle className="uppercase tracking-tighter font-black text-2xl">Achievements</CardTitle>
                <CardDescription className="uppercase text-xs tracking-widest font-bold text-black/60">Badges & Protocol Status</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {ALL_ACHIEVEMENTS.map(ach => {
                        const isUnlocked = unlocked.includes(ach.id)
                        const Icon = ach.icon

                        return (
                            <div
                                key={ach.id}
                                className={`flex flex-col items-center p-4 border transition-all rounded-none group ${isUnlocked
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white border-black text-black'
                                    }`}
                            >
                                <div className={`p-3 mb-3 border-2 ${isUnlocked ? 'bg-white text-black border-white' : 'bg-transparent border-black'}`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-sm uppercase tracking-tight">{ach.name}</h3>
                                <p className={`text-xs mt-1 text-center font-mono ${isUnlocked ? 'text-white/80' : 'text-black/80'}`}>{ach.description}</p>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
