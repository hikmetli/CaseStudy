import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "./ui/card";

type TransferStatus = 'pending' | 'done' | 'rejected';

type Transfer = {
    id: number;
    senderAccount: string;
    receiverAccount: string;
    amount: number;
    status: TransferStatus;
    createdAt: string;
}

const sampleTransfers: Transfer[] = [
    { id: 1, senderAccount: "Main Account", receiverAccount: "Savings", amount: 1000, status: 'done', createdAt: '2024-03-10' },
    { id: 2, senderAccount: "Investment", receiverAccount: "Main Account", amount: 500, status: 'pending', createdAt: '2024-03-09' },
    { id: 3, senderAccount: "Savings", receiverAccount: "Investment", amount: 750, status: 'rejected', createdAt: '2024-03-08' },
];

const StatusBadge = ({ status }: { status: TransferStatus }) => {
    const statusStyles = {
        pending: "bg-orange-200 text-orange-700 hover:bg-orange-200",
        done: "bg-green-200 text-green-700 hover:bg-green-200",
        rejected: "bg-red-200 text-red-700 hover:bg-red-200"
    };

    return (
        <Badge className={statusStyles[status]} variant="secondary">
            {status}
        </Badge>
    );
};

export default function TransferStatus() {
    return (
        <>
            {/* Previous components */}
            <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold tracking-tight">Recent Transfers</h2>
                    <Button variant="ghost" size="sm" asChild>
                        <Link to="/transfers" className="flex items-center gap-2">
                            View All
                            <ExternalLink className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Requesting Account</TableHead>
                                    <TableHead>Requested Account</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created At</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sampleTransfers.map((transfer) => (
                                    <TableRow key={transfer.id}>
                                        <TableCell>{transfer.senderAccount}</TableCell>
                                        <TableCell>{transfer.receiverAccount}</TableCell>
                                        <TableCell>
                                            {new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            }).format(transfer.amount)}
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={transfer.status} />
                                        </TableCell>
                                        <TableCell>
                                            {new Date(transfer.createdAt).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}