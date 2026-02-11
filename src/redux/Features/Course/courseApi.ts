import { baseApi } from "../../API/baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAlCourses: builder.query({
      query: ({ keyword, category }) => ({
        url: `/course`,
        method: "GET",
        credentials: "include",
        params: {
          keyword,
          category,
        },
      }),
      providesTags: ["course"],
    }),

    getSingleCourse: builder.query({
      query: (id) => ({
        url: `/course/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["course"],
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
  useGetAlCoursesQuery,
  useGetSingleCourseQuery,
  useAddCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = courseApi;
