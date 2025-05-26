import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import { useGetAllAccountsQuery } from "@/app/apis/account/accountApi"


export default function AccountsCardGroup() {
    const { data } = useGetAllAccountsQuery();

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
                {data && data?.length > 0 ? data.slice(0, 3).map((account) => (
                    <Card key={account.id} className="hover:bg-accent transition-colors">
                        <CardHeader>
                            <CardTitle className="text-lg">{account.accountName}</CardTitle>
                            <CardDescription>Account #{account.id}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: "USD"
                                }).format(account.balance)}
                            </p>
                        </CardContent>
                    </Card>
                )) : (
                    <Link to="/accounts" className="flex items-center gap-2">
                        <Card className="hover:bg-accent transition-colors">
                            <CardHeader>
                                <CardTitle className="text-lg">There Is No Account</CardTitle>
                                <CardDescription>Account #</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xl font-bold">
                                    Create One!
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                )}
            </div>
        </div>
    )
}