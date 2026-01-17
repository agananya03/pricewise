
"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Plus, Trash, Save, Loader2, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { ParsedReceipt } from "@/services/receipt/receipt-parser"
import { toast } from "sonner"

const itemSchema = z.object({
    name: z.string().min(1, "Name required"),
    price: z.coerce.number().min(0, "Price must be positive"),
    quantity: z.coerce.number().min(1).default(1),
})

const formSchema = z.object({
    store: z.string().min(1, "Store name required"),
    date: z.string().optional(),
    total: z.coerce.number().min(0).optional(),
    items: z.array(itemSchema),
})

type FormValues = z.infer<typeof formSchema>

interface ReceiptReviewFormProps {
    initialData: ParsedReceipt
    onSave: (data: FormValues) => Promise<void>
    onCancel: () => void
}

export function ReceiptReviewForm({ initialData, onSave, onCancel }: ReceiptReviewFormProps) {
    const [isSaving, setIsSaving] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            store: initialData.store || "",
            date: initialData.date || new Date().toISOString().split('T')[0],
            total: initialData.total || 0,
            items: initialData.items.length > 0 ? initialData.items : [{ name: "", price: 0, quantity: 1 }],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    })

    const onSubmit = async (data: FormValues) => {
        setIsSaving(true)
        try {
            await onSave(data)
            toast.success("Receipt saved successfully!")
        } catch (error) {
            console.error(error)
            toast.error("Failed to save receipt.")
        } finally {
            setIsSaving(false)
        }
    }

    const calculateTotal = () => {
        const items = form.watch("items")
        const calculated = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0)
        return calculated.toFixed(2)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Review Receipt Details</span>
                            <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="store"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Store Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Walmart, Target..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Items</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 items-start">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input placeholder="Item Name" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.price`}
                                    render={({ field }) => (
                                        <FormItem className="w-24">
                                            <FormControl>
                                                <Input type="number" step="0.01" placeholder="0.00" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.quantity`}
                                    render={({ field }) => (
                                        <FormItem className="w-20">
                                            <FormControl>
                                                <Input type="number" min="1" placeholder="Qty" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                    <Trash className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => append({ name: "", price: 0, quantity: 1 })}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add Item
                        </Button>
                    </CardContent>
                    <CardFooter className="bg-muted/50 flex justify-between items-center py-4">
                        <div className="text-sm text-muted-foreground">
                            Calculated Total: <span className="font-semibold text-foreground">${calculateTotal()}</span>
                        </div>
                        <FormField
                            control={form.control}
                            name="total"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-2 space-y-0">
                                    <FormLabel className="whitespace-nowrap">Receipt Total:</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" className="w-32" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardFooter>
                </Card>

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isSaving}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSaving}>
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Receipt
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
