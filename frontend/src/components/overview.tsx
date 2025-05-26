import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AccountsCardGroup from "./accounts-card-group";
import TransferStatus from "./transfer-status";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { ExternalLink } from "lucide-react";
import { useGetTransactionSummaryQuery } from "@/app/apis/transaction/transactionApi";

// const data = [
//     { date: '2024-03-01', amount: 1200 },
//     { date: '2024-03-02', amount: 2100 },
//     { date: '2024-03-03', amount: 1800 },
//     { date: '2024-03-04', amount: 2400 },
//     { date: '2024-03-05', amount: 2000 },
//     { date: '2024-03-06', amount: 3100 },
//     { date: '2024-03-07', amount: 2800 },
// ];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-popover text-popover-foreground rounded-lg border p-2 shadow-md">
                <p className="text-sm font-medium">
                    {new Date(label).toLocaleDateString()}
                </p>
                <p className="text-sm">
                    Amount: ${payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};

export default function Overview() {
    const { data } = useGetTransactionSummaryQuery();

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold tracking-tight">Transactions</h2>
                <Button variant="ghost" size="sm" asChild>
                    <Link to="/transactions" className="flex items-center gap-2">
                        View All
                        <ExternalLink className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Transaction Overview</CardTitle>
                    <CardDescription>Your financial activity over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer minWidth="750px" width="100%" height="100%">
                            <LineChart

                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                                />
                                <YAxis />
                                <Tooltip
                                    content={<CustomTooltip />}
                                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                                    formatter={(value) => [`$${value}`, 'Amount']}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="totalAmount"
                                    strokeWidth={2}

                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            <AccountsCardGroup />
            <TransferStatus />
        </>

    );
}