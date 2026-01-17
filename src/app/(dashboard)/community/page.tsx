"use client"

import { useEffect, useState } from "react"
import { AchievementsList } from "@/components/gamification/achievements-list"
import { LeaderboardCard } from "@/components/gamification/leaderboard-card"
import { ReferralCard } from "@/components/social/referral-card"

export default function CommunityPage() {
    const [leaderboard, setLeaderboard] = useState([])
    const [achievements, setAchievements] = useState<string[]>([])

    useEffect(() => {
        // Fetch leaderboard
        fetch('/api/gamification/leaderboard')
            .then(res => res.json())
            .then(data => setLeaderboard(data))
            .catch(console.error)

        // Fetch user achievements
        fetch('/api/gamification/achievements')
            .then(res => res.json())
            .then(data => setAchievements(data.map((a: any) => a.type)))
            .catch(console.error)
    }, [])

    return (
        <div className="container py-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Community & Rewards</h1>
                <p className="text-muted-foreground">Competitions, achievements, and friends.</p>
            </div>

            <AchievementsList unlocked={achievements} />

            <div className="grid gap-6 md:grid-cols-2">
                <LeaderboardCard users={leaderboard} />
                <ReferralCard />
            </div>
        </div>
    )
}
