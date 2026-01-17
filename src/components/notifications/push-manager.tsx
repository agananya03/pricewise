"use client"

import { useState, useEffect } from "react"
import { Bell, BellOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"

export function PushManager() {
    const [permission, setPermission] = useState<NotificationPermission>('default')

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission)
        }
    }, [])

    const enableNotifications = async () => {
        if (!('Notification' in window)) {
            toast.error("This browser does not support notifications")
            return
        }

        try {
            const result = await Notification.requestPermission()
            setPermission(result)

            if (result === 'granted') {
                toast.success("Push notifications enabled!")
                // native notification test
                new Notification("Pricewise", { body: "Tests are working! You'll be alerted of price drops." })
            } else {
                toast.error("Permission denied")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Push Notifications
                </CardTitle>
                <CardDescription>
                    Get instant alerts when prices drop.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium">Status</p>
                        <p className="text-sm text-muted-foreground">
                            {permission === 'granted' ? 'Active' : permission === 'denied' ? 'Blocked' : 'Not Enabled'}
                        </p>
                    </div>

                    {permission === 'granted' ? (
                        <Button variant="outline" disabled className="text-green-600 border-green-200 bg-green-50">
                            <Bell className="mr-2 h-4 w-4" />
                            Enabled
                        </Button>
                    ) : (
                        <Button onClick={enableNotifications}>
                            Enable Alerts
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
