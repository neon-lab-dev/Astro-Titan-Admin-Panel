import { baseApi } from "../../API/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllUsers: builder.query({
      query: () => {
        return {
          url: `/user`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["users"],
    }),

    getSingleUserById: builder.query({
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["users"],
    }),


    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),

    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),

    forgotPassword: builder.mutation({
      query: (forgotPasswordData) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: forgotPasswordData,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),

    resetPassword: builder.mutation({
      query: ({resetPasswordData, token}) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body: resetPasswordData,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),

    changeUserRole: builder.mutation({
      query: (data) => ({
        url: `/auth/change-role`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),

    assignPages: builder.mutation({
      query: (data) => ({
        url: `/auth/assign-pages`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/remove-user/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),


  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserByIdQuery,
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangeUserRoleMutation,
  useAssignPagesMutation,
  useDeleteUserMutation,
} = authApi;
