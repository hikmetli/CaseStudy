import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
// import { router } from "../routes/Router";





const customBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
    // prepareHeaders: (headers) => {
    //     headers.set("Accept", "application/json");
    //     headers.set("Content-Type", "application/json");
    //     return headers;
    // },
});

type ErrorResponse = | string | { title: string } | { errors: string[] }

// This is a custom base query that adds a delay to simulate a slow network
// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {

    //  loading ekranını aç
    // api.dispatch(startLoading());
    // await sleep(1000); // Simulate a slow network
    const result = await customBaseQuery(args, api, extraOptions);
    // loading ekranını kapat
    // api.dispatch(stopLoading());
    if (result.error) {
        console.error("Error:", result.error);

        const responseData = result.error.data as ErrorResponse;

        switch (result.error.status) {
            case 400:
                // Handle bad request error
                if (typeof responseData === "string") {
                    toast.error("Bad Request: " + responseData);
                } else if ('errors' in responseData) {
                    throw Object.values(responseData.errors).flat().join(", ");
                } else {
                    toast.error(responseData.title);
                }
                break;
            case 401:
                // Handle unauthorized error
                if (typeof responseData === 'object' && 'title' in responseData) {
                    toast.error(responseData.title);
                }
                break;
            case 403:
                // Handle forbidden error
                if (typeof responseData === 'object' && 'title' in responseData) {
                    toast.error(responseData.title);
                }
                break;
            case 404:
                // Handle not found error
                if (typeof responseData === 'object' && 'title' in responseData) {
                    import("../routes/Router").then(({ router }) => {
                        router.navigate("/not-found");
                    });
                }
                break;
            case 500:
                // Handle internal server error
                if (typeof responseData === 'object' && 'title' in responseData) {
                    import("../routes/Router").then(({ router }) => {
                        router.navigate("/server-error", { state: { error: responseData } });
                    });
                }
                break;
            default:
                // Handle other errors
                toast.error("An error occurred: " + responseData);
                break;
        }
    }

    return result;
}

