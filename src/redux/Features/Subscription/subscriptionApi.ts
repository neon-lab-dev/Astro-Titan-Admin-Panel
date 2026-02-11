import { baseApi } from "../../API/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscriptions: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params?.keyword) {
          queryParams.append("keyword", params.keyword);
        }

        const queryStr = queryParams.toString();
        const url = queryStr ? `/subscription?${queryStr}` : "/subscription";

        return {
          url,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["subscription"],
    }),

    getSingleSubscription: builder.query({
      query: (id) => ({
        url: `/subscription/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["subscription"],
    }),

    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `/subscription/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["subscription"],
    }),

    markUserAsSubscribed: builder.mutation({
      query: (data) => ({
        url: `/subscription/mark-user-as-subscribed`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["subscription"],
    }),

    markUserAsUnSubscribed: builder.mutation({
      query: (data) => ({
        url: `/subscription/mark-user-as-unsubscribed`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["subscription"],
    }),
  }),
});

export const {
  useGetAllSubscriptionsQuery,
  useGetSingleSubscriptionQuery,
  useDeleteSubscriptionMutation,
  useMarkUserAsSubscribedMutation,
  useMarkUserAsUnSubscribedMutation,
} = subscriptionApi;
