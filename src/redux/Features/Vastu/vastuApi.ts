import { baseApi } from "../../API/baseApi";

const vastuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVastu: builder.query({
      query: () => ({
        url: `/vastu`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["vastu"],
    }),

    getSingleVastu: builder.query({
      query: (id) => ({
        url: `/vastu/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["vastu"],
    }),

    addVastu: builder.mutation<any, any>({
      query: (data) => ({
        url: `/vastu/add-vastu`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["vastu"],
    }),

    deleteVastu: builder.mutation<any, string>({
      query: (id) => ({
        url: `/vastu/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["vastu"],
    }),

    updateVastu: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/vastu/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["vastu"],
    }),
  }),
});

export const {
  useGetAllVastuQuery,
  useGetSingleVastuQuery,
  useAddVastuMutation,
  useDeleteVastuMutation,
  useUpdateVastuMutation,
} = vastuApi;
