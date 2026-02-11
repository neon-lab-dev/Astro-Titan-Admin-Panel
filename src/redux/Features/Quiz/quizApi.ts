import { baseApi } from "../../API/baseApi";

const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuizzes: builder.query({
      query: () => {
        return {
          url: `/quiz`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["quiz"],
    }),

    getSingleQuiz: builder.query({
      query: (id) => ({
        url: `/quiz/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["quiz"],
    }),

    addQuizManually: builder.mutation<any, any>({
      query: (data) => ({
        url: `/quiz/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["quiz"],
    }),

    addQuizByAI: builder.mutation<any, any>({
      query: (data) => ({
        url: `/ai/generate-quiz`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["quiz"],
    }),

    deleteQuiz: builder.mutation<any, string>({
      query: (id) => ({
        url: `/quiz/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["quiz"],
    }),
  }),
});

export const {
  useGetAllQuizzesQuery,
  useGetSingleQuizQuery,
  useAddQuizManuallyMutation,
  useAddQuizByAIMutation,
  useDeleteQuizMutation,
} = quizApi;
