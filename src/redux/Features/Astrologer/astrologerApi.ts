/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const astrologerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAstrologers: builder.query<
      any,
      {
        skip?: number;
        identityStatus?: string;
        country?: string;
        keyword?: string;
        page?: number;
        limit?: number;
        hasAppliedForUnlock?: string;
      }
    >({
      query: ({
        identityStatus = "",
        country = "",
        keyword = "",
        page = 1,
        limit = 10,
        skip,
      } = {}) => {
        const params = new URLSearchParams();

        if (identityStatus) params.append("identityStatus", identityStatus);
        if (country) params.append("country", country);
        if (keyword) params.append("keyword", keyword);
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (typeof skip === "number") params.append("skip", skip.toString());

        return {
          url: `/astrologer?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["astrologer"],
    }),

    getSingleAstrologer: builder.query({
      query: (id) => ({
        url: `/astrologer/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["astrologer"],
    }),

    addCourse: builder.mutation<any, any>({
      query: (data) => ({
        url: `/course/add-course`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["course"],
    }),

    deleteCourse: builder.mutation<any, string>({
      query: (id) => ({
        url: `/course/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["course"],
    }),

    updateCourse: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useGetAllAstrologersQuery,
  useGetSingleAstrologerQuery,
  useAddCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = astrologerApi;
