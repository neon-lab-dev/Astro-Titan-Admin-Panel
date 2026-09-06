/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const pujaBookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPujaBookings: builder.query<
      any,
      {
        skip?: number;
        status?: string;
        method?: string;
        keyword?: string;
        page?: number;
        limit?: number;
        date?: string;
      }
    >({
      query: ({
        status = "",
        method = "",
        keyword = "",
        date = "",
        page = 1,
        limit = 10,
        skip,
      } = {}) => {
        const params = new URLSearchParams();

        if (status) params.append("status", status);
        if (method) params.append("method", method);
        if (date) params.append("date", date);
        if (keyword) params.append("keyword", keyword);
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (typeof skip === "number") params.append("skip", skip.toString());

        return {
          url: `/puja-booking?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["pujaBooking"],
    }),

    updateIdentityStatus: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/astrologer/update-identity-status/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["astrologer"],
    }),
  }),
});

export const {
  useGetAllPujaBookingsQuery,
  useUpdateIdentityStatusMutation,
} = pujaBookingApi;
