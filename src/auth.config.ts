import Credentials from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";

import type { NextAuthConfig } from "next-auth"
import {loginSchema} from "@/lib/schemas/loginSchema";
import {getUserByEmail} from "@/app/actions/authActions";
import {compare} from "bcryptjs";


export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Credentials({
        name: 'credentials',
        async authorize(creds) {
            const validated = loginSchema.safeParse(creds);

            if (validated.success) {
                const {email, password} = validated.data;

                const user = await getUserByEmail(email);

                if (!user || !user.passwordHash || !(await compare(password, user.passwordHash!))) {
                    return null;
                }

                return user;
            }

            return null;
        }
    })
    ],
} satisfies NextAuthConfig
