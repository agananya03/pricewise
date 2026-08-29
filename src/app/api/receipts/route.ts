
import { NextRequest, NextResponse } from "next/server"
import { parse, isValid } from "date-fns"

export const dynamic = "force-dynamic"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function POST(req: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { store, date, total, items, imageBase64 } = body

        // Robust User ID retrieval
        let userId = session.user.id;
        if (!userId && session.user.email) {
            console.log("User ID missing from session, looking up by email:", session.user.email);
            const user = await prisma.user.findUnique({
                where: { email: session.user.email }
            });
            if (user) {
                userId = user.id;
                console.log("Found user ID from database:", userId);
            }
        }

        if (!userId) {
            console.error("Critical Error: Unable to determine User ID");
            return NextResponse.json({ error: "User ID not found" }, { status: 401 });
        }

        console.log("Saving receipt for userId:", userId);
        console.log("Data:", { store, date, total, itemsCount: items?.length });

        // Receipt Privacy (Option A): Avoid storing raw receipt images in cloud storage.
        // OCR text extraction occurs client-side; only structured receipt data is saved.
        let imageUrl: string | undefined = undefined;

        console.log("Creating prisma record...");
        let parsedDate = new Date();
        if (date) {
            try {
                // Try parsing DD/MM/YYYY
                const parsed = parse(date, 'dd/MM/yyyy', new Date());
                if (isValid(parsed)) {
                    parsedDate = parsed;
                } else {
                    const standard = new Date(date);
                    if (!isNaN(standard.getTime())) {
                        parsedDate = standard;
                    }
                }
            } catch (e) {
                console.warn("Date parsing failed", e);
            }
        }

        // Use transaction to ensure both receipt is created and user stats are updated
        const [receipt, updatedUser] = await prisma.$transaction([
            prisma.receipt.create({
                data: {
                    userId: userId,
                    store,
                    date: parsedDate,
                    total: total || 0,
                    imageUrl,
                    items: {
                        create: items.map((item: any) => ({
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity
                        }))
                    }
                },
                include: {
                    items: true
                }
            }),
            prisma.user.update({
                where: { id: userId },
                data: {
                    totalSaved: { increment: total || 0 },
                    scanCount: { increment: 1 }
                }
            })
        ]);
        console.log("Receipt saved successfully:", receipt.id);
        console.log("User stats updated. New totalSaved:", updatedUser.totalSaved, "New scanCount:", updatedUser.scanCount);

        return NextResponse.json(receipt)
    } catch (error) {
        console.error("Error saving receipt FULL ERROR:", error)
        // Extract inner prisma error if exists
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
        return NextResponse.json({ error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) }, { status: 500 })
    }
}
