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
        <div className="container py-12 space-y-12 max-w-7xl mx-auto">
            <div className="border-l-4 border-black pl-6 py-2">
                <h1 className="text-6xl font-black tracking-tighter uppercase mb-4 sm:text-black">
                    Explore Communities
                </h1>
                <p className="text-xl font-medium tracking-tight text-black/60 max-w-2xl uppercase">
                    Engage with the network. Competitions / Achievements / Nodes.
                </p>
            </div>

            <AchievementsList unlocked={achievements} />

            <div className="grid gap-12 lg:grid-cols-2">
                <LeaderboardCard users={leaderboard} />
                <ReferralCard />
            </div>
        </div>
    )
}
