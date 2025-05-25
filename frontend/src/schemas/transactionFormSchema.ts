import { z } from "zod";


export const CreateTransactionSchema = z.object({
    description: z.string({ required_error: "Transaction description is required" }).min(2, "Transaction description should be minimum 2 latters").max(100, "Transaction description should be maximum 100 latters"),
    amount: z.number({ required_error: "Transaction amount is required" }).min(1, "Transaction amount need to be greated then 1"),
    categoryId: z.number({ required_error: "Transaction category is required" }),
    date: z.date().nullable()
})
export type CreateTransactionSchema = z.infer<typeof CreateTransactionSchema>;
