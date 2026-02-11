import { baseApi } from "../../API/baseApi";

const templeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTemple: builder.query({
      query: () => ({
        url: `/temple`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["temple"],
    }),

    getSingleTemple: builder.query({
      query: (id) => ({
        url: `/temple/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["temple"],
    }),

    addTemple: builder.mutation<any, any>({
      query: (data) => ({
        url: `/temple/add-temple`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["temple"],
    }),

    addEvent: builder.mutation<any, any>({
      query: ({data, id}) => ({
        url: `/temple/${id}/events`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["temple"],
    }),

    deleteTemple: builder.mutation<any, string>({
      query: (id) => ({
        url: `/temple/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["temple"],
    }),

    deleteEvent: builder.mutation<any, any>({
      query: ({id, eventId}) => ({
        url: `/temple/${id}/events/${eventId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["temple"],
    }),

    updateTemple: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/temple/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["temple"],
    }),

    approveTemple: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/temple/update-status/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["temple"],
    }),
  }),
});

export const {
  useGetAllTempleQuery,
  useGetSingleTempleQuery,
  useAddTempleMutation,
  useAddEventMutation,
  useDeleteTempleMutation,
  useDeleteEventMutation,
  useUpdateTempleMutation,
  useApproveTempleMutation,
} = templeApi;
