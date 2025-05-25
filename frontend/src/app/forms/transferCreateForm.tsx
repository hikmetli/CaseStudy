import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreateTransferSchema } from "@/schemas/transferFormSchema"
import { useCreateTransferMutation } from "../apis/transfer/transferApi";
import { toast } from "react-toastify";


export default function TransferCreateForm() {
    const [createTransfer] = useCreateTransferMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CreateTransferSchema>({
        resolver: zodResolver(CreateTransferSchema),
    });

    const onSubmit = (data: CreateTransferSchema) => {
        try {
            createTransfer(data);
            toast.success("Transfer successfully created!");

        } catch {
            toast.error("Create operation was not successfull");
        }
        // API'ye gönder vs.
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">

            <div className="space-y-2">
                <Label htmlFor="amount">Transfer Amount</Label>
                <Input id="amount" {...register("amount", { valueAsNumber: true })} />
                {errors.amount && (
                    <p className="text-sm text-destructive">{errors.amount.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Transfer Description</Label>
                <Input id="description" {...register("description")} />
                {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="senderAccountId">Transfer From (Account Id)</Label>
                <Input id="senderAccountId" {...register("senderAccountId", { valueAsNumber: true })} />
                {errors.senderAccountId && (
                    <p className="text-sm text-destructive">{errors.senderAccountId.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="recipientAccountId">Transfer To (Account Id)</Label>
                <Input id="recipientAccountId" {...register("recipientAccountId", { valueAsNumber: true })} />
                {errors.recipientAccountId && (
                    <p className="text-sm text-destructive">{errors.recipientAccountId.message}</p>
                )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create"}
            </Button>
        </form>
    );
}
