
import { Header } from "@/components/layout/header"


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen overflow-hidden">

            <div className="flex flex-1 flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto w-full">
                    <div className="max-w-7xl mx-auto p-4">
                        {children}
                    </div>
                </main>
            </div>
        </div >
    )
}
