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

interface UserContextValue {
  profile: CustomerProfile;
  // Patch one or more fields locally (optimistic update) AND persist
  // them to the backend. Returns once the persist call settles.
  updateProfile: (updates: Partial<CustomerProfile>) => Promise<void>;
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
      // Swap this for your real endpoint / session hook (e.g. next-auth,
      // Supabase, your own API). Must return JSON matching CustomerProfile.
      const res = await fetch("/api/profile", { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to load profile (${res.status})`);
      const data: CustomerProfile = await res.json();
      setProfile(data);
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

      try {
        const res = await fetch("/api/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
        if (!res.ok) throw new Error(`Failed to save profile (${res.status})`);
        const saved: CustomerProfile = await res.json();
        setProfile(saved); // reconcile with whatever the server actually stored
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

  return (
    <UserContext.Provider
      value={{ profile, updateProfile, loading, error, refetch: fetchProfile }}
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