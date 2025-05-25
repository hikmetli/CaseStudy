import { Link } from "react-router"
import { User } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLogoutMutation, useUserInfoQuery } from "../apis/user/userApi"

export default function Navbar() {
    const { data: user } = useUserInfoQuery();
    const [logout] = useLogoutMutation();


    return (
        <nav className="border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left - Brand */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold">
                            Brand
                        </Link>
                    </div>

                    {/* Middle - Navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-4">
                            <Link to="/features" className="hover:text-primary">
                                Features
                            </Link>
                            <Link to="/pricing" className="hover:text-primary">
                                Pricing
                            </Link>
                            <Link to="/about" className="hover:text-primary">
                                About
                            </Link>
                        </div>
                    </div>

                    {/* Right - Mode Toggle & Auth */}
                    <div className="flex items-center space-x-4">
                        <ModeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <User className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            {
                                user ? (
                                    <DropdownMenuContent align="end">
                                        <Link to="/user" >
                                            <DropdownMenuItem className="cursor-pointer">
                                                Account
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem onClick={logout} className="cursor-pointer">
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>

                                ) : (
                                    <DropdownMenuContent align="end">
                                        <Link to="/login" >
                                            <DropdownMenuItem className="cursor-pointer">
                                                Sign In
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to="/register" >
                                            <DropdownMenuItem className="cursor-pointer">
                                                Sign Up
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                )
                            }
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    )
}