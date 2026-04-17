import { baseApi } from "../../API/baseApi";

const accountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    suspendAccount: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/account/suspend/${userId}`,
        body: data,
        method: "PATCH",
      }),
      invalidatesTags: ["account", "astrologer", "user"],
    }),

    activeAccount: builder.mutation({
      query: (userId) => ({
        url: `/account/active/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["account", "astrologer", "user"],
    }),
  }),
});

export const { useSuspendAccountMutation, useActiveAccountMutation } = accountApi;
