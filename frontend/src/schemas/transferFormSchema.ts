import { z } from "zod";


export const CreateTransferSchema = z.object({
    senderAccountId: z.number({ required_error: "Sender is required" }).min(2).max(50),
    recipientAccountId: z.number({ required_error: "Reciever is required" }).min(0),
    amount: z.number({ required_error: "Amount is required" }).min(2).max(50),
    description: z.string({ required_error: "Description is required" }).min(2).max(50),
})
export type CreateTransferSchema = z.infer<typeof CreateTransferSchema>;
