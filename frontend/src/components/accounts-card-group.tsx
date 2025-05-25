import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"

type Account = {
    id: number;
    accountName: string;
    balance: number;
    currency: string;
}

const sampleAccounts: Account[] = [
    { id: 1, accountName: "Main Account", balance: 5240.50, currency: "USD" },
    { id: 2, accountName: "Savings", balance: 12350.75, currency: "USD" },
    { id: 3, accountName: "Investment", balance: 8420.25, currency: "USD" },
];

export default function AccountsCardGroup() {
    return (
        <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold tracking-tight">Your Accounts</h2>
                <Button variant="ghost" size="sm" asChild>
                    <Link to="/accounts" className="flex items-center gap-2">
                        View All
                        <ExternalLink className="h-4 w-4" />
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sampleAccounts.map((account) => (
                    <Card key={account.id} className="hover:bg-accent transition-colors">
                        <CardHeader>
                            <CardTitle className="text-lg">{account.accountName}</CardTitle>
                            <CardDescription>Account #{account.id}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: account.currency
                                }).format(account.balance)}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}