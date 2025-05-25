import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../baseApi";
import { type Category } from "@/app/models/category";


export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => ({
                url: "/category",
                method: "GET"
            })
        })
    })
})

export const { useGetCategoriesQuery } = categoryApi;