'use server';

import {combinedRegisterSchema, RegisterSchema} from "@/lib/schemas/registerSchema";
import bcrypt from "bcryptjs";
import {prisma} from "@/lib/prisma";
import {TokenType, User} from "@prisma/client";
import {LoginSchema} from "@/lib/schemas/loginSchema";
import {auth, signIn, signOut} from "@/auth";
import {AuthError} from "next-auth";
import {ActionResult} from "@/types";
import {generateToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/mail";

export async function signInUser(data: LoginSchema): Promise<ActionResult<string>> {
    try {
        const existingUser = await getUserByEmail(data.email);

        if (!existingUser) {
            return {status: 'error', error: 'Invalid credentials'};
        }

        if (!existingUser.emailVerified) {
            const token = await generateToken(existingUser.email, TokenType.VERIFICATION);

            // Send user email
            await sendVerificationEmail(token.email, token.token);

            return {status: 'error', error: 'Please verify your email address before logging in'}
        }

        const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        });
        console.log(result);

        return {status: "success", data: "Logged in"};
    } catch (error) {
        console.log(error);

        if (error instanceof AuthError) {
            switch (error.name) {
                case "CredentialsSignin":
                    return {status: 'error', error: 'Invalid Credentials'};

                default:
                    return {status: 'error', error: 'Something went wrong'};
            }
        } else {
            return {status: 'error', error: 'Something else went wrong'};
        }
    }
}

export async function signOutUser() {
    await signOut({redirectTo: '/'});
}

export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
    try {
        // const validated = registerSchema.safeParse(data);
        const validated = combinedRegisterSchema.safeParse(data);

        if (!validated.success) {
            return {status: 'error', error: validated.error.errors};
        }

        const {name, email, password, gender, description, dateOfBirth, city, country} = validated.data;

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({
            where: {email}
        });

        if (existingUser) return {status: 'error', error: 'User already exists'};

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
                profileComplete: true,
                member: {
                    create: {
                        name,
                        gender,
                        description,
                        city,
                        country,
                        dateOfBirth: new Date(dateOfBirth)
                    }
                }
            }
        });

        const verificationToken = await generateToken(email, TokenType.VERIFICATION);

        // Email them with the Verification Token
        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return {status: 'success', data: user};
    } catch (error) {
        console.log(error);

        return {status: 'error', error: 'Something went wrong'};
    }
}

export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({where: {email}});
}

export async function getUserById(id: string) {
    return prisma.user.findUnique({where: {id}});
}

export async function getAuthUserId() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) throw new Error('Unauthorized');

    return userId;
}
