import { useForm } from "react-hook-form"
import { useRegisterMutation } from "../apis/user/userApi";
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
import { registerSchema, type RegisterSchema } from "@/schemas/userFormSchemas";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"




export default function Register() {
    // ...
    const [signUp] = useRegisterMutation();

    const form = useForm<RegisterSchema>({
        mode: "onTouched",
        resolver: zodResolver(registerSchema),
        defaultValues: {
            "email": "",
            "password": "",
            "passwordValidation": "",
        }
    });

    const onSubmit = async (user: RegisterSchema) => {
        try {
            await signUp(user).unwrap();
        } catch (error) {
            const apiError = error as { message: string };
            console.log("apiError");
            console.log(apiError);
            if (apiError.message && typeof apiError.message === 'string') {
                const errorArray = apiError.message.split(',');
                errorArray.forEach((error) => {
                    if (error.includes('email') || error.includes('Email')) {
                        form.setError('email', { message: error });
                    }
                    if (error.includes('password') || error.includes('Password')) {
                        form.setError('password', { message: error });
                    }
                })
            }
        }

    }

    return (
        <Card className="w-[550px] py-20 px-6 ">
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription> Register to Continue </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}  >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
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
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordValidation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password Validation</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password Validation" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between" >
                            <Button type="button" variant="outline">Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
