import { useState } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import type { Transaction, TransactionUpdateModel } from "@/app/models/transaction";

import { SelectInput } from "../selectInput";
import { DatePicker } from "../ui/date-picker";
import { useUpdateTransactionMutation } from "@/app/apis/transaction/transactionApi";

type Props = {
    initialTransaction: Transaction;
};

export default function TransactionEditPopover({ initialTransaction }: Props) {
    const [updateTransaction] = useUpdateTransactionMutation();

    const [open, setOpen] = useState(false);
    const [description, seDescription] = useState(initialTransaction.description);
    const [amount, setAmount] = useState(initialTransaction.amount);
    const [categoryId, setCategoryId] = useState(initialTransaction.categoryId.toString());
    const [date, setDate] = useState<Date>(initialTransaction.date);


    const onSave = (updatedTransaction: TransactionUpdateModel) => {
        console.log(updatedTransaction);
        updateTransaction(updatedTransaction);
    }


    const handleSave = () => {
        if (description !== "" || description !== null) {
            const newTransaction: TransactionUpdateModel = {
                description,
                id: initialTransaction.id,
                amount,
                date,
                categoryId: Number.parseInt(categoryId)
            }
            onSave(newTransaction);
        }
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                    <Pencil className="w-4 h-4" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="min-w-90">
                <div className="space-y-4">
                    <Input
                        value={description}
                        onChange={(e) => seDescription(e.target.value)}
                        placeholder="Update Name"
                    />

                    <Input
                        value={amount}
                        onChange={(e) => setAmount(Number.parseFloat(e.target.value))}
                        placeholder="Update Balance"
                    />

                    <SelectInput onChange={setCategoryId} selectedCategory={Number.parseInt(categoryId)} />

                    <DatePicker onSelect={setDate} date={date} />

                    <div className="flex justify-end gap-2">
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>OK</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
