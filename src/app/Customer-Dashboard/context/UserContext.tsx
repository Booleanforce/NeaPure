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

import { apiClient } from "@/services/apiClient";

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

/* ============================================================================
   FALLBACK PROFILE
============================================================================ */

const FALLBACK_PROFILE: CustomerProfile = {
  fullName: "Mahfuzur Rahman",
  email: "mahfuzur@gmail.com",
  phone: "+880 1XX-XXXXXXX",
  location: "Dhaka, Bangladesh",
  role: "Customer",
  avatarUrl:
    "https://i.pravatar.cc/300?img=12",
  language: "English",
};

/* ============================================================================
   CONTEXT TYPE
============================================================================ */

interface UserContextValue {
  profile: CustomerProfile;

  updateProfile: (
    updates: Partial<CustomerProfile>
  ) => Promise<void>;

  loading: boolean;

  error: string | null;

  refetch: () => Promise<void>;
}

/* ============================================================================
   CONTEXT
============================================================================ */

const UserContext =
  createContext<UserContextValue | null>(
    null
  );

/* ============================================================================
   PROVIDER
============================================================================ */

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] =
    useState<CustomerProfile>(
      FALLBACK_PROFILE
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* ==========================================================================
     FETCH PROFILE
  ========================================================================== */

  const fetchProfile =
    useCallback(async () => {
      setLoading(true);
      setError(null);

      try {
        /*
         * This endpoint should return the
         * currently authenticated user's profile.
         *
         * Example:
         *
         * GET /api/accounts/profile/
         *
         * Change the endpoint below if your
         * Django backend uses a different URL.
         */

        const data =
          await apiClient.get<CustomerProfile>(
            "/api/accounts/profile/"
          );

        setProfile({
          ...FALLBACK_PROFILE,
          ...data,
        });
      } catch (err) {
        console.error(
          "Failed to load profile:",
          err
        );

        setError(
          "Couldn't load your profile."
        );

        /*
         * Keep the previous profile instead
         * of replacing it with empty data.
         */
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

  const updateProfile =
    useCallback(
      async (
        updates: Partial<CustomerProfile>
      ) => {
        /*
         * Save previous state in case
         * the backend request fails.
         */

        const previousProfile =
          profile;

        /* -------------------------------------------------------------- */
        /* Optimistic Update                                               */
        /* -------------------------------------------------------------- */

        setProfile((prev) => ({
          ...prev,
          ...updates,
        }));

        setError(null);

        try {
          /*
           * Change this endpoint if your Django
           * profile endpoint uses another URL.
           */

          const saved =
            await apiClient.patch<CustomerProfile>(
              "/api/accounts/profile/",
              updates
            );

          /*
           * Reconcile local state with
           * backend response.
           */

          setProfile({
            ...previousProfile,
            ...saved,
          });
        } catch (err) {
          console.error(
            "Failed to save profile:",
            err
          );

          /*
           * Roll back optimistic update.
           */

          setProfile(
            previousProfile
          );

          setError(
            "Couldn't save your changes."
          );

          throw err;
        }
      },
      [profile]
    );

  /* ==========================================================================
     PROVIDER
  ========================================================================== */

  return (
    <UserContext.Provider
      value={{
        profile,
        updateProfile,
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
  const context =
    useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUser must be used inside a UserProvider"
    );
  }

  return context;
}