import { baseQueryWithErrorHandling } from "../baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";
import { type RegisterSchema, type SignInSchema, type UpdateUserRequest } from "../../../schemas/userFormSchemas";
import { type User } from "../../../app/models/user";
import { router } from "@/app/routes/Router";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["UserInfo"],
    endpoints: (builder) => ({
        login: builder.mutation<void, SignInSchema>({
            query: (body) => ({
                "url": '/login?useCookies=true',
                method: "POST",
                body
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(userApi.util.invalidateTags(["UserInfo"]));
                }
                catch (error) {
                    console.log(error);
                }
            }
        }),
        register: builder.mutation<User, RegisterSchema>({
            query: (body) => ({
                url: "/account/register",
                method: "POST",
                body
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'account/logout',
                method: 'POST'
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(userApi.util.invalidateTags(["UserInfo"]));
                    router.navigate('/');
                }
                catch (error) {
                    console.log(error);
                }
            }
        }),
        userInfo: builder.query<User, void>({
            query: () => ({
                url: 'account/user-info',
                method: 'GET'
            }),
            providesTags: ["UserInfo"]
        }),
        updateUser: builder.mutation<User, UpdateUserRequest>({
            query: (body) => ({
                url: "account/updateUser",
                method: "PUT",
                body
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(userApi.util.invalidateTags(["UserInfo"]));
                    router.navigate('/');
                }
                catch (error) {
                    console.log(error);
                }
            }
        })
    })
});

export const { useLoginMutation, useRegisterMutation, useUserInfoQuery, useLogoutMutation, useUpdateUserMutation } = userApi;