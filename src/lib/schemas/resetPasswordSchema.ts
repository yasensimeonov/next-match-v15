import {z} from "zod";

export const resetPasswordSchema = z.object({
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters'
    }),
    confirmPassword: z.string().min(6)
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do NOT match',
    path: ['confirmPassword']
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;