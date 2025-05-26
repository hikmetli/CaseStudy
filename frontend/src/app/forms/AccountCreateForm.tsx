import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreateAccountSchema } from "@/schemas/accountFormSchema"
import { useCreateAccountMutation } from "../apis/account/accountApi";
import { toast } from "react-toastify";


export default function AccountCreateForm() {
    const [createAccount] = useCreateAccountMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CreateAccountSchema>({
        resolver: zodResolver(CreateAccountSchema),
    });

    const onSubmit = (data: CreateAccountSchema) => {
        try {
            createAccount(data);
            toast.success("Account successfully created!");

        } catch {
            toast.error("Create operation was not successfull");
        }
        // API'ye gönder vs.
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            <div className="space-y-2">
                <Label htmlFor="name">Account Name</Label>
                <Input id="name" {...register("accountName")} />
                {errors.accountName && (
                    <p className="text-sm text-destructive">{errors.accountName.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="Balance">Account Balance</Label>
                <Input id="balance" {...register("balance", { valueAsNumber: true })} />
                {errors.balance && (
                    <p className="text-sm text-destructive">{errors.balance.message}</p>
                )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create"}
            </Button>
        </form>
    );
}
