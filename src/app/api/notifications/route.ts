import { NextResponse } from 'next/server'

export const dynamic = "force-dynamic"

export async function GET() {
    return NextResponse.json({ message: "Get notifications" })
}

export async function POST() {
    return NextResponse.json({ message: "Send notification" })
}
