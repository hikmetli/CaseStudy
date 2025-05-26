import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../baseApi";
import type { Transaction, TransactionParams, TransactionSummary, TransactionUpdateModel } from "../../models/transaction";
import type { CreateTransactionSchema } from "@/schemas/transactionFormSchema";
import { filterEmptyValues } from "@/lib/utils";


export const transactionApi = createApi({
    reducerPath: "transactionApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["Transaction"],
    endpoints: (builder) => ({
        getAllTransactions: builder.query<Transaction[], TransactionParams>({
            query: (params) => ({
                url: "/transaction",
                method: 'GET',
                params: filterEmptyValues(params)

            }),
            providesTags: ["Transaction"]
        }),
        getTransactionSummary: builder.query<TransactionSummary[], void>({
            query: () => ({
                url: "/transaction/summary",
                method: 'GET'
            }),
            providesTags: ["Transaction"]
        }),
        getTransaction: builder.query<Transaction, number>({
            query: (id) => ({
                url: `/transaction/${id}`,
                method: 'GET'
            })
        }),
        deleteTransaction: builder.mutation<void, number>({
            query: (id) => ({
                url: `/transaction/${id}`,
                method: 'DELETE'
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(transactionApi.util.invalidateTags(["Transaction"]));

                } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateTransaction: builder.mutation<void, TransactionUpdateModel>({
            query: (transaction) => ({
                url: `/transaction`,
                method: "PUT",
                body: transaction
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(transactionApi.util.invalidateTags(["Transaction"]));

                } catch (error) {
                    console.log(error);
                }
            }

        }),
        createTransaction: builder.mutation<Transaction, CreateTransactionSchema>({
            query: (transaction) => ({
                url: `/transaction`,
                method: "POST",
                body: transaction
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(transactionApi.util.invalidateTags(["Transaction"]));

                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
})

export const { useGetAllTransactionsQuery, useLazyGetAllTransactionsQuery, useGetTransactionQuery, useDeleteTransactionMutation, useUpdateTransactionMutation, useCreateTransactionMutation, useGetTransactionSummaryQuery } = transactionApi;