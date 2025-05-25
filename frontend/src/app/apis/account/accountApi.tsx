import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../baseApi";
import type { Account } from "../../models/account";
import type { CreateAccountSchema } from "@/schemas/accountFormSchema";


export const accountApi = createApi({
    reducerPath: "accountApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["Account"],
    endpoints: (builder) => ({
        getAllAccounts: builder.query<Account[], void>({
            query: () => ({
                url: "/account",
                method: 'GET'
            }),
            providesTags: ["Account"]
        }),
        getAccount: builder.query<Account, number>({
            query: (id) => ({
                url: `/account/${id}`,
                method: 'GET'
            })
        }),
        deleteAccount: builder.mutation<void, number>({
            query: (id) => ({
                url: `/account/${id}`,
                method: 'DELETE'
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(["Account"]));

                } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateAccount: builder.mutation<void, Account>({
            query: (account) => ({
                url: `/account`,
                method: "PUT",
                body: account
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(["Account"]));

                } catch (error) {
                    console.log(error);
                }
            }

        }),
        createAccount: builder.mutation<Account, CreateAccountSchema>({
            query: (account) => ({
                url: `/account`,
                method: "POST",
                body: account
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(["Account"]));

                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
})

export const { useGetAllAccountsQuery, useLazyGetAllAccountsQuery, useGetAccountQuery, useDeleteAccountMutation, useUpdateAccountMutation, useCreateAccountMutation } = accountApi;