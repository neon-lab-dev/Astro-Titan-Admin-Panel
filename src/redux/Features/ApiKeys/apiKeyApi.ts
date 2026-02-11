import { baseApi } from "../../API/baseApi";

const apiKeyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllApiKeys: builder.query({
      query: () => {
        return {
          url: `/apiKeys`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["apiKeys"],
    }),

    addApiKey: builder.mutation<any, any>({
      query: (data) => ({
        url: `/apiKeys/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["apiKeys"],
    }),

    deleteApiKey: builder.mutation<any, string>({
      query: (id) => ({
        url: `/apiKeys/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["apiKeys"],
    }),
  }),
});

export const {
  useGetAllApiKeysQuery,
  useAddApiKeyMutation,
  useDeleteApiKeyMutation,
} = apiKeyApi;
