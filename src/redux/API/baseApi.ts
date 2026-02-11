/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setUser } from "../Features/Auth/authSlice";
import type { RootState } from "../store";
import type { BaseQueryApi, BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import type { DefinitionType } from "@reduxjs/toolkit/query";

export const baseUrl = "https://astro-titan-app-server.onrender.com";
// export const baseUrl = "http://localhost:5000";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/api/v1`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const res = await fetch(`${baseUrl}/api/v1/auth/refresh-token`, {
      credentials: "include",
    });

    const data = await res.json();
    const user = (api.getState() as RootState).auth.user;
    api.dispatch(
      setUser({
        user,
        token: data?.data?.accessToken,
      })
    );
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "messages",
    "users",
    "reels",
    "yoga",
    "vastu",
    "vastuTips",
    "temple",
    "organization",
    "news",
    "notification",
    "popup",
    "religiousTexts",
    "books",
    "texts",
    "reportMantra",
    "category",
    "consultancyService",
    "apiKeys",
    "course",
    "recipe",
    "content",
    "donations",
    "donation",
    "quiz",
    "ayurveda",
    "product",
    "productBanner",
    "consultation",
    "bulkSms",
    "dailyHoroscope",
    "subscription",
  ],
  endpoints: () => ({}),
});
