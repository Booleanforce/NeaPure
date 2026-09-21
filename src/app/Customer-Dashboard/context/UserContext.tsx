// app/dashboard/context/UserContext.tsx
/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/* ============================================================================
   CUSTOMER PROFILE
============================================================================ */

export interface CustomerProfile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  avatarUrl: string;
  language: "English" | "Bangla";
}

// Shape returned by the Django API
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

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

// Fallback profile
const FALLBACK_PROFILE: CustomerProfile = {
  fullName: "Mahfuzur Rahman",
  email: "mahfuzur@gmail.com",
  phone: "+880 1XX-XXXXXXX",
  location: "Dhaka, Bangladesh",
  role: "Customer",
  avatarUrl: "https://i.pravatar.cc/300?img=12",
  language: "English",
};

/* ============================================================================
   API <-> FRONTEND MAPPING
============================================================================ */

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

// Only send fields accepted by the backend PATCH endpoint.
function profileToApiPayload(updates: Partial<CustomerProfile>) {
  const payload: Record<string, unknown> = {};

  if (updates.fullName !== undefined) {
    payload.full_name = updates.fullName;
  }

  if (updates.phone !== undefined) {
    payload.phone = updates.phone;
  }

  if (updates.location !== undefined) {
    payload.location = updates.location;
  }

  if (updates.language !== undefined) {
    payload.language = updates.language === "Bangla" ? "bn" : "en";
  }

  return payload;
}

/* ============================================================================
   AUTH TOKEN
============================================================================ */

const POSSIBLE_TOKEN_KEYS = [
  "access_token",
  "accessToken",
  "access",
  "token",
  "authToken",
  "jwt",
];

let loggedTokenSource = false;

function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  for (const key of POSSIBLE_TOKEN_KEYS) {
    const value = localStorage.getItem(key);

    if (value) {
      if (!loggedTokenSource) {
        console.log(
          `[auth] Found access token under localStorage key: "${key}"`
        );

        loggedTokenSource = true;
      }

      return value;
    }
  }

  if (!loggedTokenSource) {
    console.warn(
      "[auth] No access token found under any of:",
      POSSIBLE_TOKEN_KEYS
    );

    loggedTokenSource = true;
  }

  return null;
}

function authHeaders(extra?: Record<string, string>): HeadersInit {
  const token = getAccessToken();

  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

/* ============================================================================
   CONTEXT TYPE
============================================================================ */

interface UserContextValue {
  profile: CustomerProfile;

  // Update profile information and persist it to the backend.
  updateProfile: (updates: Partial<CustomerProfile>) => Promise<void>;

  // Upload a new avatar.
  uploadAvatar: (file: File) => Promise<void>;

  loading: boolean;

  error: string | null;

  refetch: () => Promise<void>;
}

/* ============================================================================
   CONTEXT
============================================================================ */

const UserContext = createContext<UserContextValue | null>(null);

/* ============================================================================
   PROVIDER
============================================================================ */

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] =
    useState<CustomerProfile>(FALLBACK_PROFILE);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  /* ==========================================================================
     FETCH PROFILE
  ========================================================================== */

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/auth/me/`, {
        method: "GET",
        headers: authHeaders(),
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Failed to load profile (${res.status})`);
      }

      const data: ApiUser = await res.json();

      setProfile(apiUserToProfile(data));
    } catch (err) {
      console.error("Failed to load profile:", err);

      setError("Couldn't load your profile.");

      // Keep the existing profile/fallback.
    } finally {
      setLoading(false);
    }
  }, []);

  /* ==========================================================================
     INITIAL PROFILE LOAD
  ========================================================================== */

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /* ==========================================================================
     UPDATE PROFILE
  ========================================================================== */

  const updateProfile = useCallback(
    async (updates: Partial<CustomerProfile>) => {
      setError(null);

      // avatarUrl is handled separately through uploadAvatar.
      const { avatarUrl: _avatarUrl, ...rest } = updates;

      const payload = profileToApiPayload(rest);

      if (Object.keys(payload).length === 0) {
        return;
      }

      // Optimistic update.
      const previousProfile = profile;

      setProfile((prev) => ({
        ...prev,
        ...updates,
      }));

      try {
        const res = await fetch(`${API_URL}/api/auth/me/`, {
          method: "PATCH",
          headers: authHeaders({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error(
            `Failed to save profile (${res.status})`
          );
        }

        const saved: ApiUser = await res.json();

        // Reconcile with backend response.
        setProfile(apiUserToProfile(saved));
      } catch (err) {
        console.error("Failed to save profile:", err);

        // Roll back optimistic update.
        setProfile(previousProfile);

        setError("Couldn't save your changes.");

        throw err;
      }
    },
    [profile]
  );

  /* ==========================================================================
     UPLOAD AVATAR
  ========================================================================== */

  const uploadAvatar = useCallback(async (file: File) => {
    // Create local preview immediately.
    const localPreview = URL.createObjectURL(file);

    setProfile((prev) => ({
      ...prev,
      avatarUrl: localPreview,
    }));

    try {
      const formData = new FormData();

      formData.append("photo", file);

      const res = await fetch(`${API_URL}/api/auth/avatar/`, {
        method: "POST",
        headers: authHeaders(),
        body: formData,
      });

      if (!res.ok) {
        throw new Error(
          `Failed to upload photo (${res.status})`
        );
      }

      const { url } = (await res.json()) as {
        url: string | null;
      };

      if (url) {
        setProfile((prev) => ({
          ...prev,
          avatarUrl: url,
        }));
      }
    } catch (err) {
      console.error("Failed to upload photo:", err);

      setError("Couldn't upload that photo.");

      throw err;
    } finally {
      URL.revokeObjectURL(localPreview);
    }
  }, []);

  /* ==========================================================================
     PROVIDER
  ========================================================================== */

  return (
    <UserContext.Provider
      value={{
        profile,
        updateProfile,
        uploadAvatar,
        loading,
        error,
        refetch: fetchProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

/* ============================================================================
   USE USER
============================================================================ */

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUser must be used inside a UserProvider"
    );
  }

  return context;
}