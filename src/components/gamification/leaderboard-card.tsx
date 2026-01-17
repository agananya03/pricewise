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
        if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />
        if (index === 1) return <Medal className="h-5 w-5 text-gray-400" />
        if (index === 2) return <Award className="h-5 w-5 text-amber-600" />
        return <span className="text-muted-foreground font-medium w-5 text-center">{index + 1}</span>
    }

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Top Savers</CardTitle>
                <CardDescription>This month's leaders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {users.map((user, index) => (
                    <div key={user.id} className="flex items-center gap-3">
                        <div className="w-8 flex justify-center">
                            {getRankIcon(index)}
                        </div>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.image} />
                            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user.name || "Anonymous"}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-green-600">${user.totalSaved.toFixed(0)}</p>
                        </div>
                    </div>
                ))}
                {users.length === 0 && <p className="text-center text-muted-foreground">No data yet.</p>}
            </CardContent>
        </Card>
    )
}
