import { baseApi } from "../../API/baseApi";

const vastuTipsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVastuTips: builder.query({
      query: () => ({
        url: `/vastuTips`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["vastuTips"],
    }),

    getSingleVastuTips: builder.query({
      query: (id) => ({
        url: `/vastuTips/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["vastuTips"],
    }),

    addVastuTips: builder.mutation<any, any>({
      query: (data) => ({
        url: `/vastuTips/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["vastuTips"],
    }),

    deleteVastuTips: builder.mutation<any, string>({
      query: (id) => ({
        url: `/vastuTips/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["vastuTips"],
    }),

    updateVastuTips: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/vastuTips/update/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["vastuTips"],
    }),
  }),
});

export const {
  useGetAllVastuTipsQuery,
  useGetSingleVastuTipsQuery,
  useAddVastuTipsMutation,
  useDeleteVastuTipsMutation,
  useUpdateVastuTipsMutation,
} = vastuTipsApi;
