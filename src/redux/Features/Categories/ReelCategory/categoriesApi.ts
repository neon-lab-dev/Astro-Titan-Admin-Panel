/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../../API/baseApi";


const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
  query: ({ keyword = "", category = "" }: { keyword?: string; category?: string }) => {
    const params = new URLSearchParams();

    if (keyword.trim()) params.append("keyword", keyword);
    if (category.trim()) params.append("category", category);

    return {
      url: `/category?${params.toString()}`,
      method: "GET",
      credentials: "include",
    };
  },
  providesTags: ["category"],
}),


    getSingleCategory: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["category"],
    }),

    addCategory: builder.mutation<any, any>({
      query: (data) => ({
        url: `/category/add-category`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["category"],
    }),

    deleteCategory: builder.mutation<any, string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
