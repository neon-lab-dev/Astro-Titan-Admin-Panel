import { baseApi } from "../../API/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query<any, { keyword?: string }>({
      query: ({ keyword = "" }) => {
        return {
          url: `/books?keyword=${encodeURIComponent(keyword)}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["books"],
    }),

    getSingleBook: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["books"],
    }),

    createBook: builder.mutation<any, any>({
      query: (data) => ({
        url: `/books/create-book`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["books"],
    }),

    deleteBook: builder.mutation<
      any,
      { id: string }
    >({
      query: ({id}) => ({
        url: `/books/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["books"],
    }),

    updateBook: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/books/update/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = bookApi;
