import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreateTransactionSchema } from "@/schemas/transactionFormSchema"
import { useCreateTransactionMutation } from "../apis/transaction/transactionApi";
import { toast } from "react-toastify";
import { DatePicker } from "@/components/ui/date-picker";
import { SelectInput } from "@/components/selectInput";
import { useEffect } from "react";


export default function TransactionCreateForm() {
    const [createTransaction] = useCreateTransactionMutation();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CreateTransactionSchema>({
        resolver: zodResolver(CreateTransactionSchema),
        defaultValues: {
            date: new Date()
        }
    });
    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const onSubmit = async (data: CreateTransactionSchema) => {
        try {
            console.log("here")
            await createTransaction(data);
            toast.success("Transaction successfully created!");

        } catch {
            toast.error("Create operation was not successfull");
        }
        // API'ye gönder vs.
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            <div className="space-y-2">
                <Label htmlFor="amount">Transaction Amount</Label>
                <Input type="number" id="amount" {...register("amount", { valueAsNumber: true })} />
                {errors.amount && (
                    <p className="text-sm text-destructive">{errors.amount.message}</p>
                )}

                <Label htmlFor="date">Transaction Date</Label>
                <Controller
                    control={control}
                    name="date"
                    render={({ field }) => (
                        <DatePicker
                            date={field.value}
                            onSelect={field.onChange}
                        />
                    )}
                />
                {errors.date && (
                    <p className="text-sm text-destructive">{errors.date.message}</p>
                )}

                <Label>Category</Label>
                <Controller
                    control={control}
                    name="categoryId"
                    render={({ field }) => (
                        <SelectInput onChange={field.onChange} selectedCategory={0} />

                    )}
                />
                {errors.categoryId && (
                    <p className="text-sm text-destructive">{errors.categoryId.message}</p>
                )}


                <Label htmlFor="description">Transaction Description</Label>

                <Input id="description" {...register("description")} />
                {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
                {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                )}

            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create"}
            </Button>
        </form>
    );
}
