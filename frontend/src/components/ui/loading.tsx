import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-[300px] flex flex-col items-center justify-center text-muted-foreground">
            <Loader2 className="animate-spin w-8 h-8 mb-2" />
            <p className="text-sm">Yükleniyor...</p>
        </div>
    );
}