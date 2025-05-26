import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format, set } from "date-fns";
import { Calendar as CalendarIcon, Loader2, Trash } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import TransactionCreateForm from "../forms/transactionCreateForm";
import TransactionEditPopover from "@/components/edit/transactionEdit";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useNavigate } from "react-router";
import { useDeleteTransactionMutation, useLazyGetAllTransactionsQuery } from "../apis/transaction/transactionApi";
import { useGetCategoriesQuery } from "../apis/category/categoryApi";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { resetParams, setCategories, setDates } from "../slices/transactionSlice";


export default function TransactionPage() {
    const [getAllTransactions, { data, isLoading }] = useLazyGetAllTransactionsQuery();
    const [deleteTransaction] = useDeleteTransactionMutation();
    const { data: categories } = useGetCategoriesQuery()
    const transactionParams = useAppSelector(state => state.pTransaction)
    const dispatch = useAppDispatch();

    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [dateRange, setDateRange] = useState<{
        from: Date | undefined;
        to: Date | undefined;
    }>({
        from: undefined,
        to: undefined,
    });

    const onCategoryChage = (d) => {
        console.log(d);
        dispatch(setCategories([d]));
        setSelectedCategory(d)
    }

    const onDateChanged = (dates: { from: Date | undefined, to: Date | undefined }) => {
        const fromStr = dates.from ? dates.from.toISOString() : "";
        const toStr = dates.to ? dates.to.toISOString() : "";
        dispatch(setDates({ from: fromStr, to: toStr }));

        setDateRange(dates);
    }

    const onDelete = (id: number) => {
        deleteTransaction(id);
    }

    const navigate = useNavigate();

    useEffect(() => {
        getAllTransactions(transactionParams);
    }, [getAllTransactions, transactionParams]);


    return (
        <div className="space-y-6">
            <Tabs defaultValue="show" className="w-full">
                <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                    <TabsTrigger value="show">Show Transactions</TabsTrigger>
                    <TabsTrigger value="create">Create Transaction</TabsTrigger>
                </TabsList>

                <TabsContent value="show" className="space-y-4">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <Select value={selectedCategory} onValueChange={onCategoryChage}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="temp">All Categories</SelectItem>
                                {categories && categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id.toString()}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dateRange.from ? (
                                        dateRange.to ? (
                                            <>
                                                {format(dateRange.from, "LLL dd, y")} -{" "}
                                                {format(dateRange.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(dateRange.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date range</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    selected={dateRange}
                                    onSelect={onDateChanged}
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>

                        <Button
                            variant="outline"
                            onClick={() => {
                                dispatch(resetParams());
                                setSelectedCategory("");
                                setDateRange({ from: undefined, to: undefined });
                            }}
                        >
                            Reset Filters
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border min-h-[500px]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                                        </TableCell>
                                    </TableRow>
                                ) : data?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            No transactions found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data?.map((transaction) => (
                                        <TableRow
                                            key={transaction.id}
                                            className="cursor-pointer"
                                            onClick={() => navigate(`/transactions/${transaction.id}`)}
                                        >
                                            <TableCell>{transaction.id}</TableCell>
                                            <TableCell>{transaction.description}</TableCell>
                                            <TableCell>
                                                {new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD'
                                                }).format(transaction.amount)}
                                            </TableCell>
                                            <TableCell>
                                                {categories ? categories.find(c => c.id === transaction.categoryId)?.name : "Loading..."}
                                            </TableCell>
                                            <TableCell>
                                                {format(new Date(transaction.date), "PP")}
                                            </TableCell>
                                            <TableCell className="space-x-2">
                                                <TransactionEditPopover
                                                    initialTransaction={transaction}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onDelete(transaction.id);
                                                    }}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>

                <TabsContent value="create">
                    <TransactionCreateForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}