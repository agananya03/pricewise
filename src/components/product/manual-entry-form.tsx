
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    barcode: z.string().min(3, {
        message: "Barcode must be at least 3 characters.",
    }),
})

export function ManualEntryForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            barcode: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        router.push(`/product/${values.barcode}`)
        setIsLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="barcode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Manual Entry</FormLabel>
                            <FormControl>
                                <div className="flex gap-2">
                                    <Input placeholder="Enter barcode number..." {...field} />
                                    <Button type="submit" disabled={isLoading}>
                                        <Search className="mr-2 h-4 w-4" />
                                        Lookup
                                    </Button>
                                </div>
                            </FormControl>
                            <FormDescription>
                                Type the barcode number if scanning fails.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
