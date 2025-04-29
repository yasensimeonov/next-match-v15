import NextAuth, { NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { prisma } from "@/lib/prisma";

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
    callbacks: {
        async session({session, token}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            return session;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    ...authConfig,
} as NextAuthConfig)
