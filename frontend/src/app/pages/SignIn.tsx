import { useForm } from "react-hook-form"
import { useLoginMutation } from "../apis/user/userApi";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "../../schemas/userFormSchemas";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router";


export default function SignIn() {

    const [login, { isSuccess }] = useLoginMutation();
    const navigate = useNavigate();
    const location = useLocation();


    const form = useForm<SignInSchema>({
        mode: "onTouched",
        resolver: zodResolver(SignInSchema)
    });

    const onSubmit = async (event: SignInSchema) => {
        await login(event);
        if (!isSuccess) return;
        navigate(location.state?.from || '/');

    }

    return (
        <Card className="w-[550px] py-20 px-6 ">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription> Login to Continue </CardDescription>
            </CardHeader>
            <CardContent>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
