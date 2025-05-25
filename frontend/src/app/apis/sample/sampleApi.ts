import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../baseApi";
import type { Sample } from "../../models/sample";
import type { CreateSampleSchema } from "@/schemas/sampleFormSchema";


export const sampleApi = createApi({
    reducerPath: "sampleApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["Sample"],
    endpoints: (builder) => ({
        getAllSamples: builder.query<Sample[], void>({
            query: () => ({
                url: "/sample",
                method: 'GET'
            }),
            providesTags: ["Sample"]
        }),
        getSample: builder.query<Sample, number>({
            query: (id) => ({
                url: `/sample/${id}`,
                method: 'GET'
            })
        }),
        deleteSample: builder.mutation<void, number>({
            query: (id) => ({
                url: `/sample/${id}`,
                method: 'DELETE'
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(sampleApi.util.invalidateTags(["Sample"]));

                } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateSample: builder.mutation<void, Sample>({
            query: (sample) => ({
                url: `/sample`,
                method: "PUT",
                body: sample
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(sampleApi.util.invalidateTags(["Sample"]));

                } catch (error) {
                    console.log(error);
                }
            }

        }),
        createSample: builder.mutation<Sample, CreateSampleSchema>({
            query: (sample) => ({
                url: `/sample`,
                method: "POST",
                body: sample
            })
        })
    })
})

export const { useGetAllSamplesQuery, useLazyGetAllSamplesQuery, useGetSampleQuery, useDeleteSampleMutation, useUpdateSampleMutation, useCreateSampleMutation } = sampleApi;