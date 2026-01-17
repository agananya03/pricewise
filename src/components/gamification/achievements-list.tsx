"use client"

import { Medal, ShoppingBag, Zap, Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const ALL_ACHIEVEMENTS = [
    { id: "FIRST_SCAN", name: "First Scan", description: "Scanned your first product", icon: Zap },
    { id: "SAVER_100", name: "Century Saver", description: "Saved over $100", icon: Trophy },
    { id: "DEAL_HUNTER", name: "Deal Hunter", description: "Found a 50% off deal", icon: ShoppingBag },
    { id: "REFERRAL_MASTER", name: "Community Builder", description: "Referred 5 friends", icon: Medal },
]

export function AchievementsList({ unlocked }: { unlocked: string[] }) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Badges you've earned</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {ALL_ACHIEVEMENTS.map(ach => {
                        const isUnlocked = unlocked.includes(ach.id)
                        const Icon = ach.icon

                        return (
                            <div
                                key={ach.id}
                                className={`flex flex-col items-center p-4 rounded-xl border text-center transition-all ${isUnlocked
                                        ? 'bg-yellow-50 border-yellow-200 text-yellow-900'
                                        : 'bg-gray-50 border-gray-100 text-gray-400 grayscale'
                                    }`}
                            >
                                <div className={`p-3 rounded-full mb-2 ${isUnlocked ? 'bg-yellow-100' : 'bg-gray-200'}`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-semibold text-sm">{ach.name}</h3>
                                <p className="text-xs mt-1 opacity-80">{ach.description}</p>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
