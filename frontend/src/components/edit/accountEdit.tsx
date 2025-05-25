import { useState } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import type { Account } from "@/app/models/account";
import { useUpdateAccountMutation } from "@/app/apis/account/accountApi";

type Props = {
    initialAccount: Account;
};

export default function AccountEditPopover({ initialAccount }: Props) {
    const [updateAccount] = useUpdateAccountMutation();

    const [open, setOpen] = useState(false);
    const [accountName, setName] = useState(initialAccount.accountName);
    const [balance, setBalance] = useState(initialAccount.balance);


    const onSave = (updatedAccount: Account) => {
        console.log(updatedAccount);
        updateAccount(updatedAccount);
    }


    const handleSave = () => {
        if (accountName !== "" || accountName !== null) {
            const newAccount: Account = {
                accountName,
                id: initialAccount.id,
                balance,
                userId: initialAccount.userId,
                createdAt: initialAccount.createdAt
            }
            onSave(newAccount);
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
                        value={accountName}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Update Name"
                    />

                    <Input
                        value={balance}
                        onChange={(e) => setBalance(Number.parseFloat(e.target.value))}
                        placeholder="Update Balance"
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
