/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const astrologerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAstrologers: builder.query<
      any,
      {
        skip?: number;
        city?: string;
        area?: string;
        keyword?: string;
        page?: number;
        limit?: number;
        hasAppliedForUnlock?: string;
      }
    >({
      query: ({
        city = "",
        area = "",
        keyword = "",
        page = 1,
        limit = 10,
        skip,
      } = {}) => {
        const params = new URLSearchParams();

        if (city) params.append("city", city);
        if (area) params.append("area", area);
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
        url: `/course/${id}`,
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
