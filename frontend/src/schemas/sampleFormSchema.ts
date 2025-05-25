import { z } from "zod";


export const CreateSampleSchema = z.object({
    name: z.string({ required_error: "Name is required" }).min(2).max(50),
})
export type CreateSampleSchema = z.infer<typeof CreateSampleSchema>;
