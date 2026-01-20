"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Trophy, Medal, Award } from "lucide-react"

interface User {
    id: string
    name: string
    image: string
    totalSaved: number
}

export function LeaderboardCard({ users }: { users: User[] }) {
    const getRankIcon = (index: number) => {
        if (index === 0) return <Trophy className="h-5 w-5 text-black" />
        if (index === 1) return <Medal className="h-5 w-5 text-black/60" />
        if (index === 2) return <Award className="h-5 w-5 text-black/40" />
        return <span className="text-black font-mono font-bold w-5 text-center">{index + 1}</span>
    }

    return (
        <Card className="h-full border-black rounded-none shadow-none">
            <CardHeader className="border-b border-black pb-4">
                <CardTitle className="uppercase tracking-tighter font-black text-2xl">Top Savers</CardTitle>
                <CardDescription className="uppercase text-xs tracking-widest font-bold text-black/60">Global Ledger</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
                {users.map((user, index) => (
                    <div key={user.id} className="flex items-center gap-4 group hover:bg-black/5 p-2 transition-colors">
                        <div className="w-8 flex justify-center">
                            {getRankIcon(index)}
                        </div>
                        <Avatar className="h-10 w-10 rounded-none border-2 border-black">
                            <AvatarImage src={user.image} className="rounded-none" />
                            <AvatarFallback className="rounded-none bg-black text-white font-bold">{user.name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold uppercase tracking-tight text-black">{user.name || "Anonymous"}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-mono font-bold text-black border-b-2 border-black/10 pb-0.5">${user.totalSaved.toFixed(0)}</p>
                        </div>
                    </div>
                ))}
                {users.length === 0 && <p className="text-center text-black/40 uppercase text-xs font-bold pt-4">No data yet.</p>}
            </CardContent>
        </Card>
    )
}
