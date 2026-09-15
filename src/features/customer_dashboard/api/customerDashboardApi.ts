import { api } from "@/store/api";

export interface CustomerProfile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  avatarUrl: string;
  language: "English" | "Bangla";
}

interface ApiUser {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  location: string;
  photo: string | null;
  role: string;
  language: "en" | "bn";
  firebase_uid: string | null;
}

const FALLBACK_PROFILE: CustomerProfile = {
  fullName: "Mahfuzur Rahman",
  email: "mahfuzur@gmail.com",
  phone: "+880 1XX-XXXXXXX",
  location: "Dhaka, Bangladesh",
  role: "Customer",
  avatarUrl: "https://i.pravatar.cc/300?img=12",
  language: "English",
};

function apiUserToProfile(u: ApiUser): CustomerProfile {
  return {
    fullName: u.full_name,
    email: u.email,
    phone: u.phone,
    location: u.location,
    role: u.role,
    avatarUrl: u.photo ?? FALLBACK_PROFILE.avatarUrl,
    language: u.language === "bn" ? "Bangla" : "English",
  };
}

export const customerDashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<CustomerProfile, void>({
      query: () => "auth/me/",
      transformResponse: (response: ApiUser) => apiUserToProfile(response),
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation<CustomerProfile, Partial<CustomerProfile>>({
      query: (updates) => {
        const payload: Record<string, unknown> = {};
        if (updates.fullName !== undefined) payload.full_name = updates.fullName;
        if (updates.phone !== undefined) payload.phone = updates.phone;
        if (updates.location !== undefined) payload.location = updates.location;
        if (updates.language !== undefined) payload.language = updates.language === "Bangla" ? "bn" : "en";

        return {
          url: "auth/me/",
          method: "PATCH",
          body: payload,
        };
      },
      transformResponse: (response: ApiUser) => apiUserToProfile(response),
      invalidatesTags: ["User"],
    }),
    uploadAvatar: builder.mutation<{ url: string | null }, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("photo", file);

        return {
          url: "auth/avatar/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} = customerDashboardApi;
