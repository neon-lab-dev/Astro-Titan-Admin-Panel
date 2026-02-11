import { baseApi } from "../../API/baseApi";

const recipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecipies: builder.query({
      query: () => {
        return {
          url: `/recipe`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["recipe"],
    }),

    getSingleRecipe: builder.query({
      query: (id) => ({
        url: `/recipe/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["recipe"],
    }),

    addRecipe: builder.mutation<any, any>({
      query: (data) => ({
        url: `/recipe/add-recipe`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["recipe"],
    }),

    deleteRecipe: builder.mutation<any, string>({
      query: (id) => ({
        url: `/recipe/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["recipe"],
    }),

    updateRecipe: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/recipe/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["recipe"],
    }),
  }),
});

export const {
  useGetAllRecipiesQuery,
  useGetSingleRecipeQuery,
  useAddRecipeMutation,
  useDeleteRecipeMutation,
  useUpdateRecipeMutation,
} = recipeApi;
