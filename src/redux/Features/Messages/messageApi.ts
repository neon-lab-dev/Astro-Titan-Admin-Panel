import { baseApi } from "../../API/baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMessages: builder.query({
      query: () => {
        return {
          url: `/contact-us`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["messages"],
    }),

    getSingleMessage: builder.query({
      query: (id) => ({
        url: `/emergency/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["messages"],
    }),

  }),
});

export const {
  useGetAllMessagesQuery,
  useGetSingleMessageQuery
} = messageApi;
