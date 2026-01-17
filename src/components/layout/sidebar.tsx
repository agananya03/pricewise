
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Barcode, FileText, Home, Settings, ShoppingCart, Map as MapIcon, PieChart, CheckSquare } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()

    const routes = [
        {
            href: "/dashboard",
            label: "Dashboard",
            icon: Home,
        },
        {
            href: "/prices/compare",
            label: "Price Compare",
            icon: ShoppingCart,
        },
        {
            href: "/scan",
            label: "Scan", // Changed label from "Scan Barcode" to "Scan"
            icon: Barcode, // Kept Barcode as ScanBarcode is not imported
            color: "text-orange-500", // Added color property
        },
        {
            href: "/receipt",
            label: "Receipts",
            icon: FileText,
            color: "text-green-500",
        },
        {
            href: "/stores",
            label: "Store Locator",
            icon: MapIcon,
            color: "text-blue-500",
        },
        {
            href: "/analytics",
            label: "Analytics",
            icon: PieChart,
            color: "text-purple-500",
        },
        {
            href: "/shopping-list",
            label: "Shopping List",
            icon: CheckSquare,
            color: "text-green-500",
        },

        {
            href: "/settings",
            label: "Settings",
            icon: Settings,
        },
    ]

    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Pricewise
                    </h2>
                    <div className="space-y-1">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={pathname === route.href ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                asChild
                            >
                                <Link href={route.href}>
                                    <route.icon className="mr-2 h-4 w-4" />
                                    {route.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
