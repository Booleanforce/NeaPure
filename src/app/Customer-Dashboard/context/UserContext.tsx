// app/dashboard/context/UserContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

// Keep this in sync with the shape used in ProfilePage.tsx
export interface CustomerProfile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  avatarUrl: string;
  language: "English" | "Bangla";
}

// Shape returned by the Django API (apps.accounts.api.serializers.UserSerializer)
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

// Fallback used only while the real profile is loading, or if the
// fetch fails. Replace avatarUrl with a local placeholder image if
// you don't want to depend on an external URL.
const FALLBACK_PROFILE: CustomerProfile = {
  fullName: "Mahfuzur Rahman",
  email: "mahfuzur@gmail.com",
  phone: "+880 1XX-XXXXXXX",
  location: "Dhaka, Bangladesh",
  role: "Customer",
  avatarUrl: "https://i.pravatar.cc/300?img=12",
  language: "English",
};

// --- API <-> frontend field mapping -----------------------------------

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

// Only the fields UserSerializer accepts on PATCH (email/role/firebase_uid
// are read_only on the backend, so we never send them).
function profileToApiPayload(updates: Partial<CustomerProfile>) {
  const payload: Record<string, unknown> = {};
  if (updates.fullName !== undefined) payload.full_name = updates.fullName;
  if (updates.phone !== undefined) payload.phone = updates.phone;
  if (updates.location !== undefined) payload.location = updates.location;
  if (updates.language !== undefined) {
    payload.language = updates.language === "Bangla" ? "bn" : "en";
  }
  return payload;
}

// --------------------------------------------------------------------
// DIAGNOSTIC VERSION — checks every common key name your login flow
// might be using and logs (once) which one it actually found. This is
// a stopgap so uploads/saves work *right now* without more guessing.
//
// ONCE YOU SEE THE CONSOLE LOG: replace this whole function with a
// single hardcoded `localStorage.getItem("<the real key>")` — don't
// ship the multi-key fallback long-term, it's just for diagnosis.
// --------------------------------------------------------------------
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
  if (typeof window === "undefined") return null;

  for (const key of POSSIBLE_TOKEN_KEYS) {
    const value = localStorage.getItem(key);
    if (value) {
      if (!loggedTokenSource) {
        console.log(`[auth] Found access token under localStorage key: "${key}"`);
        loggedTokenSource = true;
      }
      return value;
    }
  }

  if (!loggedTokenSource) {
    console.warn(
      "[auth] No access token found under any of:",
      POSSIBLE_TOKEN_KEYS,
      "— check what key your login flow actually saves to, or if it's using cookies/sessionStorage instead of localStorage."
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

interface UserContextValue {
  profile: CustomerProfile;
  // Patch one or more fields locally (optimistic update) AND persist
  // them to the backend. Returns once the persist call settles.
  updateProfile: (updates: Partial<CustomerProfile>) => Promise<void>;
  // Upload a new avatar file directly (multipart), separate from
  // updateProfile since the backend requires its own endpoint/parser.
  uploadAvatar: (file: File) => Promise<void>;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<CustomerProfile>(FALLBACK_PROFILE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/auth/me/`, {
        method: "GET",
        headers: authHeaders(),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Failed to load profile (${res.status})`);
      const data: ApiUser = await res.json();
      setProfile(apiUserToProfile(data));
    } catch (err) {
      console.error(err);
      setError("Couldn't load your profile.");
      // Keep whatever profile we already have (fallback or last good one)
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(
    async (updates: Partial<CustomerProfile>) => {
      // Optimistic update so the UI (Topbar, ProfilePage, anywhere else
      // that reads this context) reflects the change immediately.
      setProfile((prev) => ({ ...prev, ...updates }));

      // avatarUrl changes go through uploadAvatar, not this PATCH —
      // strip it out if it sneaks in via a spread update.
      const { avatarUrl: _avatarUrl, ...rest } = updates;
      const payload = profileToApiPayload(rest);

      if (Object.keys(payload).length === 0) return;

      try {
        const res = await fetch(`${API_URL}/api/auth/me/`, {
          method: "PATCH",
          headers: authHeaders({ "Content-Type": "application/json" }),
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Failed to save profile (${res.status})`);
        const saved: ApiUser = await res.json();
        setProfile(apiUserToProfile(saved)); // reconcile with what the server actually stored
      } catch (err) {
        console.error(err);
        setError("Couldn't save your changes.");
        // Optional: roll back optimistic update here if you want stricter
        // consistency, e.g. by calling fetchProfile() again.
        throw err;
      }
    },
    []
  );

  const uploadAvatar = useCallback(async (file: File) => {
    // Optimistic local preview via a blob URL, replaced with the real
    // hosted URL once the upload resolves.
    const localPreview = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, avatarUrl: localPreview }));

    try {
      const formData = new FormData();
      formData.append("photo", file);

      const res = await fetch(`${API_URL}/api/auth/avatar/`, {
        method: "POST",
        headers: authHeaders(), // no Content-Type — browser sets multipart boundary
        body: formData,
      });
      if (!res.ok) throw new Error(`Failed to upload photo (${res.status})`);
      const { url } = (await res.json()) as { url: string | null };
      if (url) {
        setProfile((prev) => ({ ...prev, avatarUrl: url }));
      }
    } catch (err) {
      console.error(err);
      setError("Couldn't upload that photo.");
      throw err;
    } finally {
      URL.revokeObjectURL(localPreview);
    }
  }, []);

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

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside a <UserProvider>");
  }
  return ctx;
}