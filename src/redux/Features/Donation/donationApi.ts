import { baseApi } from "../../API/baseApi";

const donationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDonations: builder.query({
      query: (params) => {
        let queryStr = "";
        if (params) {
          const queryParams = new URLSearchParams();
          if (params.keyword) queryParams.append("keyword", params.keyword);
          queryStr = `?${queryParams.toString()}`;
        }
        return {
          url: `/donation${queryStr}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["donation"],
    }),

    getSingleDonation: builder.query({
      query: (id) => ({
        url: `/donation/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["donation"],
    }),

    deleteDonation: builder.mutation({
      query: (id) => ({
        url: `/donation/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["donation"],
    }),
  }),
});

export const {
  useGetAllDonationsQuery,
  useGetSingleDonationQuery,
  useDeleteDonationMutation,
} = donationApi;
