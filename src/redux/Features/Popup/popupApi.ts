import { baseApi } from "../../API/baseApi";

const popupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPopups: builder.query<any, { keyword?: string }>({
      query: () => {
        return {
          url: `/popup`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["popup"],
    }),

    getSinglePopup: builder.query({
      query: (id) => ({
        url: `/popup/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["popup"],
    }),

    sendPopup: builder.mutation<any, any>({
      query: (data) => ({
        url: `/popup/add-popup`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["popup"],
    }),

    deletePopup: builder.mutation<any, string>({
      query: (id) => ({
        url: `/popup/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["popup"],
    }),

    updatePopup: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/popup/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["popup"],
    }),
  }),
});

export const {
  useGetAllPopupsQuery,
  useGetSinglePopupQuery,
  useSendPopupMutation,
  useDeletePopupMutation,
  useUpdatePopupMutation,
} = popupApi;
