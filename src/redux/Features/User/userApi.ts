/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      any,
      {
        skip?: number;
        identityStatus?: string;
        country?: string;
        keyword?: string;
        page?: number;
        limit?: number;
        hasAppliedForUnlock?: string;
      }
    >({
      query: ({
        identityStatus = "",
        country = "",
        keyword = "",
        page = 1,
        limit = 10,
        skip,
      } = {}) => {
        const params = new URLSearchParams();

        if (identityStatus) params.append("identityStatus", identityStatus);
        if (country) params.append("country", country);
        if (keyword) params.append("keyword", keyword);
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (typeof skip === "number") params.append("skip", skip.toString());

        return {
          url: `/user?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["user"],
    }),

    getSingleUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserByIdQuery,
} = userApi;
