import { baseApi } from "../../API/baseApi";

const yogaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     getAdminStats: builder.query({ 
      query: () => {
        return {
          url: `/yoga/admin-stats`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["yoga"],
    }),


    getAllYoga: builder.query({
      query: () => {
        return {
          url: `/yoga`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["yoga"],
    }),

    getSingleYoga: builder.query({
      query: (id) => ({
        url: `/yoga/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["yoga"],
    }),

    addYoga: builder.mutation<any, any>({
      query: (data) => ({
        url: `/yoga/add-yoga`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["yoga"],
    }),

    deleteYoga: builder.mutation<any, string>({
      query: (id) => ({
        url: `/yoga/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["yoga"],
    }),

    updateYoga: builder.mutation<any, any>({
      query: ({id, data}) => ({
        url: `/yoga/${id}`,
        method: "PUT",
        body : data,
        credentials: "include",
      }),
      invalidatesTags: ["yoga"],
    }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetAllYogaQuery,
  useGetSingleYogaQuery,
  useAddYogaMutation,
  useDeleteYogaMutation,
  useUpdateYogaMutation
} = yogaApi;
