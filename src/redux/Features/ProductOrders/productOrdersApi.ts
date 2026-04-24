import { baseApi } from "../../API/baseApi";

const productOrdersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductOrders: builder.query({
      query: ({
        keyword,
        status,
        page = 1,
        limit = 10,
        skip,
      }: {
        keyword?: string;
        status?: string;
        skip?: number;
        page?: number;
        limit?: number;
      }) => {
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);
        if (status) params.append("status", status);
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (typeof skip === "number") params.append("skip", skip.toString());

        return {
          url: `/product-order${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["productOrder"],
    }),

    getSingleProductOrderById: builder.query({
      query: (id) => ({
        url: `/product-order/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["productOrder"],
    }),

    getMyProductOrders: builder.query({
      query: ({
        keyword,
        page,
        status,
      }: {
        keyword?: string;
        page?: number;
        status?: string;
      }) => {
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);
        if (page) params.append("page", page.toString());
        if (status) params.append("status", status);

        return {
          url: `/product-order/my-orders${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["productOrder"],
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: `/product/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["productOrder"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({id, data}) => ({
        url: `/product-order/update-status/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["productOrder"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["productOrder"],
    }),
  }),
});

export const {
  useGetAllProductOrdersQuery,
  useGetSingleProductOrderByIdQuery,
  useGetMyProductOrdersQuery,
  useAddProductMutation,
  useUpdateOrderStatusMutation,
  useDeleteProductMutation,
} = productOrdersApi;
