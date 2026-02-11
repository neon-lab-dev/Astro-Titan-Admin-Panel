import { baseApi } from "../../API/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, { keyword?: string; category?: string }>(
      {
        query: ({ keyword = "", category }) => {
          let queryStr = `?keyword=${encodeURIComponent(keyword)}`;
          if (category) {
            queryStr += `&category=${encodeURIComponent(category)}`;
          }
          return {
            url: `/product${queryStr}`,
            method: "GET",
            credentials: "include",
          };
        },
        providesTags: ["product"],
      }
    ),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["product"],
    }),

    addProduct: builder.mutation<any, any>({
      query: (data) => ({
        url: `/product/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/product/update/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation<any,  any >({
      query: (id ) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
