import { NextResponse } from 'next/server'

export const dynamic = "force-dynamic"

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    return NextResponse.json({ message: `Get store ${params.id}` })
}
