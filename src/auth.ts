import NextAuth, { NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { prisma } from "@/lib/prisma";

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token.profileComplete = user.profileComplete
            }

            return token;
        },
        async session({session, token}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.profileComplete = token.profileComplete as boolean;
            }

            return session;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    ...authConfig,
} as NextAuthConfig)
