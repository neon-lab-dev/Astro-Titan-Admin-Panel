/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const consultationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllConsultations: builder.query<
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
          url: `/consultation?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["consultation"],
    }),

    getSingleAstrologer: builder.query({
      query: (id) => ({
        url: `/astrologer/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["astrologer"],
    }),

    // addCourse: builder.mutation<any, any>({
    //   query: (data) => ({
    //     url: `/course/add-course`,
    //     method: "POST",
    //     body: data,
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["course"],
    // }),

    // deleteCourse: builder.mutation<any, string>({
    //   query: (id) => ({
    //     url: `/course/${id}`,
    //     method: "DELETE",
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["course"],
    // }),

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
  useGetAllConsultationsQuery,
  useGetSingleAstrologerQuery,
  useUpdateIdentityStatusMutation,
} = consultationApi;
