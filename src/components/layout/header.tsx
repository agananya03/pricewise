
"use client"

import { UserNav } from "@/components/layout/user-nav"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/layout/sidebar"

export function Header() {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle navigation</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0">
                        <Sidebar className="w-full" />
                    </SheetContent>
                </Sheet>

                <div className="ml-auto flex items-center space-x-4">
                    <UserNav />
                </div>
            </div>
        </div>
    )
}
