"use client"

import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { toast } from "sonner"

interface ExportProps {
    data: any // Keeping loose for flexibility in demo
}

export function ExportControls({ data }: ExportProps) {

    const handleDownloadCSV = () => {
        try {
            // Flatten data for CSV
            const rows = [
                ['Date', 'Store', 'Amount', 'Category'],
                ...data.recentActivity.map((r: any) => [
                    r.date,
                    r.store,
                    r.amount.toFixed(2),
                    'General' // Placeholder
                ])
            ]

            const csvContent = "data:text/csv;charset=utf-8,"
                + rows.map(e => e.join(",")).join("\n")

            const encodedUri = encodeURI(csvContent)
            const link = document.createElement("a")
            link.setAttribute("href", encodedUri)
            link.setAttribute("download", "spending_report.csv")
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            toast.success("CSV Report downloaded")
        } catch (e) {
            console.error(e)
            toast.error("Failed to generate CSV")
        }
    }

    const handleDownloadPDF = () => {
        try {
            const doc = new jsPDF()

            doc.setFontSize(20)
            doc.text("Pricewise - Financial Report", 14, 22)

            doc.setFontSize(11)
            doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30)

            doc.text(`Total Spent: $${data.summary.totalSpent.toFixed(2)}`, 14, 40)
            doc.text(`Total Saved: $${data.summary.totalSaved.toFixed(2)}`, 14, 46)

            autoTable(doc, {
                startY: 55,
                head: [['Date', 'Store', 'Amount']],
                body: data.recentActivity.map((r: any) => [
                    r.date,
                    r.store,
                    `$${r.amount.toFixed(2)}`
                ]),
                theme: 'grid',
                headStyles: { fillColor: [34, 197, 94] } // Green
            })

            doc.save("financial_report.pdf")
            toast.success("PDF Report downloaded")
        } catch (e) {
            console.error(e)
            toast.error("Failed to generate PDF")
        }
    }

    return (
        <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownloadCSV}>
                <FileText className="w-4 h-4 mr-2" />
                Export CSV
            </Button>
            <Button size="sm" onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
            </Button>
        </div>
    )
}
