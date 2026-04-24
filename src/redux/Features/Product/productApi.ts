/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      any,
      {
        category?: string;
        keyword?: string;
        skip?: number;
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
          url: `/product?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["product"],
    }),

    getSingleProductById: builder.query({
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
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation<any, string>({
      query: (id) => ({
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
  useGetSingleProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
