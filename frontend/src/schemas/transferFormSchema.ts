import { z } from "zod";


export const CreateTransferSchema = z.object({
    senderAccountId: z.number({ required_error: "Sender is required" }).min(2).max(50),
    recipientAccountId: z.number({ required_error: "Reciever is required" }).min(0),
    amount: z.number({ required_error: "Amount is required" }).min(2).max(50),
    description: z.string({ required_error: "Description is required" }).min(2).max(50),
})
export type CreateTransferSchema = z.infer<typeof CreateTransferSchema>;

const BaseTransferSchema = z.object({
    senderAccountId: z.number({ required_error: "Sender is required" }).min(2),
    amount: z.number({ required_error: "Amount is required" }).min(2),
    description: z.string({ required_error: "Description is required" }).min(2).max(50),
});

export const TransferWithIdSchema = BaseTransferSchema.extend({
    recipientAccountId: z.number({ required_error: "Recipient ID is required" }).min(1),
});

export const TransferWithIbanSchema = BaseTransferSchema.extend({
    recipientAccountIban: z.string({ required_error: "IBAN is required" }).min(15).max(100),
});

export type TransferWithIdSchema = z.infer<typeof TransferWithIdSchema>;
export type TransferWithIbanSchema = z.infer<typeof TransferWithIbanSchema>;