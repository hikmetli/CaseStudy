import { z } from "zod";


export const CreateAccountSchema = z.object({
    accountName: z.string({ required_error: "Account name is required" }).min(2, "Account Name should be minimum 2 latters").max(50, "Account Name should be maximum 50 latters"),

})
export type CreateAccountSchema = z.infer<typeof CreateAccountSchema>;
