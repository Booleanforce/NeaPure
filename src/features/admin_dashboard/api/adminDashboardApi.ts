import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminDashboardApi = createApi({
  reducerPath: "adminDashboardApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/admin-dashboard" }),
  endpoints: (builder) => ({
    getDashboardStats: builder.query<any, void>({
      query: () => "/stats",
    }),
    getRecentServiceRequests: builder.query<any, void>({
      query: () => "/recent-requests",
    }),
  }),
});

export const { useGetDashboardStatsQuery, useGetRecentServiceRequestsQuery } = adminDashboardApi;
