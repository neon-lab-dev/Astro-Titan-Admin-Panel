import { baseApi } from "../../API/baseApi";

const donationProgramApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDonationPrograms: builder.query({
      query: ({ keyword, category }) => ({
        url: `/donations`,
        method: "GET",
        credentials: "include",
        params: {
          keyword,
          category,
        },
      }),
      providesTags: ["donations"],
    }),

    getSingleDonationPrograms: builder.query({
      query: (id) => ({
        url: `/donations/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["donations"],
    }),

    createDonationProgram: builder.mutation<any, any>({
      query: (data) => ({
        url: `/donations`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["donations"],
    }),

    deleteDonationProgram: builder.mutation<any, string>({
      query: (id) => ({
        url: `/donations/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["donations"],
    }),

    updateDonationProgram: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/donations/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["donations"],
    }),
  }),
});

export const {
  useGetAllDonationProgramsQuery,
  useGetSingleDonationProgramsQuery,
  useCreateDonationProgramMutation,
  useDeleteDonationProgramMutation,
  useUpdateDonationProgramMutation,
} = donationProgramApi;
