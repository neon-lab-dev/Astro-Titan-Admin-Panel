import { baseApi } from "../../API/baseApi";

const bulkSmsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    sendBulkEmail: builder.mutation<any, any>({
      query: (data) => ({
        url: `/bulkSms/send-bulk-email`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["bulkSms"],
    }),

    sendBulkSms: builder.mutation<any, any>({
      query: (data) => ({
        url: `/bulkSms/send-bulk-sms`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["bulkSms"],
    }),
  }),
});

export const {
  useSendBulkEmailMutation,
  useSendBulkSmsMutation
} = bulkSmsApi;
