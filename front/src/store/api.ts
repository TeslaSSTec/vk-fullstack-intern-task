import {createApi, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {catsDto, createLikeDto, favoriteCatsDto, userCredentialsDto, userDataDto} from "./dto.ts";

const baseUrl = import.meta.env.DEV ? `${location.protocol}//${location.hostname}:8080/api/` : "/api/";

export function isFetchBaseQueryError(
    error: unknown,
): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
}

export const getToken = (): string => {
    return localStorage.getItem("Token") ?? ""
}
export const setToken = (token: string): void => {
    localStorage.setItem("Token", token)
}

export const Api = createApi({
    reducerPath: 'Api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${getToken()}`)
        }
    }),
    tagTypes: ["User", "Likes"],
    endpoints: (builder) => ({
        getUserData: builder.query<userDataDto, void>({
            query: () => "user/",
            providesTags: ["User"]
        }),
        auth: builder.mutation<void, userCredentialsDto>({
            query: (creds) => ({
                url: "user/auth/",
                method: "POST",
                body: creds
            }),
            transformResponse: (_, meta) => {
                setToken(meta?.response?.headers.get("X-Auth-Token") ?? "")
                return
            },
            invalidatesTags: ["User", "Likes"]
        }),
        createUser: builder.mutation<void, userCredentialsDto>({
            query: (creds) => ({
                url: "user/",
                method: "POST",
                body: creds
            }),
            transformResponse: (_, meta) => {
                setToken(meta?.response?.headers.get("X-Auth-Token") ?? "")
                return
            },
            invalidatesTags: ["User", "Likes"]
        }),
        getLikes: builder.query<{ data: favoriteCatsDto[] }, void>({
            query: () => ({
                url: "likes/",
                method: "GET",
            }),
            providesTags: ["Likes"]
        }),
        createLike: builder.mutation<void, createLikeDto>({
            query: (like) => ({
                url: "likes/",
                method: "POST",
                body: like
            }),
            invalidatesTags: ["Likes"]
        }),
        deleteLike: builder.mutation<void, string>({
            query: (cat_id) => ({
                url: `likes/${cat_id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Likes"]
        }),
    }),
})

export const {
    useGetUserDataQuery,
    useAuthMutation,
    useCreateUserMutation,
    useGetLikesQuery,
    useCreateLikeMutation,
    useDeleteLikeMutation
} = Api

export const TheCatApi = createApi({
    reducerPath: 'TheCatApi',
    baseQuery: fetchBaseQuery(),
    endpoints: (builder) => ({
        getCats: builder.mutation<catsDto[], void>({
            query: () => "https://api.thecatapi.com/v1/images/search?limit=100",
        }),
    }),
})

export const {useGetCatsMutation} = TheCatApi