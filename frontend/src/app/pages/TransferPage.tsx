import TransferEditPopover from "@/components/edit/transferEdit";
import { useDeleteTransferMutation, useLazyGetAllTransfersQuery } from "../apis/transfer/transferApi"
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransferCreateForm from "../forms/transferCreateForm";



export default function TransferPage() {

    const [getAllTransfers, { data, isLoading }] = useLazyGetAllTransfersQuery();
    const [deleteTransfer] = useDeleteTransferMutation();

    const navigate = useNavigate();

    useEffect(() => {
        getAllTransfers();
    }, [getAllTransfers]);

    const onEdit = (e: number) => {
        console.log(e);
    }

    const onDelete = (id: number) => {
        deleteTransfer(id);
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
                                <th className="text-left p-4 font-medium text-muted-foreground">From User Id</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">To User Id</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Edit</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (<Loading />) : data && data.map((transfer) => (
                                <tr
                                    key={transfer.id}
                                    className="hover:bg-muted/50 cursor-pointer transition"
                                    onClick={() => navigate(`/transfers/${transfer.id}`)} // TransferDetailPage
                                >
                                    <td className="p-4">{transfer.id}</td>
                                    <td className="p-4">{transfer.description}</td>
                                    <td className="p-4">{transfer.amount}</td>
                                    <td className="p-4">{transfer.senderAccountId}</td>
                                    <td className="p-4">{transfer.recipientAccountId}</td>
                                    <td className="p-4">{transfer.date instanceof Date
                                        ? transfer.date.toDateString()
                                        : new Date(transfer.date).toDateString()}</td>
                                    <td className="p-4" onClick={(e) => { e.stopPropagation(); onEdit(transfer.id); }}>
                                        <TransferEditPopover initialTransfer={transfer} />
                                    </td>
                                    <td className="p-4" onClick={(e) => { e.stopPropagation(); onDelete(transfer.id); }}>
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
                    <TransferCreateForm />
                </TabsContent>
            </Tabs>

        </div>
    )
}
