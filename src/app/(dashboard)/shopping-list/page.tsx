import { ShoppingListManager } from "@/components/shopping/shopping-list-manager"

export default function ShoppingListPage() {
    return (
        <div className="container py-8 h-[calc(100vh-4rem)]">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Shopping List</h1>
            <ShoppingListManager />
        </div>
    )
}
