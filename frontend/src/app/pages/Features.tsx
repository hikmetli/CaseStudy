import SampleEditPopover from "@/components/edit/sampleEdit";
import { useDeleteSampleMutation, useLazyGetAllSamplesQuery } from "../apis/sample/sampleApi"
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SampleCreateForm from "../forms/sampleCreateForm";



export default function Features() {

    const [getAllSamples, { data, isLoading }] = useLazyGetAllSamplesQuery();
    const [deleteSample] = useDeleteSampleMutation();

    const navigate = useNavigate();

    useEffect(() => {
        getAllSamples();
    }, [getAllSamples]);

    const onEdit = (e: number) => {
        console.log(e);
    }

    const onDelete = (id: number) => {
        deleteSample(id);
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
                                <th className="text-left p-4 font-medium text-muted-foreground">Ad</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Düzenle</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Sil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (<Loading />) : data && data.map((sample) => (
                                <tr
                                    key={sample.id}
                                    className="hover:bg-muted/50 cursor-pointer transition"
                                    onClick={() => navigate(`/samples/${sample.id}`)} // SampleDetailPage
                                >
                                    <td className="p-4">{sample.id}</td>
                                    <td className="p-4">{sample.name}</td>
                                    <td className="p-4" onClick={(e) => { e.stopPropagation(); onEdit(sample.id); }}>
                                        <SampleEditPopover initialSample={sample} />
                                    </td>
                                    <td className="p-4" onClick={(e) => { e.stopPropagation(); onDelete(sample.id); }}>
                                        <Button size="sm" variant="destructive">
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Button>Add New Sample</Button>
                </TabsContent>

                <TabsContent className="m-10" value="create">
                    <SampleCreateForm />
                </TabsContent>
            </Tabs>

        </div>
    )
}
