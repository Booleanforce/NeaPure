// src/features/faq/api/faqApi.ts
//
// RTK Query slice for the FAQ / "Ask a Question" section.
// Plugs into the shared `api` (src/store/api.ts) via injectEndpoints.

import { api } from "@/store/api";

// ---- Types ----------------------------------------------------------

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
  hasImage?: boolean;
  // Path inside /public (must start with "/", must NOT include "public").
  image?: string;
}

// ---- Mock data --------------------------------------------------------
// TEMP: replace `queryFn` below with a real `query: () => "faqs/"` once
// the backend endpoint exists. Keeping this here (not in the component)
// so swapping to a real API call later is a one-line change.

const MOCK_FAQS: FAQItem[] = [
  {
    question: "How often should filters be replaced?",
    answer:
      "It depends on usage and water quality. Typically, sediment and carbon filters last 6 months, while RO membrane lasts 12-18 months. Our app reminds you before it's due.",
    category: "Most Asked",
    hasImage: true,
    image: "/images/neaPureFilter.png",
  },
  {
    question: "Is installation really free?",
    answer:
      "Yes! We provide free professional installation for all our water purifiers. Our trained technicians will set up your system at no extra cost.",
    category: "Most Asked",
  },
  {
    question: "Do all products include a warranty?",
    answer:
      "Yes, all our products come with manufacturer warranty. Standard warranty is 1 year, with extended warranty options available for purchase.",
    category: "Most Asked",
  },
  {
    question: "Do you provide installation?",
    answer:
      "Absolutely! We provide free professional installation by certified technicians. They will also show you how to use and maintain your system.",
    category: "Installation",
  },
  {
    question: "Can I order replacement filters online?",
    answer:
      "Yes! You can easily order replacement filters through our website or mobile app. We also offer subscription plans for automatic deliveries.",
    category: "Most Asked",
  },
  {
    question: "Do you deliver outside Dhaka?",
    answer:
      "Yes, we deliver nationwide across Bangladesh. Delivery times vary by location - Dhaka: 1-2 days, Outside Dhaka: 3-5 business days.",
    category: "Most Asked",
  },
  {
    question: "Do you service all cities?",
    answer:
      "We provide installation and after-sales service in all major cities across Bangladesh. Check our service coverage page for details.",
    category: "Most Asked",
  },
];

// ---- Endpoints --------------------------------------------------------

export const faqApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // No providesTags — same reasoning as whyChooseApi: shared `api`
    // only declares tagTypes: ['User'], and FAQ content rarely
    // invalidates. Add 'Faq' to tagTypes in api.ts first if that changes.
    getFaqs: builder.query<FAQItem[], void>({
      queryFn: async () => {
        await new Promise((r) => setTimeout(r, 300)); // simulate latency
        return { data: MOCK_FAQS };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetFaqsQuery } = faqApi;