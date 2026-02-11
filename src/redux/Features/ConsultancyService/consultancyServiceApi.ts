import { baseApi } from "../../API/baseApi";

const consultancyServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAlConsultancyServices: builder.query({
      query: ({ keyword, category }) => ({
        url: `/consultancyService`,
        method: "GET",
        credentials: "include",
        params: {
          keyword,
          category,
        },
      }),
      providesTags: ["consultancyService"],
    }),

    getSingleConsultancyService: builder.query({
      query: (id) => ({
        url: `/consultancyService/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["consultancyService"],
    }),

    addConsultancyService: builder.mutation<any, any>({
      query: (data) => ({
        url: `/consultancyService/add-consultancy-service`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["consultancyService"],
    }),

    deleteConsultancyService: builder.mutation<any, string>({
      query: (id) => ({
        url: `/consultancyService/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["consultancyService"],
    }),

    updateConsultancyService: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/consultancyService/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["consultancyService"],
    }),
  }),
});

export const {
  useGetAlConsultancyServicesQuery,
  useGetSingleConsultancyServiceQuery,
  useAddConsultancyServiceMutation,
  useDeleteConsultancyServiceMutation,
  useUpdateConsultancyServiceMutation,
} = consultancyServiceApi;
