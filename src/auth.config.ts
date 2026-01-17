
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

export default {
    providers: [Google],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith("/") && nextUrl.pathname !== "/" && !nextUrl.pathname.startsWith("/api") && !nextUrl.pathname.startsWith("/login")

            if (isOnDashboard) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                // Redirect logged-in users away from login page
                if (nextUrl.pathname === "/login") {
                    return Response.redirect(new URL("/dashboard", nextUrl))
                }
            }
            return true
        },
    },
} satisfies NextAuthConfig
