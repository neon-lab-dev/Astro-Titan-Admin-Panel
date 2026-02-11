import { baseApi } from "../../API/baseApi";

const reelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReels: builder.query({
      query: () => {
        return {
          url: `/reels`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["reels"],
    }),

    getSingleReel: builder.query({
      query: (id) => ({
        url: `/reels/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["reels"],
    }),

    addReel: builder.mutation<any, any>({
      query: (data) => ({
        url: `/reels/add-reel`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["reels"],
    }),

    deleteReel: builder.mutation<any, string>({
      query: (id) => ({
        url: `/reels/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["reels"],
    }),

    updateReel: builder.mutation<any, any>({
      query: ({id, data}) => ({
        url: `/reels/${id}`,
        method: "PUT",
        body : data,
        credentials: "include",
      }),
      invalidatesTags: ["reels"],
    }),
  }),
});

export const {
  useGetAllReelsQuery,
  useGetSingleReelQuery,
  useAddReelMutation,
  useDeleteReelMutation,
  useUpdateReelMutation,
} = reelsApi;
