import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    return NextResponse.json({ message: "Get notifications" })
}

export async function POST(request: Request) {
    return NextResponse.json({ message: "Send notification" })
}
