// src/features/home/api/smartCareApi.ts
//
// RTK Query slice for the "Smart Water Care Ecosystem" section.
// Plugs into the shared `api` (src/store/api.ts) via injectEndpoints.

import { api } from "@/store/api";

// ---- Types ----------------------------------------------------------

// `icon` is a string key from the backend; resolved to an actual
// lucide-react component on the client via ICON_MAP (see component),
// since components can't be serialized over the API.
export interface TopFeature {
  icon: string;
  title: string;
  description: string;
}

export interface AppFeature {
  icon: string;
  title: string;
}

export interface SmartCareResponse {
  topFeatures: TopFeature[];
  appFeatures: AppFeature[];
}

// ---- Mock data --------------------------------------------------------
// TEMP: replace `queryFn` below with `query: () => "smart-care/"` once
// the backend endpoint exists.

const MOCK_DATA: SmartCareResponse = {
  topFeatures: [
    { icon: "shield", title: "100% Genuine Products", description: "Original & certified components" },
    { icon: "wrench", title: "Professional Installation", description: "Trained experts for perfect setup" },
    { icon: "headphones", title: "Dedicated After Sales Support", description: "We are with you, always" },
    { icon: "shieldCheck", title: "1 Year Warranty", description: "Peace of mind with our warranty" },
    { icon: "truck", title: "Fast & Safe Delivery", description: "Quick delivery to your doorstep" },
  ],
  appFeatures: [
    { icon: "droplet", title: "Filter Life Monitoring" },
    { icon: "calendar", title: "Service Booking" },
    { icon: "droplets", title: "Water Quality Updates" },
    { icon: "shield", title: "Warranty Management" },
    { icon: "bell", title: "Smart Notifications" },
  ],
};

// ---- Endpoints --------------------------------------------------------

export const smartCareApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // No providesTags — same reasoning as whyChooseApi/faqApi: shared
    // `api` only declares tagTypes: ['User'], and this content rarely
    // changes. Add 'SmartCare' to tagTypes in api.ts first if needed.
    getSmartCare: builder.query<SmartCareResponse, void>({
      queryFn: async () => {
        await new Promise((r) => setTimeout(r, 300)); // simulate latency
        return { data: MOCK_DATA };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetSmartCareQuery } = smartCareApi;