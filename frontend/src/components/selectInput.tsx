import { useGetCategoriesQuery } from "@/app/apis/category/categoryApi"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Props = {
    onChange: (value: number) => void;
    selectedCategory: number
}

export function SelectInput({ onChange, selectedCategory }: Props) {
    const { data } = useGetCategoriesQuery();

    return (
        <Select onValueChange={(value) => {
            console.log(value, typeof value);
            onChange(Number.parseInt(value))
        }}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={(data && selectedCategory) ? data.find((value) => value.id == selectedCategory)?.name : "Select a Category"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup defaultValue={selectedCategory} >
                    {data &&
                        data.map(({ id, name }) => (
                            <SelectItem key={id} value={id.toString()}>{name}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}