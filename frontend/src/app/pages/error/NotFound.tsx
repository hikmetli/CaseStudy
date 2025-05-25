import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Card className="w-full max-w-md shadow-xl">
            <CardContent className="flex flex-col items-center justify-center gap-6 py-10">
                <AlertTriangle className="w-16 h-16 text-destructive" />
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold text-foreground">
                        Sayfa Bulunamadı
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Aradığınız sayfa mevcut değil ya da taşınmış olabilir.
                    </p>
                </div>
                <Button variant="default" onClick={() => navigate("/")}>
                    Ana Sayfaya Dön
                </Button>
            </CardContent>
        </Card>
    );
}
