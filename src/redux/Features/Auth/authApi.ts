import { baseApi } from "../../API/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    login: builder.mutation({
      query: (userInfo) => ({
        url: "/account/admin/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),

    forgotPassword: builder.mutation({
      query: (forgotPasswordData) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: forgotPasswordData,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    resetPassword: builder.mutation({
      query: ({ resetPasswordData, token }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body: resetPasswordData,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    // changeUserRole: builder.mutation({
    //   query: (data) => ({
    //     url: `/auth/change-role`,
    //     method: "PUT",
    //     body: data,
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["users"],
    // }),

    // assignPages: builder.mutation({
    //   query: (data) => ({
    //     url: `/auth/assign-pages`,
    //     method: "PUT",
    //     body: data,
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["users"],
    // }),

    // deleteUser: builder.mutation({
    //   query: (id) => ({
    //     url: `/user/remove-user/${id}`,
    //     method: "DELETE",
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["users"],
    // }),


  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
