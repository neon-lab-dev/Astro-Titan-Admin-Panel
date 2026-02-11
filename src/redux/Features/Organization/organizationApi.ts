import { baseApi } from "../../API/baseApi";

const organizationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrganization: builder.query({
      query: ({ keyword, category }) => {
        const params: Record<string, any> = {};

        if (keyword) params.keyword = keyword;
        if (category && category !== "all") params.category = category;

        return {
          url: `/organization`,
          method: "GET",
          credentials: "include",
          params,
        };
      },
      providesTags: ["organization"],
    }),

    getSingleOrganization: builder.query({
      query: (id) => ({
        url: `/organization/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["organization"],
    }),

    addOrganization: builder.mutation<any, any>({
      query: (data) => ({
        url: `/organization/add-organization`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["organization"],
    }),

    deleteOrganization: builder.mutation<any, string>({
      query: (id) => ({
        url: `/organization/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["organization"],
    }),

    updateOrganization: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/organization/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["organization"],
    }),
  }),
});

export const {
  useGetAllOrganizationQuery,
  useGetSingleOrganizationQuery,
  useAddOrganizationMutation,
  useDeleteOrganizationMutation,
  useUpdateOrganizationMutation,
} = organizationApi;
