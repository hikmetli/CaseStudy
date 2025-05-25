import TransactionEditPopover from "@/components/edit/transactionEdit";
import { useDeleteTransactionMutation, useLazyGetAllTransactionsQuery } from "../apis/transaction/transactionApi"
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionCreateForm from "../forms/transactionCreateForm";



export default function TransactionPage() {

    const [getAllTransactions, { data, isLoading }] = useLazyGetAllTransactionsQuery();
    const [deleteTransaction] = useDeleteTransactionMutation();

    const navigate = useNavigate();

    useEffect(() => {
        getAllTransactions();
    }, [getAllTransactions]);

    const onEdit = (e: number) => {
        console.log(e);
    }

    const onDelete = (id: number) => {
        deleteTransaction(id);
    }

    return (

        <div className="overflow-x-auto border rounded-xl shadow-sm">
            <Tabs defaultValue="show" className="w-full min-w-[350px]">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="show">Show</TabsTrigger>
                    <TabsTrigger value="create">Create</TabsTrigger>
                </TabsList>

                <TabsContent className="m-10" value="show">
                    {/* // Table */}
                    <table className="min-w-full">
                        <thead className="bg-muted">
                            <tr>
                                <th className="text-left p-4 font-medium text-muted-foreground">#</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Description</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Amount</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">CategoryId</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">UserId</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Edit</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (<Loading />) : data && data.map((transaction) => (
                                <tr
                                    key={transaction.id}
                                    className="hover:bg-muted/50 cursor-pointer transition"
                                    onClick={() => navigate(`/transactions/${transaction.id}`)} // TransactionDetailPage
                                >
                                    <td className="p-4">{transaction.id}</td>
                                    <td className="p-4">{transaction.description}</td>
                                    <td className="p-4">{transaction.amount}</td>
                                    <td className="p-4">{transaction.categoryId}</td>
                                    <td className="p-4">{transaction.userId}</td>
                                    <td className="p-4" onClick={(e) => { e.stopPropagation(); onEdit(transaction.id); }}>
                                        <TransactionEditPopover initialTransaction={transaction} />
                                    </td>
                                    <td className="p-4" onClick={(e) => { e.stopPropagation(); onDelete(transaction.id); }}>
                                        <Button size="sm" variant="destructive">
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </TabsContent>

                <TabsContent className="m-10" value="create">
                    <TransactionCreateForm />
                </TabsContent>
            </Tabs>

        </div>
    )
}
