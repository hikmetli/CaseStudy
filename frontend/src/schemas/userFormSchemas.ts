import { z } from "zod"

const passwordValidation = new RegExp(
    /(?=^.{6,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
)


// SignIn
export const SignInSchema = z.object({
    email: z.string({ required_error: "username is required" }).min(2).max(50),
    password: z.string({ required_error: "password is required" }),
})
export type SignInSchema = z.infer<typeof SignInSchema>;


// Register

export const registerSchema = z.object({
    email: z
        .string()
        .email("Invalid email address"),
    password: z.string().regex(passwordValidation, "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    passwordValidation: z.string().regex(passwordValidation, "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character")
}).refine(
    (data) => data.password === data.passwordValidation, {
    path: ["passwordValidation"],
    message: "Passwords must be same"
});

export type RegisterSchema = z.infer<typeof registerSchema>;


// Edit Profile Schema
export const editProfileSchema = z.object({
    email: z
        .string()
        .email("Invalid email address"),
    currentPassword: z.string().regex(passwordValidation, "Invalid password format"),
    password: z.string().regex(passwordValidation, "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character").optional(),
    confirmNewPassword: z.string().optional()
}).refine(
    (data) => !data.password || data.password === data.confirmNewPassword,
    {
        path: ["confirmNewPassword"],
        message: "Passwords must match"
    }
);

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
export type UpdateUserRequest = Omit<EditProfileSchema, 'confirmNewPassword'>;
