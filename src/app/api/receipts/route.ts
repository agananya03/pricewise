
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { uploadToStorage } from "@/lib/supabase-admin"

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

        let imageUrl: string | undefined;
        if (imageBase64) {
            try {
                console.log("Attempting to upload image to Supabase...");
                // Extract content type and buffer
                const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

                if (matches && matches.length === 3) {
                    const contentType = matches[1];
                    const buffer = Buffer.from(matches[2], 'base64');
                    const fileName = `${userId}/${Date.now()}.${contentType.split('/')[1]}`;

                    // Upload to 'receipts' bucket
                    const publicUrl = await uploadToStorage(buffer, fileName, contentType);
                    if (publicUrl) {
                        imageUrl = publicUrl;
                        console.log("Image uploaded successfully:", imageUrl);
                    } else {
                        console.error("Image upload failed: No public URL returned");
                    }
                } else {
                    console.error("Invalid base64 string format");
                }
            } catch (error) {
                console.error("Failed to upload image to Supabase:", error);
                // Continue saving receipt even if image upload fails
            }
        }

        console.log("Creating prisma record...");
        const receipt = await prisma.receipt.create({
            data: {
                userId: userId,
                store,
                date: date ? new Date(date) : new Date(),
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
        })
        console.log("Receipt saved successfully:", receipt.id);

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
