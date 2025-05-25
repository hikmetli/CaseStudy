import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../baseApi";


export const errorApi = createApi({
    reducerPath: "errorApi",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        get400Error: builder.query({
            query: () => "buggy/bad-request",
        }),
        get401Error: builder.query({
            query: () => "buggy/unauthorized",
        }),
        get404Error: builder.query({
            query: () => "buggy/not-found",
        }),
        get500Error: builder.query({
            query: () => "buggy/server-error",
        }),
        getValidationError: builder.query({
            query: () => "buggy/validation-error",
        }),
    }),
});


export const {
    useLazyGet400ErrorQuery,
    useLazyGet401ErrorQuery,
    useLazyGet404ErrorQuery,
    useLazyGet500ErrorQuery,
    useLazyGetValidationErrorQuery,
} = errorApi;