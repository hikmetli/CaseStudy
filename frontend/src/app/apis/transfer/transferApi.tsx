import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../baseApi";
import type { Transfer } from "../../models/transfer";
import type { TransferWithIbanSchema, TransferWithIdSchema } from "@/schemas/transferFormSchema";


export const transferApi = createApi({
    reducerPath: "transferApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["Transfer"],
    endpoints: (builder) => ({
        getAllTransfers: builder.query<Transfer[], void>({
            query: () => ({
                url: "/transfer",
                method: 'GET'
            }),
            providesTags: ["Transfer"]
        }),
        getTransfer: builder.query<Transfer, number>({
            query: (id) => ({
                url: `/transfer/${id}`,
                method: 'GET'
            })
        }),
        deleteTransfer: builder.mutation<void, number>({
            query: (id) => ({
                url: `/transfer/${id}`,
                method: 'DELETE'
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(transferApi.util.invalidateTags(["Transfer"]));

                } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateTransfer: builder.mutation<void, Transfer>({
            query: (transfer) => ({
                url: `/transfer`,
                method: "PUT",
                body: transfer
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(transferApi.util.invalidateTags(["Transfer"]));

                } catch (error) {
                    console.log(error);
                }
            }

        }),
        createTransfer: builder.mutation<Transfer, TransferWithIdSchema>({
            query: (transfer) => ({
                url: `/transfer`,
                method: "POST",
                body: transfer
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(transferApi.util.invalidateTags(["Transfer"]));

                } catch (error) {
                    console.log(error);
                }
            }
        }),
        createTransferWithIban: builder.mutation<Transfer, TransferWithIbanSchema>({
            query: (transfer) => ({
                url: `/transfer/with-iban`,
                method: "POST",
                body: transfer
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(transferApi.util.invalidateTags(["Transfer"]));
                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
})

export const { useGetAllTransfersQuery, useLazyGetAllTransfersQuery, useGetTransferQuery, useDeleteTransferMutation, useUpdateTransferMutation, useCreateTransferMutation, useCreateTransferWithIbanMutation } = transferApi;