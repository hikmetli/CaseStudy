import { useLazyGet400ErrorQuery, useLazyGet401ErrorQuery, useLazyGet404ErrorQuery, useLazyGet500ErrorQuery, useLazyGetValidationErrorQuery } from "@/app/apis/error/errorApi";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function BuggyErrorsPage() {

    const [trigger400Error] = useLazyGet400ErrorQuery();
    const [trigger401Error] = useLazyGet401ErrorQuery();
    const [trigger500Error] = useLazyGet500ErrorQuery();
    const [trigger404Error] = useLazyGet404ErrorQuery();
    const [triggerValidationError] = useLazyGetValidationErrorQuery();
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const getValidationErrors = async () => {
        try {
            const response = await triggerValidationError({}).unwrap();
            console.log(response);
        } catch (error) {
            if (error && typeof error === 'object' && 'message' in error && typeof (error as { message: unknown }).message === 'string') {
                const responseData = (error as { message: string }).message.split(",");
                setValidationErrors(responseData);
            }
        }
    }

    return (
        <Card className="max-w-md mx-auto mt-10">
            <CardHeader>
                <CardTitle className="text-center">Test Hataları</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
                <Button className="w-full" variant="outline" onClick={() => getValidationErrors()}>
                    Validation Error
                </Button>
                <Button className="w-full" variant="outline" onClick={() => trigger400Error({})}>
                    Bad Request
                </Button>
                <Button className="w-full" variant="outline" onClick={() => trigger500Error({})}>
                    Server Error
                </Button>
                <Button className="w-full" variant="outline" onClick={() => trigger401Error({})}>
                    Unauthorized
                </Button>
                <Button className="w-full" variant="outline" onClick={() => trigger404Error({})}>
                    Not Found
                </Button>

                {validationErrors.length > 0 && (
                    <div>
                        <div>Validation errors:</div>
                        {
                            validationErrors.map((err, index) => (
                                <div key={index} >{err} </div>
                            ))
                        }
                    </div>
                )}

            </CardContent>
        </Card>
    );
}
