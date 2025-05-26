import { useGetAllAccountsQuery } from "@/app/apis/account/accountApi";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SelectLabel } from "@radix-ui/react-select";

type Props = {
    onChange: (value: number) => void;
    selectedCategory: number
}

export function SelectAccount({ onChange, selectedCategory }: Props) {
    const { data, isLoading } = useGetAllAccountsQuery();

    return (
        <Select onValueChange={(value) => {
            console.log(value, typeof value);
            onChange(Number.parseInt(value))
        }}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={(data && selectedCategory) ? data.find((value) => value.id == selectedCategory)?.accountName : "Select an Account"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup defaultValue={selectedCategory} >
                    {data ?
                        data.map(({ id, accountName }) => (
                            <SelectItem key={id} value={id.toString()}>{accountName}</SelectItem>
                        )) : isLoading ? <SelectLabel>Loading...</SelectLabel> :
                            <SelectLabel>No Accounts Available</SelectLabel>
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}