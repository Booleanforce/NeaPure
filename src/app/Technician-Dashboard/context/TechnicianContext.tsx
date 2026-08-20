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

export type TechnicianLanguage =
  | "English"
  | "Bangla";

type ApiLanguage =
  | "en"
  | "bn";

/* ============================================================================
   CONSTANTS
============================================================================ */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "";

const LANGUAGE_STORAGE_KEY =
  "technician_language";

/* ============================================================================
   TECHNICIAN PROFILE
============================================================================ */

export interface TechnicianProfile {
  id?: string;

  region: string;

  skills: string;

  status:
    | "ACTIVE"
    | "BLOCKED"
    | string;

  profilePhoto: string;
}

/* ============================================================================
   TECHNICIAN USER
============================================================================ */

export interface TechnicianUser {
  id: string;

  email: string;

  fullName: string;

  phone: string;

  role: string;

  isActive: boolean;

  language: TechnicianLanguage;

  profile: TechnicianProfile;
}

/* ============================================================================
   API TYPES
============================================================================ */

interface ApiTechnicianProfile {
  id?: string;

  region?: string | null;

  skills?: unknown;

  status?: string | null;

  profile_photo?: string | null;

  created_at?: string;

  updated_at?: string;
}

interface ApiTechnician {
  id: string;

  email: string;

  full_name: string;

  phone?: string | null;

  role: string;

  language?: ApiLanguage | null;

  is_active: boolean;

  created_at?: string;

  technician_profile?:
    | ApiTechnicianProfile
    | null;
}

/* ============================================================================
   API RESPONSE
============================================================================ */

interface ApiErrorResponse {
  detail?: string;

  error?: string;

  message?: string;
}

/* ============================================================================
   FALLBACK
============================================================================ */

const FALLBACK_TECHNICIAN: TechnicianUser =
  {
    id: "",

    email: "",

    fullName: "Technician",

    phone: "",

    role: "TECHNICIAN",

    isActive: true,

    language: "English",

    profile: {
      id: "",

      region: "",

      skills: "",

      status: "ACTIVE",

      profilePhoto: "",
    },
  };

/* ============================================================================
   NORMALIZE TEXT

   Django may return skills as:
   - string
   - array
   - object
   - null

   This guarantees React always receives a string.
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

  if (
    typeof value ===
      "string"
  ) {
    return value;
  }

  if (
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (
          item === null ||
          item === undefined
        ) {
          return "";
        }

        if (
          typeof item ===
            "string" ||
          typeof item ===
            "number" ||
          typeof item ===
            "boolean"
        ) {
          return String(item);
        }

        try {
          return JSON.stringify(
            item
          );
        } catch {
          return "";
        }
      })
      .filter(Boolean)
      .join(", ");
  }

  if (
    typeof value ===
    "object"
  ) {
    try {
      return JSON.stringify(
        value
      );
    } catch {
      return "";
    }
  }

  return "";
}

/* ============================================================================
   NORMALIZE PHOTO URL
============================================================================ */

function normalizePhotoUrl(
  photo: unknown
): string {
  const value =
    normalizeText(
      photo
    ).trim();

  if (!value) {
    return "";
  }

  /* -----------------------------------------------------------
     Absolute URL
  ----------------------------------------------------------- */

  if (
    value.startsWith(
      "http://"
    ) ||
    value.startsWith(
      "https://"
    )
  ) {
    return value;
  }

  /* -----------------------------------------------------------
     Protocol-relative
  ----------------------------------------------------------- */

  if (
    value.startsWith("//")
  ) {
    return `https:${value}`;
  }

  /* -----------------------------------------------------------
     /media/...
  ----------------------------------------------------------- */

  if (
    value.startsWith("/")
  ) {
    return `${API_URL}${value}`;
  }

  /* -----------------------------------------------------------
     media/...
  ----------------------------------------------------------- */

  return `${API_URL}/${value}`;
}

/* ============================================================================
   LANGUAGE HELPERS
============================================================================ */

function apiLanguageToFrontend(
  language?: ApiLanguage | null
): TechnicianLanguage {
  return language === "bn"
    ? "Bangla"
    : "English";
}

function frontendLanguageToApi(
  language: TechnicianLanguage
): ApiLanguage {
  return language === "Bangla"
    ? "bn"
    : "en";
}

/* ============================================================================
   VALIDATE LANGUAGE
============================================================================ */

function isTechnicianLanguage(
  value: unknown
): value is TechnicianLanguage {
  return (
    value === "English" ||
    value === "Bangla"
  );
}

/* ============================================================================
   READ SAVED LANGUAGE
============================================================================ */

function getSavedLanguage():
  | TechnicianLanguage
  | null {
  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  const value =
    localStorage.getItem(
      LANGUAGE_STORAGE_KEY
    );

  if (
    isTechnicianLanguage(
      value
    )
  ) {
    return value;
  }

  return null;
}

/* ============================================================================
   SAVE LANGUAGE
============================================================================ */

function saveLanguageLocally(
  language: TechnicianLanguage
): void {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  localStorage.setItem(
    LANGUAGE_STORAGE_KEY,
    language
  );
}

/* ============================================================================
   API -> FRONTEND
============================================================================ */

function apiTechnicianToFrontend(
  technician: ApiTechnician,
  fallbackLanguage?: TechnicianLanguage
): TechnicianUser {
  const apiProfile =
    technician.technician_profile;

  /*
   * IMPORTANT:
   *
   * If the API response does not contain language,
   * preserve the existing language rather than
   * defaulting to English.
   */

  const language =
    technician.language
      ? apiLanguageToFrontend(
          technician.language
        )
      : fallbackLanguage ||
        "English";

  return {
    id:
      normalizeText(
        technician.id
      ),

    email:
      normalizeText(
        technician.email
      ),

    fullName:
      normalizeText(
        technician.full_name
      ),

    phone:
      normalizeText(
        technician.phone
      ),

    role:
      normalizeText(
        technician.role
      ).toUpperCase() ||
      "TECHNICIAN",

    isActive:
      Boolean(
        technician.is_active
      ),

    language,

    profile: {
      id:
        normalizeText(
          apiProfile?.id
        ),

      region:
        normalizeText(
          apiProfile?.region
        ),

      skills:
        normalizeText(
          apiProfile?.skills
        ),

      status:
        normalizeText(
          apiProfile?.status
        ).toUpperCase() ||
        "ACTIVE",

      profilePhoto:
        normalizePhotoUrl(
          apiProfile?.profile_photo
        ),
    },
  };
}

/* ============================================================================
   UPDATE TYPE
============================================================================ */

export interface UpdateTechnicianProfile {
  fullName?: string;

  phone?: string;

  region?: string;

  skills?: string;

  status?: string;
}

/* ============================================================================
   TOKEN
============================================================================ */

function getAccessToken():
  string | null {
  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  /*
   * Your current project primarily uses "access".
   * Other keys are kept as fallbacks.
   */

  const possibleKeys = [
    "access",
    "access_token",
    "accessToken",
    "token",
    "authToken",
    "jwt",
  ];

  for (
    const key of possibleKeys
  ) {
    const token =
      localStorage.getItem(
        key
      );

    if (token) {
      return token;
    }
  }

  return null;
}

/* ============================================================================
   AUTH HEADERS
============================================================================ */

function authHeaders(
  extra?: Record<
    string,
    string
  >
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
   PARSE RESPONSE
============================================================================ */

async function parseResponse(
  response: Response
): Promise<unknown> {
  const text =
    await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(
      text
    );
  } catch {
    return {
      message: text,
    };
  }
}

/* ============================================================================
   EXTRACT API MESSAGE
============================================================================ */

function getApiErrorMessage(
  data: unknown
): string | null {
  if (
    !data ||
    typeof data !==
      "object"
  ) {
    return null;
  }

  const errorData =
    data as ApiErrorResponse;

  if (
    errorData.detail
  ) {
    return errorData.detail;
  }

  if (
    errorData.error
  ) {
    return errorData.error;
  }

  if (
    errorData.message
  ) {
    return errorData.message;
  }

  /*
   * Handle DRF validation format:
   *
   * {
   *   "field": ["error"]
   * }
   */

  const object =
    data as Record<
      string,
      unknown
    >;

  const firstKey =
    Object.keys(object)[0];

  if (firstKey) {
    const value =
      object[firstKey];

    if (
      Array.isArray(value)
    ) {
      return value
        .map(
          (item) =>
            String(item)
        )
        .join(", ");
    }

    if (
      typeof value ===
      "string"
    ) {
      return value;
    }
  }

  return null;
}

/* ============================================================================
   UNWRAP API DATA
============================================================================ */

function unwrapApiData(
  data: unknown
): unknown {
  /*
   * Supports:
   *
   * {
   *   success: true,
   *   data: {...}
   * }
   *
   * as well as normal DRF responses.
   */

  if (
    data &&
    typeof data ===
      "object" &&
    "data" in data &&
    "success" in data
  ) {
    return (
      data as {
        data: unknown;
      }
    ).data;
  }

  return data;
}

/* ============================================================================
   CONTEXT TYPE
============================================================================ */

interface TechnicianContextValue {
  technician: TechnicianUser;

  language: TechnicianLanguage;

  setLanguage: (
    language: TechnicianLanguage
  ) => Promise<void>;

  updateTechnician: (
    updates: UpdateTechnicianProfile
  ) => Promise<void>;

  uploadProfilePhoto: (
    file: File
  ) => Promise<void>;

  removeProfilePhoto: () => Promise<void>;

  loading: boolean;

  saving: boolean;

  error: string | null;

  refetch: () => Promise<void>;
}

/* ============================================================================
   CONTEXT
============================================================================ */

const TechnicianContext =
  createContext<
    TechnicianContextValue | null
  >(null);

/* ============================================================================
   PROVIDER
============================================================================ */

export function TechnicianProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    technician,
    setTechnician,
  ] = useState<TechnicianUser>(
    FALLBACK_TECHNICIAN
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
     INITIAL LOCAL LANGUAGE
  ======================================================================== */

  useEffect(() => {
    const savedLanguage =
      getSavedLanguage();

    if (!savedLanguage) {
      return;
    }

    setTechnician(
      (current) => ({
        ...current,
        language:
          savedLanguage,
      })
    );
  }, []);

  /* ========================================================================
     FETCH TECHNICIAN
  ======================================================================== */

  const fetchTechnician =
    useCallback(async () => {
      setLoading(true);
      setError(null);

      try {
        const response =
          await fetch(
            `${API_URL}/api/technicians/dashboard/my-profile/me/`,
            {
              method: "GET",
              headers:
                authHeaders(),
              cache: "no-store",
            }
          );

        const rawData =
          await parseResponse(
            response
          );

        const data =
          unwrapApiData(
            rawData
          );

        if (!response.ok) {
          const message =
            getApiErrorMessage(
              data
            );

          throw new Error(
            message ||
              `Failed to load technician (${response.status})`
          );
        }

        /*
         * Local language takes priority when the
         * technician has explicitly selected one.
         */

        const savedLanguage =
          getSavedLanguage();

        const apiTechnician =
          data as ApiTechnician;

        const profile =
          apiTechnicianToFrontend(
            apiTechnician,
            savedLanguage ||
              undefined
          );

        /*
         * If local storage contains a language,
         * force that language.
         *
         * This prevents refresh/API responses from
         * changing Bangla back to English.
         */

        const finalLanguage =
          savedLanguage ||
          profile.language;

        setTechnician({
          ...profile,
          language:
            finalLanguage,
        });

        saveLanguageLocally(
          finalLanguage
        );
      } catch (err) {
        console.error(
          "Failed to load technician:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Couldn't load your technician profile."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  /* ========================================================================
     INITIAL FETCH
  ======================================================================== */

  useEffect(() => {
    fetchTechnician();
  }, [fetchTechnician]);

  /* ========================================================================
     LANGUAGE
  ======================================================================== */

  const setLanguage =
    useCallback(
      async (
        nextLanguage: TechnicianLanguage
      ) => {
        /*
         * ==========================================================
         * 1. CHANGE UI IMMEDIATELY
         * ==========================================================
         */

        setTechnician(
          (current) => ({
            ...current,
            language:
              nextLanguage,
          })
        );

        /*
         * ==========================================================
         * 2. SAVE LOCALLY
         * ==========================================================
         */

        saveLanguageLocally(
          nextLanguage
        );

        /*
         * ==========================================================
         * 3. SAVE TO DJANGO
         * ==========================================================
         */

        try {
          const response =
            await fetch(
              `${API_URL}/api/technicians/dashboard/my-profile/me/`,
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
                      nextLanguage
                    ),
                }),
              }
            );

          const rawData =
            await parseResponse(
              response
            );

          const data =
            unwrapApiData(
              rawData
            );

          /*
           * IMPORTANT:
           *
           * Even if backend fails, keep the frontend
           * language change.
           */

          if (!response.ok) {
            console.error(
              "Failed to save technician language:",
              {
                status:
                  response.status,
                response:
                  data,
              }
            );

            return;
          }

          /*
           * If backend returns a technician object,
           * merge it while explicitly preserving
           * the language selected by the user.
           */

          if (
            data &&
            typeof data ===
              "object" &&
            "id" in data
          ) {
            const updated =
              apiTechnicianToFrontend(
                data as ApiTechnician,
                nextLanguage
              );

            setTechnician({
              ...updated,

              /*
               * Force selected language.
               * Backend response cannot overwrite it.
               */
              language:
                nextLanguage,
            });
          }

          /*
           * Keep local value after successful response.
           */

          saveLanguageLocally(
            nextLanguage
          );
        } catch (err) {
          /*
           * Do NOT rollback the UI.
           *
           * The user can continue using the dashboard
           * in the selected language.
           */

          console.error(
            "Language save failed:",
            err
          );

          saveLanguageLocally(
            nextLanguage
          );
        }
      },
      []
    );

  /* ========================================================================
     UPDATE TECHNICIAN
  ======================================================================== */

  const updateTechnician =
    useCallback(
      async (
        updates: UpdateTechnicianProfile
      ) => {
        const previous =
          technician;

        setSaving(true);
        setError(null);

        /*
         * ==========================================================
         * OPTIMISTIC UPDATE
         * ==========================================================
         */

        setTechnician(
          (current) => ({
            ...current,

            ...(updates.fullName !==
            undefined
              ? {
                  fullName:
                    updates.fullName,
                }
              : {}),

            ...(updates.phone !==
            undefined
              ? {
                  phone:
                    updates.phone,
                }
              : {}),

            profile: {
              ...current.profile,

              ...(updates.region !==
              undefined
                ? {
                    region:
                      updates.region,
                  }
                : {}),

              ...(updates.skills !==
              undefined
                ? {
                    skills:
                      updates.skills,
                  }
                : {}),

              ...(updates.status !==
              undefined
                ? {
                    status:
                      updates.status,
                  }
                : {}),
            },
          })
        );

        try {
          const payload: Record<
            string,
            unknown
          > = {};

          /*
           * User fields
           */

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

          /*
           * Profile fields
           */

          const profilePayload: Record<
            string,
            unknown
          > = {};

          if (
            updates.region !==
            undefined
          ) {
            profilePayload.region =
              updates.region;
          }

          if (
            updates.skills !==
            undefined
          ) {
            profilePayload.skills =
              updates.skills;
          }

          if (
            updates.status !==
            undefined
          ) {
            profilePayload.status =
              updates.status;
          }

          if (
            Object.keys(
              profilePayload
            ).length > 0
          ) {
            payload.technician_profile =
              profilePayload;
          }

          if (
            Object.keys(
              payload
            ).length === 0
          ) {
            return;
          }

          /*
           * ========================================================
           * REQUEST
           * ========================================================
           */

          const response =
            await fetch(
              `${API_URL}/api/technicians/dashboard/my-profile/me/`,
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

          const rawData =
            await parseResponse(
              response
            );

          const data =
            unwrapApiData(
              rawData
            );

          if (!response.ok) {
            const message =
              getApiErrorMessage(
                data
              );

            throw new Error(
              message ||
                `Failed to update technician (${response.status})`
            );
          }

          /*
           * ========================================================
           * RECONCILE
           *
           * IMPORTANT:
           * Preserve current language.
           * ========================================================
           */

          if (
            data &&
            typeof data ===
              "object" &&
            "id" in data
          ) {
            const updated =
              apiTechnicianToFrontend(
                data as ApiTechnician,
                technician.language
              );

            setTechnician({
              ...updated,

              language:
                technician.language,
            });
          }
        } catch (err) {
          /*
           * Rollback profile data only.
           *
           * Previous object includes the correct language.
           */

          setTechnician(
            previous
          );

          setError(
            err instanceof Error
              ? err.message
              : "Couldn't save your changes."
          );

          throw err;
        } finally {
          setSaving(false);
        }
      },
      [technician]
    );

  /* ========================================================================
     UPLOAD PROFILE PHOTO
  ======================================================================== */

  const uploadProfilePhoto =
    useCallback(
      async (
        file: File
      ) => {
        setSaving(true);
        setError(null);

        const previous =
          technician;

        /*
         * ==========================================================
         * LOCAL PREVIEW
         * ==========================================================
         */

        const localPreview =
          URL.createObjectURL(
            file
          );

        setTechnician(
          (current) => ({
            ...current,

            profile: {
              ...current.profile,

              profilePhoto:
                localPreview,
            },
          })
        );

        try {
          const formData =
            new FormData();

          formData.append(
            "profile_photo",
            file,
            file.name
          );

          /*
           * ========================================================
           * REQUEST
           * ========================================================
           */

          const response =
            await fetch(
              `${API_URL}/api/technicians/dashboard/my-profile/me/`,
              {
                method: "PATCH",

                /*
                 * DO NOT set Content-Type manually
                 * for FormData.
                 */

                headers:
                  authHeaders(),

                body: formData,
              }
            );

          const rawData =
            await parseResponse(
              response
            );

          const data =
            unwrapApiData(
              rawData
            );

          if (!response.ok) {
            const message =
              getApiErrorMessage(
                data
              );

            throw new Error(
              message ||
                `Failed to upload photo (${response.status})`
            );
          }

          /*
           * ========================================================
           * RECONCILE
           * ========================================================
           */

          if (
            data &&
            typeof data ===
              "object" &&
            "id" in data
          ) {
            const updated =
              apiTechnicianToFrontend(
                data as ApiTechnician,
                technician.language
              );

            setTechnician({
              ...updated,

              /*
               * Preserve language
               */
              language:
                technician.language,
            });
          }
        } catch (err) {
          /*
           * Rollback photo only / entire technician snapshot.
           *
           * This also preserves language.
           */

          setTechnician(
            previous
          );

          setError(
            err instanceof Error
              ? err.message
              : "Couldn't upload your profile photo."
          );

          throw err;
        } finally {
          URL.revokeObjectURL(
            localPreview
          );

          setSaving(false);
        }
      },
      [technician]
    );

  /* ========================================================================
     REMOVE PROFILE PHOTO
  ======================================================================== */

  const removeProfilePhoto =
    useCallback(
      async () => {
        setSaving(true);
        setError(null);

        const previous =
          technician;

        try {
          const formData =
            new FormData();

          formData.append(
            "remove_profile_photo",
            "true"
          );

          const response =
            await fetch(
              `${API_URL}/api/technicians/dashboard/my-profile/me/`,
              {
                method: "PATCH",

                headers:
                  authHeaders(),

                body: formData,
              }
            );

          const rawData =
            await parseResponse(
              response
            );

          const data =
            unwrapApiData(
              rawData
            );

          if (!response.ok) {
            const message =
              getApiErrorMessage(
                data
              );

            throw new Error(
              message ||
                `Failed to remove photo (${response.status})`
            );
          }

          /*
           * ========================================================
           * RECONCILE
           * ========================================================
           */

          if (
            data &&
            typeof data ===
              "object" &&
            "id" in data
          ) {
            const updated =
              apiTechnicianToFrontend(
                data as ApiTechnician,
                technician.language
              );

            setTechnician({
              ...updated,

              /*
               * Preserve language
               */
              language:
                technician.language,
            });
          }
        } catch (err) {
          setTechnician(
            previous
          );

          setError(
            err instanceof Error
              ? err.message
              : "Couldn't remove your profile photo."
          );

          throw err;
        } finally {
          setSaving(false);
        }
      },
      [technician]
    );

  /* ========================================================================
     PROVIDER
  ======================================================================== */

  return (
    <TechnicianContext.Provider
      value={{
        technician,

        language:
          technician.language,

        setLanguage,

        updateTechnician,

        uploadProfilePhoto,

        removeProfilePhoto,

        loading,

        saving,

        error,

        refetch:
          fetchTechnician,
      }}
    >
      {children}
    </TechnicianContext.Provider>
  );
}

/* ============================================================================
   HOOK
============================================================================ */

export function useTechnician() {
  const context =
    useContext(
      TechnicianContext
    );

  if (!context) {
    throw new Error(
      "useTechnician must be used inside a TechnicianProvider"
    );
  }

  return context;
}