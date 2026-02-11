import { baseApi } from "../../API/baseApi";

const consultationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllConsultations: builder.query({
      query: (params) => {
        let queryStr = "";
        if (params) {
          const queryParams = new URLSearchParams();
          if (params.keyword) queryParams.append("keyword", params.keyword);
          if (params.category) queryParams.append("category", params.category);
          if (params.status) queryParams.append("status", params.status);
          queryStr = `?${queryParams.toString()}`;
        }
        return {
          url: `/consultation${queryStr}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["consultation"],
    }),

    getSingleConsultation: builder.query({
      query: (id) => ({
        url: `/consultation/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["consultation"],
    }),

    scheduleConsultation: builder.mutation({
      query: ({ data, id }) => ({
        url: `/consultation/schedule/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["consultation"],
    }),

    updateConsultationStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/consultation/update-status/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["consultation"],
    }),

    deleteConsultation: builder.mutation({
      query: (id) => ({
        url: `/consultation/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["consultation"],
    }),
  }),
});

export const {
  useGetAllConsultationsQuery,
  useGetSingleConsultationQuery,
  useScheduleConsultationMutation,
  useUpdateConsultationStatusMutation,
  useDeleteConsultationMutation,
} = consultationApi;
