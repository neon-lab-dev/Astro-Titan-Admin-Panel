import { baseApi } from "../../API/baseApi";

const productBannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductBanners: builder.query({
      query: () => ({
        url: `/product-banner`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["productBanner"],
    }),

    getSingleProductBanner: builder.query({
      query: (id) => ({
        url: `/product-banner/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["productBanner"],
    }),

    addProductBanner: builder.mutation<any, any>({
      query: (data) => ({
        url: `/product-banner/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["productBanner"],
    }),

    updateProductBanner: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/product-banner/update/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["productBanner"],
    }),

    deleteProductBanner: builder.mutation<any, any>({
      query: (id) => ({
        url: `/product-banner/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["productBanner"],
    }),
  }),
});

export const {
  useGetAllProductBannersQuery,
  useGetSingleProductBannerQuery,
  useAddProductBannerMutation,
  useUpdateProductBannerMutation,
  useDeleteProductBannerMutation,
} = productBannerApi;
