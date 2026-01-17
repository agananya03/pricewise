import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { ReceiptHistoryList } from "@/components/receipt/receipt-history-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function ReceiptHistoryPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    const receipts = await prisma.receipt.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            items: true
        },
        orderBy: {
            date: 'desc'
        }
    })

    return (
        <div className="container py-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Receipt History</h1>
                    <p className="text-muted-foreground">View and manage your past receipts.</p>
                </div>
                <Button asChild>
                    <Link href="/receipt">
                        <Plus className="mr-2 h-4 w-4" />
                        Scan New
                    </Link>
                </Button>
            </div>

            <ReceiptHistoryList receipts={receipts} />
        </div>
    )
}
