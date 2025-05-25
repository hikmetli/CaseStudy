import { useState } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import type { Transfer } from "@/app/models/transfer";
import { useUpdateTransferMutation } from "@/app/apis/transfer/transferApi";

type Props = {
    initialTransfer: Transfer;
};

export default function TransferEditPopover({ initialTransfer }: Props) {
    const [updateTransfer] = useUpdateTransferMutation();

    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState(initialTransfer.description);
    const [amount, setAmount] = useState(initialTransfer.amount);


    const onSave = (updatedTransfer: Transfer) => {
        console.log(updatedTransfer);
        updateTransfer(updatedTransfer);
    }

    const handleSave = () => {
        if (description !== "" || description !== null) {
            const newTransfer: Transfer = {
                senderAccountId: initialTransfer.senderAccountId,
                id: initialTransfer.id,
                recipientAccountId: initialTransfer.recipientAccountId,
                date: initialTransfer.date,
                amount,
                description
            }
            onSave(newTransfer);
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

            <PopoverContent className="w-64">
                <div className="space-y-4">
                    <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Update Name"
                    />

                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number.parseFloat(e.target.value))}
                        placeholder="Update Amount"
                    />

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
