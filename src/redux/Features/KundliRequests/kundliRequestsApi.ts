/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const kundliRequestsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllKundliRequests: builder.query<
            any,
            {
                requestType?: string;
                keyword?: string;
                skip?: number;
                page?: number;
                limit?: number;
            }
        >({
            query: ({
                requestType = "",
                keyword = "",
                page = 1,
                limit = 10,
                skip,
            } = {}) => {
                const params = new URLSearchParams();

                if (requestType) params.append("requestType", requestType);
                if (keyword) params.append("keyword", keyword);
                params.append("page", page.toString());
                params.append("limit", limit.toString());
                if (typeof skip === "number") params.append("skip", skip.toString());

                return {
                    url: `/kundli-request/all?${params.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["kundliRequests"],
        }),

        getSingleKundliRequestById: builder.query({
            query: (id) => ({
                url: `/kundli-request/${id}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["kundliRequests"],
        }),

        assignAstrologer: builder.mutation<any, any>({
            query: ({id, data}) => ({
                url: `/kundli-request/assign-astrologer/${id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["kundliRequests"],
        }),
    }),
});

export const {
    useGetAllKundliRequestsQuery,
    useGetSingleKundliRequestByIdQuery,
    useAssignAstrologerMutation,
} = kundliRequestsApi;
