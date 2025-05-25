import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Home, Pencil, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Overview from "./overview";
import EditProfileForm from "@/app/forms/editProfileForm";

const menuItems = [
    { key: "overview", label: "Overview", icon: <Home size={16} /> },
    { key: "edit", label: "Edit Profile", icon: <Pencil size={16} /> },
    { key: "danger", label: "Danger Zone", icon: <Trash2 size={16} /> },
];

export default function UserDashboardLayout() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="min-h-screen bg-background">
            {/* Container */}
            <div className="flex">
                {/* Sidebar */}
                <aside className="fixed left-0 top-0 z-20 flex h-screen w-64 flex-col border-r bg-background">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold">User Panel</h2>
                    </div>
                    <Separator />
                    <nav className="flex-1 space-y-1 p-4">
                        {menuItems.map((item) => (
                            <button
                                key={item.key}
                                onClick={() => setActiveTab(item.key)}
                                className={`flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors
                                    ${activeTab === item.key
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-accent hover:text-accent-foreground"
                                    }`}
                            >
                                <span className="mr-2">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="ml-64 flex-1 p-6">
                    <div className="mx-auto max-w-4xl">
                        {activeTab === "overview" && (
                            <Overview></Overview>
                        )}

                        {activeTab === "edit" && (
                            <EditProfileForm />
                        )}

                        {activeTab === "danger" && (
                            <Card className="border-destructive">
                                <CardHeader>
                                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-4 text-sm text-destructive">
                                        This action cannot be undone. Are you sure you want to delete this user?
                                    </p>
                                    <Button variant="destructive">Delete User</Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}