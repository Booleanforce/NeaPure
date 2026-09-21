import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  highlights: string[];
  stats: HeroStat[];
}

/**
 * RTK Query API slice for the Hero Banner's dynamic content
 * (highlights + stats). Inject this into your existing store's
 * reducer/middleware setup, e.g.:
 *
 *   import { configureStore } from "@reduxjs/toolkit";
 *   import { heroApi } from "./heroApi";
 *
 *   export const store = configureStore({
 *     reducer: {
 *       [heroApi.reducerPath]: heroApi.reducer,
 *       // ...your other reducers
 *     },
 *     middleware: (getDefaultMiddleware) =>
 *       getDefaultMiddleware().concat(heroApi.middleware),
 *   });
 *
 * If your project already has a single root `api` slice created with
 * `createApi`, prefer `api.injectEndpoints({...})` instead of a
 * second `createApi` call — copy the `endpoints` block below into that.
 */
import { api } from "./api";

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  highlights: string[];
  stats: HeroStat[];
}

export const heroApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHeroContent: builder.query<HeroContent, void>({
      query: () => "hero-content", // resolves to `${baseUrl}/api/hero-content`
      providesTags: ["HeroContent"],
    }),
  }),
});

export const { useGetHeroContentQuery } = heroApi;