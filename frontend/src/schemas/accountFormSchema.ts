import { z } from "zod";


export const CreateAccountSchema = z.object({
    accountName: z.string({ required_error: "Account name is required" }).min(2, "Account Name should be minimum 2 latters").max(50, "Account Name should be maximum 50 latters"),
    balance: z.number().min(0, "Balance should be minimum 0").max(1000000, "Balance should be maximum 1,000,000").nullable(),
})
export type CreateAccountSchema = z.infer<typeof CreateAccountSchema>;
