// store/whyChooseApi.ts
import { api } from "./api";

/* ================= TYPES ================= */

export type FeatureIconKey =
  | "sparkles"
  | "shield-check"
  | "wrench"
  | "file-text"
  | "smartphone"
  | "headphones";

export interface IWhyChooseFeature {
  _id: string;
  icon: FeatureIconKey;
  title: string;
  description: string;
}

export interface IWhyChooseChapter {
  _id: string;
  number: string;
  title: string;
  thumbnail?: string;
  duration: string;
}

interface IApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/* ================= ENDPOINTS ================= */

export const whyChooseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWhyChooseFeatures: builder.query<IWhyChooseFeature[], void>({
      query: () => ({
        url: "/why-choose/features",
        method: "GET",
      }),
      transformResponse: (response: IApiResponse<IWhyChooseFeature[]>) =>
        response.data,
    }),

    getWhyChooseChapters: builder.query<IWhyChooseChapter[], void>({
      query: () => ({
        url: "/why-choose/chapters",
        method: "GET",
      }),
      transformResponse: (response: IApiResponse<IWhyChooseChapter[]>) =>
        response.data,
    }),
  }),
});

export const {
  useGetWhyChooseFeaturesQuery,
  useGetWhyChooseChaptersQuery,
} = whyChooseApi;