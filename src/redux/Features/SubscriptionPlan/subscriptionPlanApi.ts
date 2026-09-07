/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const subscriptionPlanApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSubscriptionPlans: builder.query<
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
                    url: `/subscription-plan/all?${params.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["subscriptionPlan"],
        }),

        getSingleSubscriptionPlanById: builder.query({
            query: (id) => ({
                url: `/subscription-plan/${id}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["subscriptionPlan"],
        }),

        createSubscriptionPlan: builder.mutation<any, any>({
            query: (data) => ({
                url: `/subscription-plan/create`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["subscriptionPlan"],
        }),

        updateSubscriptionPlan: builder.mutation<any, any>({
            query: ({ id, data }) => ({
                url: `/subscription-plan/update/${id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["subscriptionPlan"],
        }),

        toggleChangeStatus: builder.mutation<any, any>({
            query: (id) => ({
                url: `/subscription-plan/toggle-status/${id}`,
                method: "PATCH",
                credentials: "include",
            }),
            invalidatesTags: ["subscriptionPlan"],
        }),
    }),
});

export const {
    useGetAllSubscriptionPlansQuery,
    useGetSingleSubscriptionPlanByIdQuery,
    useCreateSubscriptionPlanMutation,
    useUpdateSubscriptionPlanMutation,
    useToggleChangeStatusMutation,
} = subscriptionPlanApi;
