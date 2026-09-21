import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL, // e.g. your Laravel API base
  }),
  tagTypes: ["Stats"],
  endpoints: (builder) => ({
    getProblemStats: builder.query({
      query: () => "/problem-stats", // adjust to your actual Laravel route
      providesTags: ["Stats"],
    }),
  }),
});

export const { useGetProblemStatsQuery } = statsApi;