/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const pujaApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPuja: builder.query<
            any,
            {
                skip?: number;
                category?: string;
                keyword?: string;
                page?: number;
                limit?: number;
            }
        >({
            query: ({
                category = "",
                keyword = "",
                page = 1,
                limit = 10,
                skip,
            } = {}) => {
                const params = new URLSearchParams();

                if (category) params.append("category", category);
                if (keyword) params.append("keyword", keyword);
                params.append("page", page.toString());
                params.append("limit", limit.toString());
                if (typeof skip === "number") params.append("skip", skip.toString());

                return {
                    url: `/puja?${params.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["puja"],
        }),

        getSinglePujaById: builder.query({
            query: (id) => ({
                url: `/puja/${id}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["puja"],
        }),

        addPuja: builder.mutation<any, any>({
            query: (data) => ({
                url: `/puja/add`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["puja"],
        }),

        updatePuja: builder.mutation<any, any>({
            query: ({ id, data }) => ({
                url: `/puja/update/${id}`,
                method: "PATCH",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["puja"],
        }),
        
        deletePuja: builder.mutation<any, string>({
            query: (id) => ({
                url: `/puja/delete/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["puja"],
        }),
    }),
});

export const {
    useGetAllPujaQuery,
    useGetSinglePujaByIdQuery,
    useAddPujaMutation,
    useUpdatePujaMutation,
    useDeletePujaMutation
} = pujaApi;
