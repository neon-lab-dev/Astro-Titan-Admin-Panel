import { baseApi } from "../../API/baseApi";

const dailyHoroscopeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllDailyHoroscopes: builder.query({
      query: (params) => {
        let queryStr = "";
        if (params) {
          const queryParams = new URLSearchParams();
          if (params.keyword) queryParams.append("keyword", params.keyword);
          queryStr = `?${queryParams.toString()}`;
        }
        return {
          url: `/dailyHoroscope${queryStr}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["dailyHoroscope"],
    }),

    getSingleDailyHoroscope: builder.query({
      query: (id) => ({
        url: `/dailyHoroscope/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["dailyHoroscope"],
    }),

    addDailyHoroscope: builder.mutation({
      query: (data) => ({
        url: `/dailyHoroscope/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["dailyHoroscope"],
    }),

    updateDailyHoroscope: builder.mutation({
      query: ({ data, id }) => ({
        url: `/dailyHoroscope/update/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["dailyHoroscope"],
    }),

    deleteDailyHoroscope: builder.mutation({
      query: (id) => ({
        url: `/dailyHoroscope/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["dailyHoroscope"],
    }),
  }),
});

export const {
  useGetAllDailyHoroscopesQuery,
  useGetSingleDailyHoroscopeQuery,
  useAddDailyHoroscopeMutation,
  useUpdateDailyHoroscopeMutation,
  useDeleteDailyHoroscopeMutation,
} = dailyHoroscopeApi;
