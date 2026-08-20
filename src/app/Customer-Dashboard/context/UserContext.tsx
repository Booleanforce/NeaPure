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
   LANGUAGE
============================================================================ */

export type CustomerLanguage =
  | "English"
  | "Bangla";

type ApiLanguage =
  | "en"
  | "bn";

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
  language: CustomerLanguage;
}

/* ============================================================================
   API USER
============================================================================ */

interface ApiUser {
  id: string;
  email: string;
  full_name: string;
  phone?: string | null;
  location?: string | null;
  photo?: string | null;
  role: string;
  language?: ApiLanguage | null;
  firebase_uid?: string | null;
}

/* ============================================================================
   API URL
============================================================================ */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "";

/* ============================================================================
   LOCAL STORAGE
============================================================================ */

const LANGUAGE_STORAGE_KEY =
  "customer_language";

/* ============================================================================
   FALLBACK
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
   NORMALIZE
============================================================================ */

function normalizeText(
  value: unknown
): string {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}

/* ============================================================================
   TOKEN
============================================================================ */

const TOKEN_KEYS = [
  "access",
  "access_token",
  "accessToken",
  "token",
  "authToken",
  "jwt",
];

function getAccessToken(): string | null {
  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  for (const key of TOKEN_KEYS) {
    const value =
      localStorage.getItem(key);

    if (value) {
      return value;
    }
  }

  return null;
}

/* ============================================================================
   AUTH HEADERS
============================================================================ */

function authHeaders(
  extra?: Record<string, string>
): HeadersInit {
  const token =
    getAccessToken();

  return {
    ...(token
      ? {
          Authorization:
            `Bearer ${token}`,
        }
      : {}),
    ...extra,
  };
}

/* ============================================================================
   LANGUAGE MAPPING
============================================================================ */

function apiLanguageToFrontend(
  language?: ApiLanguage | null
): CustomerLanguage {
  return language === "bn"
    ? "Bangla"
    : "English";
}

function frontendLanguageToApi(
  language: CustomerLanguage
): ApiLanguage {
  return language === "Bangla"
    ? "bn"
    : "en";
}

/* ============================================================================
   API -> FRONTEND
============================================================================ */

function apiUserToProfile(
  user: ApiUser
): CustomerProfile {
  return {
    fullName:
      normalizeText(
        user.full_name
      ),

    email:
      normalizeText(
        user.email
      ),

    phone:
      normalizeText(
        user.phone
      ),

    location:
      normalizeText(
        user.location
      ),

    role:
      normalizeText(
        user.role
      ) || "CUSTOMER",

    avatarUrl:
      normalizeText(
        user.photo
      ) ||
      FALLBACK_PROFILE.avatarUrl,

    language:
      apiLanguageToFrontend(
        user.language
      ),
  };
}

/* ============================================================================
   PROFILE PAYLOAD
============================================================================ */

function profileToApiPayload(
  updates: Partial<CustomerProfile>
): Record<string, unknown> {
  const payload: Record<
    string,
    unknown
  > = {};

  if (
    updates.fullName !==
    undefined
  ) {
    payload.full_name =
      updates.fullName;
  }

  if (
    updates.phone !==
    undefined
  ) {
    payload.phone =
      updates.phone;
  }

  if (
    updates.location !==
    undefined
  ) {
    payload.location =
      updates.location;
  }

  if (
    updates.language !==
    undefined
  ) {
    payload.language =
      frontendLanguageToApi(
        updates.language
      );
  }

  return payload;
}

/* ============================================================================
   CONTEXT TYPE
============================================================================ */

interface UserContextValue {
  profile: CustomerProfile;

  language: CustomerLanguage;

  setLanguage: (
    language: CustomerLanguage
  ) => Promise<void>;

  updateProfile: (
    updates: Partial<CustomerProfile>
  ) => Promise<void>;

  uploadAvatar: (
    file: File
  ) => Promise<void>;

  loading: boolean;

  saving: boolean;

  error: string | null;

  refetch: () => Promise<void>;
}

/* ============================================================================
   CONTEXT
============================================================================ */

const UserContext =
  createContext<
    UserContextValue | null
  >(null);

/* ============================================================================
   PROVIDER
============================================================================ */

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    profile,
    setProfile,
  ] = useState<CustomerProfile>(
    FALLBACK_PROFILE
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null
  );

  /* ========================================================================
     FETCH PROFILE
  ======================================================================== */

  const fetchProfile =
    useCallback(async () => {
      setLoading(true);
      setError(null);

      try {
        const response =
          await fetch(
            `${API_URL}/api/auth/me/`,
            {
              method: "GET",
              headers:
                authHeaders(),
              cache: "no-store",
            }
          );

        const text =
          await response.text();

        let data: unknown =
          null;

        if (text) {
          try {
            data =
              JSON.parse(text);
          } catch {
            data = {
              message: text,
            };
          }
        }

        if (!response.ok) {
          const errorData =
            data as {
              detail?: string;
              message?: string;
            } | null;

          throw new Error(
            errorData?.detail ||
              errorData?.message ||
              `Failed to load profile (${response.status})`
          );
        }

        const customer =
          apiUserToProfile(
            data as ApiUser
          );

        setProfile(
          customer
        );

        if (
          typeof window !==
          "undefined"
        ) {
          localStorage.setItem(
            LANGUAGE_STORAGE_KEY,
            customer.language
          );
        }
      } catch (error) {
        console.error(
          "Failed to load customer profile:",
          error
        );

        /*
         * Keep locally saved language
         * if the API is temporarily unavailable.
         */
        if (
          typeof window !==
          "undefined"
        ) {
          const savedLanguage =
            localStorage.getItem(
              LANGUAGE_STORAGE_KEY
            );

          if (
            savedLanguage ===
              "English" ||
            savedLanguage ===
              "Bangla"
          ) {
            setProfile(
              (current) => ({
                ...current,
                language:
                  savedLanguage,
              })
            );
          }
        }

        setError(
          error instanceof Error
            ? error.message
            : "Couldn't load your profile."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  /* ========================================================================
     INITIAL LOAD
  ======================================================================== */

  useEffect(() => {
    /*
     * Load local language first.
     */
    if (
      typeof window !==
      "undefined"
    ) {
      const savedLanguage =
        localStorage.getItem(
          LANGUAGE_STORAGE_KEY
        );

      if (
        savedLanguage ===
          "English" ||
        savedLanguage ===
          "Bangla"
      ) {
        setProfile(
          (current) => ({
            ...current,
            language:
              savedLanguage,
          })
        );
      }
    }

    fetchProfile();
  }, [fetchProfile]);

  /* ========================================================================
     SET LANGUAGE
  ======================================================================== */

  const setLanguage =
    useCallback(
      async (
        language: CustomerLanguage
      ) => {
        /*
         * ==============================================================
         * CHANGE UI IMMEDIATELY
         * ==============================================================
         */

        setProfile(
          (current) => ({
            ...current,
            language,
          })
        );

        /*
         * ==============================================================
         * SAVE LOCALLY
         * ==============================================================
         */

        if (
          typeof window !==
          "undefined"
        ) {
          localStorage.setItem(
            LANGUAGE_STORAGE_KEY,
            language
          );
        }

        /*
         * ==============================================================
         * SAVE TO BACKEND
         * ==============================================================
         */

        try {
          const response =
            await fetch(
              `${API_URL}/api/auth/me/`,
              {
                method: "PATCH",

                headers:
                  authHeaders({
                    "Content-Type":
                      "application/json",
                  }),

                body: JSON.stringify({
                  language:
                    frontendLanguageToApi(
                      language
                    ),
                }),
              }
            );

          const text =
            await response.text();

          let data: unknown =
            null;

          if (text) {
            try {
              data =
                JSON.parse(text);
            } catch {
              data = {
                message: text,
              };
            }
          }

          if (
            !response.ok
          ) {
            console.error(
              "Failed to save customer language:",
              {
                status:
                  response.status,
                response:
                  data,
              }
            );

            /*
             * Do not rollback.
             * Local language remains active.
             */
            return;
          }

          /*
           * Django may return the
           * updated user.
           */
          if (
            data &&
            typeof data ===
              "object" &&
            "id" in data
          ) {
            const serverProfile =
              apiUserToProfile(
                data as ApiUser
              );

            setProfile(
              (current) => ({
                ...serverProfile,
                language,
              })
            );
          }
        } catch (error) {
          console.error(
            "Customer language save failed:",
            error
          );

          /*
           * UI continues using local
           * preference.
           */
        }
      },
      []
    );

  /* ========================================================================
     UPDATE PROFILE
  ======================================================================== */

  const updateProfile =
    useCallback(
      async (
        updates: Partial<CustomerProfile>
      ) => {
        setSaving(true);
        setError(null);

        const previousProfile =
          profile;

        /*
         * Avatar is handled separately.
         */
        const {
          avatarUrl: _avatarUrl,
          ...rest
        } = updates;

        const payload =
          profileToApiPayload(
            rest
          );

        if (
          Object.keys(
            payload
          ).length === 0
        ) {
          setSaving(false);
          return;
        }

        /*
         * Optimistic update.
         */
        setProfile(
          (current) => ({
            ...current,
            ...updates,
          })
        );

        try {
          const response =
            await fetch(
              `${API_URL}/api/auth/me/`,
              {
                method: "PATCH",

                headers:
                  authHeaders({
                    "Content-Type":
                      "application/json",
                  }),

                body: JSON.stringify(
                  payload
                ),
              }
            );

          const text =
            await response.text();

          let data: unknown =
            null;

          if (text) {
            try {
              data =
                JSON.parse(text);
            } catch {
              data = {
                message: text,
              };
            }
          }

          if (
            !response.ok
          ) {
            const errorData =
              data as {
                detail?: string;
                message?: string;
              } | null;

            throw new Error(
              errorData?.detail ||
                errorData?.message ||
                `Failed to save profile (${response.status})`
            );
          }

          const saved =
            apiUserToProfile(
              data as ApiUser
            );

          setProfile(
            saved
          );

          if (
            typeof window !==
            "undefined"
          ) {
            localStorage.setItem(
              LANGUAGE_STORAGE_KEY,
              saved.language
            );
          }
        } catch (error) {
          console.error(
            "Failed to save customer profile:",
            error
          );

          setProfile(
            previousProfile
          );

          setError(
            error instanceof Error
              ? error.message
              : "Couldn't save your changes."
          );

          throw error;
        } finally {
          setSaving(false);
        }
      },
      [profile]
    );

  /* ========================================================================
     UPLOAD AVATAR
  ======================================================================== */

  const uploadAvatar =
    useCallback(
      async (
        file: File
      ) => {
        setSaving(true);
        setError(null);

        const previousProfile =
          profile;

        const localPreview =
          URL.createObjectURL(
            file
          );

        /*
         * Instant preview.
         */
        setProfile(
          (current) => ({
            ...current,
            avatarUrl:
              localPreview,
          })
        );

        try {
          const formData =
            new FormData();

          formData.append(
            "photo",
            file
          );

          const response =
            await fetch(
              `${API_URL}/api/auth/avatar/`,
              {
                method: "POST",
                headers:
                  authHeaders(),
                body: formData,
              }
            );

          const text =
            await response.text();

          let data: unknown =
            null;

          if (text) {
            try {
              data =
                JSON.parse(text);
            } catch {
              data = {
                message: text,
              };
            }
          }

          if (
            !response.ok
          ) {
            const errorData =
              data as {
                detail?: string;
                message?: string;
              } | null;

            throw new Error(
              errorData?.detail ||
                errorData?.message ||
                `Failed to upload photo (${response.status})`
            );
          }

          const result =
            data as {
              url?: string | null;
            };

          if (result.url) {
            setProfile(
              (current) => ({
                ...current,
                avatarUrl:
                  result.url as string,
              })
            );
          } else {
            await fetchProfile();
          }
        } catch (error) {
          console.error(
            "Failed to upload customer photo:",
            error
          );

          setProfile(
            previousProfile
          );

          setError(
            error instanceof Error
              ? error.message
              : "Couldn't upload that photo."
          );

          throw error;
        } finally {
          URL.revokeObjectURL(
            localPreview
          );

          setSaving(false);
        }
      },
      [profile, fetchProfile]
    );

  /* ========================================================================
     PROVIDER
  ======================================================================== */

  return (
    <UserContext.Provider
      value={{
        profile,

        language:
          profile.language,

        setLanguage,

        updateProfile,

        uploadAvatar,

        loading,

        saving,

        error,

        refetch:
          fetchProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

/* ============================================================================
   HOOK
============================================================================ */

export function useUser() {
  const context =
    useContext(
      UserContext
    );

  if (!context) {
    throw new Error(
      "useUser must be used inside a UserProvider"
    );
  }

  return context;
}