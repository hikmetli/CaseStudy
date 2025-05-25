import { useLocation, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ServerError() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const title = state?.error?.title || "Bir sunucu hatası oluştu";
    const detail =
        state?.error?.detail ||
        "Sunucu şu anda isteğinizi işleyemiyor. Lütfen daha sonra tekrar deneyin.";

    return (

        <Card className="w-full max-w-xl shadow-xl">
            <CardContent className="flex flex-col items-center justify-center gap-6 py-10">
                <AlertCircle className="w-16 h-16 text-destructive" />
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
                    <p className="text-sm text-muted-foreground">{detail}</p>
                </div>
                <Button onClick={() => navigate("/")}>Ana Sayfaya Dön</Button>
            </CardContent>
        </Card>
    );
}
