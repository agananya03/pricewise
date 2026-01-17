"use client"

import { PushManager } from "@/components/notifications/push-manager"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function SettingsPage() {
    const { setTheme } = useTheme()

    return (
        <div className="container py-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your preferences and alerts.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <PushManager />

                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>Customize the interface theme.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                        <Button variant="outline" onClick={() => setTheme("light")}>
                            <Sun className="mr-2 h-4 w-4" />
                            Light
                        </Button>
                        <Button variant="outline" onClick={() => setTheme("dark")}>
                            <Moon className="mr-2 h-4 w-4" />
                            Dark
                        </Button>
                        <Button variant="outline" onClick={() => setTheme("system")}>
                            System
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
