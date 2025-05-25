import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreateSampleSchema } from "@/schemas/sampleFormSchema"
import { useCreateSampleMutation } from "../apis/sample/sampleApi";
import { toast } from "react-toastify";


export default function SampleCreateForm() {
    const [createSample] = useCreateSampleMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CreateSampleSchema>({
        resolver: zodResolver(CreateSampleSchema),
    });

    const onSubmit = (data: CreateSampleSchema) => {
        try {
            createSample(data);
            toast.success("Sample successfully created!");

        } catch {
            toast.error("Create operation was not successfull");
        }
        // API'ye gönder vs.
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            <div className="space-y-2">
                <Label htmlFor="name">Sample Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create"}
            </Button>
        </form>
    );
}
