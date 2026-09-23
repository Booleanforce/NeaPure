// src/features/home/api/whyChooseApi.ts
import { api } from "@/store/api";

export interface WhyChooseFeature {
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseChapter {
  number: string;
  title: string;
  thumbnail: string;
  duration: string;
}

export interface BrandVideo {
  src: string;
  poster: string;
}

export interface TrustBadge {
  count: string;
  label: string;
}

export interface WhyChooseUsResponse {
  video: BrandVideo;
  trustBadge: TrustBadge;
  features: WhyChooseFeature[];
  chapters: WhyChooseChapter[];
}

// TEMP mock data — swap back to `query: () => "why-choose-us/"`
// once the backend endpoint is live.
const MOCK_DATA: WhyChooseUsResponse = {
  video: {
    src: "/videos/neapure-brand.mp4",
    poster: "/images/why-choose/poster.jpg",
  },
  trustBadge: { count: "10,000+", label: "Happy Families" },
  features: [
    { icon: "guarantee", title: "Quality Guarantee", description: "Certified safe drinking water, every time." },
    { icon: "genuine", title: "100% Genuine Products", description: "Authentic parts, no compromises." },
    { icon: "installation", title: "Expert Installation", description: "Professional setup at your doorstep." },
    { icon: "warranty", title: "Extended Warranty", description: "Long-term coverage on every unit." },
    { icon: "app", title: "Smart App Control", description: "Monitor your purifier from your phone." },
    { icon: "support", title: "24/7 Support", description: "We're here whenever you need us." },
  ],
  chapters: [
    { number: "1", title: "Unboxing", thumbnail: "/images/why-choose/ch1.jpg", duration: "1:20" },
    { number: "2", title: "Installation", thumbnail: "/images/why-choose/ch2.jpg", duration: "2:05" },
    { number: "3", title: "Filter Setup", thumbnail: "/images/why-choose/ch3.jpg", duration: "1:45" },
  ],
};

export const whyChooseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWhyChooseUs: builder.query<WhyChooseUsResponse, void>({
      queryFn: async () => {
        // simulate a tiny delay so the loading skeleton is visible
        await new Promise((r) => setTimeout(r, 300));
        return { data: MOCK_DATA };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetWhyChooseUsQuery } = whyChooseApi;