import { useState } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import type { Sample } from "@/app/models/sample";
import { useUpdateSampleMutation } from "@/app/apis/sample/sampleApi";

type Props = {
    initialSample: Sample;
};

export default function SampleEditPopover({ initialSample }: Props) {
    const [updateSample] = useUpdateSampleMutation();

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    const onSave = (updatedSample: Sample) => {
        console.log(updatedSample);
        updateSample(updatedSample);
    }

    const handleSave = () => {
        if (name !== "" || name !== null) {
            const newSample: Sample = {
                name,
                id: initialSample.id
            }
            onSave(newSample);
        }
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                    <Pencil className="w-4 h-4" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-64">
                <div className="space-y-4">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Update Name"
                    />

                    <div className="flex justify-end gap-2">
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>OK</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
