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
        <div className="container py-12 space-y-12 max-w-5xl mx-auto">
            <div className="flex items-center justify-between border-b-4 border-black pb-4">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase mb-1">Receipt History</h1>
                    <p className="text-black/60 font-bold uppercase tracking-widest text-xs">Audit Log & Archives</p>
                </div>
                <Button asChild className="rounded-none bg-black text-white hover:bg-black/80 font-black uppercase tracking-widest px-6 h-12">
                    <Link href="/receipt">
                        <Plus className="mr-2 h-5 w-5" />
                        Scan New
                    </Link>
                </Button>
            </div>

            <ReceiptHistoryList receipts={receipts} />
        </div>
    )
}
