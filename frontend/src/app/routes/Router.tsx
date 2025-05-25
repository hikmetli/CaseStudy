import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../pages/HomePage";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import Features from "../pages/Features";
import ServerError from "../pages/error/ServerError";
import NotFound from "../pages/error/NotFound";
import BuggyErrorsPage from "../pages/error/BuggyErrorsPage";
import RequireAuth from "./RequireAuth";
import AccountPage from "../pages/AccountPage";
import TransactionPage from "../pages/TransactionPage";
import TransferPage from "../pages/TransferPage";
import UserPage from "../pages/UserPage";

export const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        {
            element: <RequireAuth />,
            children: [
                { path: "/accounts", element: <AccountPage /> },
                { path: "/transactions", element: <TransactionPage /> },
                { path: "/transfers", element: <TransferPage /> },
                { path: "/user", element: <UserPage /> },
            ]

        },


        { path: "", element: <HomePage /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <SignIn /> },
        { path: "/features", element: <Features /> },


        { path: "/errors", element: <BuggyErrorsPage /> },
        { path: "/server-error", element: <ServerError /> },
        { path: "/not-found", element: <NotFound /> },
        { path: "*", element: <Navigate replace to="/not-found" /> },

    ]

}])