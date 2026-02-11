import { baseApi } from "../../API/baseApi";

const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNews: builder.query<any, { keyword?: string; category?: string }>({
      query: ({ keyword = "", category = "" }) => {
        let queryString = `?keyword=${encodeURIComponent(keyword)}`;

        if (category && category.trim() !== "") {
          queryString += `&category=${encodeURIComponent(category)}`;
        }

        return {
          url: `/news${queryString}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["news"],
    }),

    getSingleNews: builder.query({
      query: (id) => ({
        url: `/news/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["news"],
    }),

    addNews: builder.mutation<any, any>({
      query: (data) => ({
        url: `/news/add-news`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["news"],
    }),

    translateNews: builder.mutation<any, any>({
      query: (data) => ({
        url: `/ai/translate-news`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["news"],
    }),

    deleteNews: builder.mutation<any, string>({
      query: (id) => ({
        url: `/news/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["news"],
    }),

    updateNews: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/news/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["news"],
    }),
  }),
});

export const {
  useGetAllNewsQuery,
  useGetSingleNewsQuery,
  useAddNewsMutation,
  useTranslateNewsMutation,
  useDeleteNewsMutation,
  useUpdateNewsMutation,
} = newsApi;
