
"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { IndianRupee, Store } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const formSchema = z.object({
    price: z.coerce.number().min(0.01, "Price must be greater than 0"),
    store: z.string().min(1, "Store name is required"),
})

// Derive the type from the schema for type-safety
type FormValues = z.infer<typeof formSchema>

interface PriceSubmissionFormProps {
    barcode: string
    productData: {
        name: string
        category?: string
        imageUrl?: string
    }
    onSuccess?: () => void
}

export function PriceSubmissionForm({ barcode, productData, onSuccess }: PriceSubmissionFormProps) {
    const [isLoading, setIsLoading] = useState(false)

    // Use the derived type for useForm generics
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            price: 0,
            store: "",
        },
    })

    async function onSubmit(values: FormValues) {
        setIsLoading(true)
        try {
            const response = await fetch("/api/prices", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    barcode,
                    price: values.price,
                    store: values.store,
                    productData,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to submit price")
            }

            toast.success("Price submitted", {
                description: "Thank you for your contribution!",
            })

            form.reset()
            if (onSuccess) onSuccess()
        } catch (error) {
            toast.error("Error", {
                description: "Something went wrong. Please try again.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <IndianRupee className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input type="number" step="0.01" className="pl-8" placeholder="0.00" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="store"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Store</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Store className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input className="pl-8" placeholder="e.g. Walmart, Target" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Price"}
                </Button>
            </form>
        </Form>
    )
}
