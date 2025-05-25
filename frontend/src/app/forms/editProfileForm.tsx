import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editProfileSchema, type EditProfileSchema } from "@/schemas/userFormSchemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { useUpdateUserMutation, useUserInfoQuery } from "../apis/user/userApi";



export default function EditProfileForm() {
    const [updateUser] = useUpdateUserMutation();
    const { data: userData } = useUserInfoQuery();

    const form = useForm<EditProfileSchema>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            email: userData?.email ?? "",
            currentPassword: "",
            password: "",
            confirmNewPassword: ""
        }
    });

    const onSubmit = async (data: EditProfileSchema) => {
        try {
            // Destructure to omit confirmNewPassword
            const { confirmNewPassword, ...updateData } = data;
            await updateUser(updateData).unwrap();
            toast.success("Profile updated successfully!");
            form.reset();
        } catch (error) {
            const apiError = error as { message: string };
            if (apiError.message && typeof apiError.message === 'string') {
                const errorArray = apiError.message.split(',');
                errorArray.forEach((error) => {
                    if (error.includes('email')) {
                        form.setError('email', { message: error });
                    }
                    if (error.includes('password')) {
                        form.setError('currentPassword', { message: error });
                    }
                });
            }
            toast.error("Failed to update profile");
        }
    };

    return (
        <Card className="min-w-[400px]" >
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
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
                                    <FormLabel>New Password (Optional)</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmNewPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end space-x-4">
                            <Button type="button" variant="outline">Cancel</Button>
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}