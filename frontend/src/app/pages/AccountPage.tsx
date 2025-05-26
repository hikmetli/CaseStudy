import { useDeleteAccountMutation, useLazyGetAllAccountsQuery } from "../apis/account/accountApi"
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountCreateForm from "../forms/AccountCreateForm";
import AccountEditPopover from "@/components/edit/accountEdit";



export default function AccountPage() {
    const [getAllAccounts, { data, isLoading }] = useLazyGetAllAccountsQuery();
    const [deleteAccount] = useDeleteAccountMutation();

    const navigate = useNavigate();

    useEffect(() => {
        getAllAccounts();
    }, [getAllAccounts]);

    const onEdit = (e: number) => {
        console.log(e);
    }

    const onDelete = (id: number) => {
        deleteAccount(id);
    }

    return (

        <div className="overflow-x-auto border rounded-xl shadow-sm">
            <Tabs defaultValue="show" className="w-full min-w-[450px]">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="show">Show</TabsTrigger>
                    <TabsTrigger value="create">Create</TabsTrigger>
                </TabsList>

                <TabsContent className="m-10 min-w-[450px]" value="show">
                    {/* // Table */}
                    <table className="min-w-full">
                        <thead className="bg-muted">
                            <tr>
                                <th className="text-left p-4 font-medium text-muted-foreground">#</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Account Name</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Balance</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Used ID</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Created At</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Iban</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Edit</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (<Loading />) : data && data.map((account) => (
                                <tr
                                    key={account.id}
                                    className="hover:bg-muted/50 cursor-pointer transition"
                                    onClick={() => navigate(`/accounts/${account.id}`)} // AccountDetailPage
                                >
                                    <td className="p-4">{account.id}</td>
                                    <td className="p-4">{account.accountName}</td>
                                    <td className="p-4">{account.balance}</td>
                                    <td className="p-4">{account.userId}</td>
                                    <td className="p-4">
                                        {account.createdAt instanceof Date
                                            ? account.createdAt.toDateString()
                                            : new Date(account.createdAt).toDateString()}
                                    </td>
                                    <td className="p-4">{account.iban}</td>

                                    <td className="p-4" onClick={(e) => { e.stopPropagation(); onEdit(account.id); }}>
                                        <AccountEditPopover initialAccount={account} />
                                    </td>
                                    <td className="p-4" onClick={(e) => { e.stopPropagation(); onDelete(account.id); }}>
                                        <Button size="sm" variant="destructive">
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </TabsContent>

                <TabsContent className="m-10 min-w-[450px]" value="create">
                    <AccountCreateForm />
                </TabsContent>
            </Tabs>

        </div>
    )
}
