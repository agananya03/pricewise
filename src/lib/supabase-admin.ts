import { createClient } from '@supabase/supabase-js'

// Note: This requires the SERVICE_ROLE_KEY to bypass RLS for server-side uploads
// or you can use the ANON_KEY if RLS policies allow authenticated uploads.
// For security on the server-side, a service role key is often used for admin tasks.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

export async function uploadToStorage(
    file: Buffer,
    fileName: string,
    contentType: string,
    bucket: string = 'reciepts'
): Promise<string | null> {
    try {
        const { error } = await supabaseAdmin
            .storage
            .from(bucket)
            .upload(fileName, file, {
                contentType,
                upsert: true
            })

        if (error) {
            console.error('Supabase storage upload error:', error)
            return null
        }

        // Get public URL
        const { data: { publicUrl } } = supabaseAdmin
            .storage
            .from(bucket)
            .getPublicUrl(fileName)

        return publicUrl
    } catch (error) {
        console.error('Unexpected error uploading to Supabase:', error)
        return null
    }
}
