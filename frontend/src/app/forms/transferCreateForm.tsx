import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TransferWithIbanSchema, TransferWithIdSchema } from "@/schemas/transferFormSchema"
import { useCreateTransferMutation, useCreateTransferWithIbanMutation } from "../apis/transfer/transferApi";
import { toast } from "react-toastify";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { SelectAccount } from "@/components/selectAccount";


export default function TransferCreateForm() {
    const [useIban, setUseIban] = useState(false);
    const [createTransfer] = useCreateTransferMutation();
    const [createTransferWithIban] = useCreateTransferWithIbanMutation();


    const formIban = useForm({
        resolver: zodResolver(TransferWithIbanSchema),
        defaultValues: {
            senderAccountId: undefined,
            recipientAccountIban: "",
            amount: undefined,
            description: "",
        }
    });
    const formId = useForm({
        resolver: zodResolver(TransferWithIdSchema),
        defaultValues: {
            senderAccountId: undefined,
            recipientAccountId: undefined,
            amount: undefined,
            description: "",
        }
    });

    const onSubmit = async (data: TransferWithIdSchema | TransferWithIbanSchema) => {
        try {
            if (useIban) {
                await createTransferWithIban(data as TransferWithIbanSchema).unwrap();
                formIban.reset()
            } else {
                await createTransfer(data as TransferWithIdSchema).unwrap();
            }
            toast.success("Transfer created successfully!");
            // useIban ? formIban.reset() : formId.reset();
        } catch {
            toast.error("Create operation was not successfull");
        }
        // API'ye gönder vs.
    };

    const currentForm = useIban ? formIban : formId;

    return (
        <Card className="w-[550px]">
            <CardHeader>
                <CardTitle>Create Transfer</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2 mb-6">
                    <Switch
                        checked={useIban}
                        onCheckedChange={setUseIban}
                    />
                    <Label>I have IBAN</Label>
                </div>

                <form onSubmit={currentForm.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">

                        <Label>Category</Label>
                        <Controller
                            control={currentForm.control}
                            name="senderAccountId"
                            render={({ field }) => (
                                <SelectAccount onChange={field.onChange} selectedCategory={0} />

                            )}
                        />
                        {currentForm.formState.errors.senderAccountId && (
                            <p className="text-sm text-destructive">
                                {currentForm.formState.errors.senderAccountId.message}
                            </p>
                        )}


                        {/* <Label htmlFor="senderAccountId">Sender Account ID</Label>
                        <Input
                            id="senderAccountId"
                            type="number"
                            {...currentForm.register("senderAccountId", { valueAsNumber: true })}
                        />
                        {currentForm.formState.errors.senderAccountId && (
                            <p className="text-sm text-destructive">
                                {currentForm.formState.errors.senderAccountId.message}
                            </p>
                        )} */}
                    </div>

                    <div className="space-y-2">
                        <Label>
                            {useIban ? "Recipient IBAN" : "Recipient Account ID"}
                        </Label>
                        {useIban ? (
                            <Input
                                {...formIban.register("recipientAccountIban")}
                                placeholder="Enter IBAN"
                            />
                        ) : (
                            <Input
                                type="number"
                                {...formId.register("recipientAccountId", { valueAsNumber: true })}
                                placeholder="Enter Account ID"
                            />
                        )}
                        {useIban
                            ? formIban.formState.errors.recipientAccountIban && (
                                <p className="text-sm text-destructive">
                                    {formIban.formState.errors.recipientAccountIban.message}
                                </p>
                            )
                            : formId.formState.errors.recipientAccountId && (
                                <p className="text-sm text-destructive">
                                    {formId.formState.errors.recipientAccountId.message}
                                </p>
                            )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            {...currentForm.register("amount", { valueAsNumber: true })}
                        />
                        {currentForm.formState.errors.amount && (
                            <p className="text-sm text-destructive">
                                {currentForm.formState.errors.amount.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            {...currentForm.register("description")}
                        />
                        {currentForm.formState.errors.description && (
                            <p className="text-sm text-destructive">
                                {currentForm.formState.errors.description.message}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="w-full">
                        Create Transfer
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
