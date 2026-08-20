"use client";

import { useEffect, useRef, useState } from "react";

import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Camera,
  Lock,
  Settings,
  Pencil,
  Check,
  X,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  useAdmin,
  type AdminLanguage,
} from "../context/AdminContext";

/* =========================================================
   TYPES
========================================================= */

interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  phone?: string | null;
  location?: string | null;
  role?: string | null;
  photo?: string | null;
  language?: "en" | "bn" | null;
}

interface AdminProfile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  avatarUrl: string;
}

type EditableField =
  | "fullName"
  | "email"
  | "phone"
  | "location"
  | "role";

const MAX_AVATAR_SIZE_MB = 5;

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  pageTitle: {
    English: "My Profile",
    Bangla: "আমার প্রোফাইল",
  },

  pageSubtitle: {
    English:
      "View and manage your personal information.",
    Bangla:
      "আপনার ব্যক্তিগত তথ্য দেখুন এবং পরিচালনা করুন।",
  },

  editProfile: {
    English: "Edit Profile",
    Bangla: "প্রোফাইল সম্পাদনা",
  },

  cancel: {
    English: "Cancel",
    Bangla: "বাতিল",
  },

  save: {
    English: "Save",
    Bangla: "সংরক্ষণ",
  },

  saving: {
    English: "Saving...",
    Bangla: "সংরক্ষণ হচ্ছে...",
  },

  changePhoto: {
    English: "Change Photo",
    Bangla: "ছবি পরিবর্তন",
  },

  uploading: {
    English: "Uploading...",
    Bangla: "আপলোড হচ্ছে...",
  },

  fullName: {
    English: "Full Name",
    Bangla: "পূর্ণ নাম",
  },

  email: {
    English: "Email",
    Bangla: "ইমেইল",
  },

  phone: {
    English: "Phone",
    Bangla: "ফোন",
  },

  location: {
    English: "Location",
    Bangla: "অবস্থান",
  },

  role: {
    English: "Role",
    Bangla: "ভূমিকা",
  },

  accountInformation: {
    English: "Account Information",
    Bangla: "অ্যাকাউন্ট তথ্য",
  },

  password: {
    English: "Password",
    Bangla: "পাসওয়ার্ড",
  },

  changePassword: {
    English: "Change Password",
    Bangla: "পাসওয়ার্ড পরিবর্তন",
  },

  updatePassword: {
    English: "Update Password",
    Bangla: "পাসওয়ার্ড আপডেট",
  },

  updating: {
    English: "Updating...",
    Bangla: "আপডেট হচ্ছে...",
  },

  show: {
    English: "Show",
    Bangla: "দেখান",
  },

  hide: {
    English: "Hide",
    Bangla: "লুকান",
  },

  currentPassword: {
    English: "Current Password",
    Bangla: "বর্তমান পাসওয়ার্ড",
  },

  newPassword: {
    English: "New Password",
    Bangla: "নতুন পাসওয়ার্ড",
  },

  confirmNewPassword: {
    English: "Confirm New Password",
    Bangla: "নতুন পাসওয়ার্ড নিশ্চিত করুন",
  },

  preferences: {
    English: "Preferences",
    Bangla: "পছন্দসমূহ",
  },

  language: {
    English: "Language",
    Bangla: "ভাষা",
  },

  english: {
    English: "English",
    Bangla: "English",
  },

  bangla: {
    English: "Bangla",
    Bangla: "বাংলা",
  },

  needHelp: {
    English: "Need help? Visit our",
    Bangla: "সাহায্য দরকার? আমাদের",
  },

  supportCenter: {
    English: "Support Center",
    Bangla: "সাপোর্ট সেন্টার",
  },

  enterCurrentPassword: {
    English:
      "Enter your current password.",
    Bangla:
      "আপনার বর্তমান পাসওয়ার্ড লিখুন।",
  },

  passwordNeeds: {
    English: "Password needs:",
    Bangla: "পাসওয়ার্ডে প্রয়োজন:",
  },

  passwordsDontMatch: {
    English:
      "New password and confirmation don't match.",
    Bangla:
      "নতুন পাসওয়ার্ড ও নিশ্চিতকরণ মিলছে না।",
  },

  passwordSameAsCurrent: {
    English:
      "New password must be different from the current one.",
    Bangla:
      "নতুন পাসওয়ার্ড বর্তমান পাসওয়ার্ড থেকে ভিন্ন হতে হবে।",
  },

  passwordUpdateFailed: {
    English:
      "Couldn't update your password. Please try again.",
    Bangla:
      "পাসওয়ার্ড আপডেট করা যায়নি। আবার চেষ্টা করুন।",
  },

  profileUpdated: {
    English:
      "Profile updated successfully.",
    Bangla:
      "প্রোফাইল সফলভাবে আপডেট হয়েছে।",
  },

  profileUpdateFailed: {
    English:
      "Failed to update profile.",
    Bangla:
      "প্রোফাইল আপডেট করা যায়নি।",
  },

  photoInvalidType: {
    English:
      "Please choose an image file.",
    Bangla:
      "অনুগ্রহ করে একটি ছবি নির্বাচন করুন।",
  },

  photoTooLarge: {
    English: `Image must be under ${MAX_AVATAR_SIZE_MB}MB.`,
    Bangla: `ছবির আকার ${MAX_AVATAR_SIZE_MB}MB-এর কম হতে হবে।`,
  },

  photoUploadFailed: {
    English:
      "Couldn't upload that photo.",
    Bangla:
      "ছবি আপলোড করা যায়নি।",
  },

  ruleLength: {
    English: "8-16 characters",
    Bangla: "৮-১৬ অক্ষর",
  },

  ruleUppercase: {
    English: "One uppercase letter",
    Bangla: "একটি বড় হাতের অক্ষর",
  },

  ruleLowercase: {
    English: "One lowercase letter",
    Bangla: "একটি ছোট হাতের অক্ষর",
  },

  ruleNumber: {
    English: "One number",
    Bangla: "একটি সংখ্যা",
  },

  ruleSpecial: {
    English: "One special character",
    Bangla: "একটি বিশেষ চিহ্ন",
  },

  superAdmin: {
    English: "Super Admin",
    Bangla: "সুপার অ্যাডমিন",
  },

  admin: {
    English: "Admin",
    Bangla: "অ্যাডমিন",
  },

  operationsAdmin: {
    English: "Operations Admin",
    Bangla: "অপারেশনস অ্যাডমিন",
  },

  user: {
    English: "User",
    Bangla: "ব্যবহারকারী",
  },
} as const;

type TranslationKey =
  keyof typeof TRANSLATIONS;

/* =========================================================
   TRANSLATION
========================================================= */

function t(
  key: TranslationKey,
  language: AdminLanguage
): string {
  return TRANSLATIONS[key][language];
}

/* =========================================================
   ROLE TRANSLATION
========================================================= */

function translateRole(
  role: string,
  language: AdminLanguage
): string {
  const normalized = role
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "_");

  switch (normalized) {
    case "SUPER_ADMIN":
      return t(
        "superAdmin",
        language
      );

    case "ADMIN":
      return t(
        "admin",
        language
      );

    case "OPERATIONS_ADMIN":
    case "OPERATION_ADMIN":
      return t(
        "operationsAdmin",
        language
      );

    default:
      return (
        role
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) =>
            char.toUpperCase()
          ) || t("user", language)
      );
  }
}

/* =========================================================
   PASSWORD RULES
========================================================= */

function getPasswordRules(
  language: AdminLanguage
) {
  return [
    {
      key: "ruleLength" as TranslationKey,
      label: t(
        "ruleLength",
        language
      ),
      test: (value: string) =>
        value.length >= 8 &&
        value.length <= 16,
    },

    {
      key: "ruleUppercase" as TranslationKey,
      label: t(
        "ruleUppercase",
        language
      ),
      test: (value: string) =>
        /[A-Z]/.test(value),
    },

    {
      key: "ruleLowercase" as TranslationKey,
      label: t(
        "ruleLowercase",
        language
      ),
      test: (value: string) =>
        /[a-z]/.test(value),
    },

    {
      key: "ruleNumber" as TranslationKey,
      label: t(
        "ruleNumber",
        language
      ),
      test: (value: string) =>
        /[0-9]/.test(value),
    },

    {
      key: "ruleSpecial" as TranslationKey,
      label: t(
        "ruleSpecial",
        language
      ),
      test: (value: string) =>
        /[^A-Za-z0-9]/.test(value),
    },
  ];
}

/* =========================================================
   DEFAULT PROFILE
========================================================= */

const EMPTY_PROFILE: AdminProfile = {
  fullName: "NeaPure Admin",
  email: "",
  phone: "",
  location: "",
  role: "SUPER_ADMIN",
  avatarUrl: "",
};

/* =========================================================
   API URL
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "";

/* =========================================================
   TOKEN
========================================================= */

function getAccessToken(): string | null {
  if (
    typeof window === "undefined"
  ) {
    return null;
  }

  return (
    localStorage.getItem("access") ||
    localStorage.getItem("access_token") ||
    localStorage.getItem("token") ||
    null
  );
}

/* =========================================================
   AUTH HEADERS
========================================================= */

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

/* =========================================================
   API -> PROFILE
========================================================= */

function apiUserToProfile(
  user: AdminUser
): AdminProfile {
  return {
    fullName:
      user.full_name ||
      "NeaPure Admin",

    email:
      user.email || "",

    phone:
      user.phone || "",

    location:
      user.location || "",

    role:
      user.role || "SUPER_ADMIN",

    avatarUrl:
      user.photo || "",
  };
}

/* =========================================================
   COMPONENT
========================================================= */

export default function MyProfilePage() {
  const {
    language,
    setLanguage,
  } = useAdmin();

  /* =======================================================
     STATE
  ======================================================= */

  const [profile, setProfile] =
    useState<AdminProfile>(
      EMPTY_PROFILE
    );

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  const [draft, setDraft] =
    useState<AdminProfile>(
      EMPTY_PROFILE
    );

  const [uploadError, setUploadError] =
    useState<string | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  /* =======================================================
     PASSWORD
  ======================================================= */

  const [
    isChangingPassword,
    setIsChangingPassword,
  ] = useState(false);

  const [
    passwordSaving,
    setPasswordSaving,
  ] = useState(false);

  const [
    passwordError,
    setPasswordError,
  ] = useState<string | null>(null);

  const [
    showPasswords,
    setShowPasswords,
  ] = useState(false);

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const passwordRules =
    getPasswordRules(language);

  /* =======================================================
     LOAD PROFILE
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        const storedUser =
          localStorage.getItem(
            "user"
          );

        if (storedUser) {
          try {
            const parsed =
              JSON.parse(
                storedUser
              ) as AdminUser;

            if (mounted) {
              const localProfile =
                apiUserToProfile(
                  parsed
                );

              setProfile(
                localProfile
              );

              setDraft(
                localProfile
              );
            }
          } catch {
            console.error(
              "Invalid stored user data."
            );
          }
        }

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

        if (!response.ok) {
          return;
        }

        const data =
          (await response.json()) as AdminUser;

        if (!mounted) {
          return;
        }

        const serverProfile =
          apiUserToProfile(
            data
          );

        setProfile(
          serverProfile
        );

        setDraft(
          serverProfile
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            data
          )
        );
      } catch (error) {
        console.error(
          "Failed to load admin profile:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     INITIALS
  ======================================================= */

  const initials =
    profile.fullName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(
        (part) =>
          part.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase() || "NA";

  /* =======================================================
     EDIT
  ======================================================= */

  function startEditing() {
    setDraft(profile);
    setIsEditing(true);
  }

  function cancelEditing() {
    setDraft(profile);
    setIsEditing(false);
  }

  function updateDraft(
    field: EditableField,
    value: string
  ) {
    setDraft(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );
  }

  /* =======================================================
     SAVE PROFILE
  ======================================================= */

  async function saveProfile() {
    setSaving(true);

    try {
      const payload = {
        full_name:
          draft.fullName.trim(),

        phone:
          draft.phone.trim(),

        location:
          draft.location.trim(),
      };

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
            body:
              JSON.stringify(
                payload
              ),
          }
        );

      if (!response.ok) {
        throw new Error(
          `Failed to update profile (${response.status})`
        );
      }

      const data =
        (await response.json()) as AdminUser;

      const updatedProfile =
        apiUserToProfile(
          data
        );

      setProfile(
        updatedProfile
      );

      setDraft(
        updatedProfile
      );

      setIsEditing(false);

      localStorage.setItem(
        "user",
        JSON.stringify(
          data
        )
      );
    } catch (error) {
      console.error(
        "Profile update failed:",
        error
      );

      window.alert(
        error instanceof Error
          ? error.message
          : t(
              "profileUpdateFailed",
              language
            )
      );
    } finally {
      setSaving(false);
    }
  }

  /* =======================================================
     LANGUAGE
  ======================================================= */

  async function handleLanguageChange(
    selectedLanguage: AdminLanguage
  ) {
    if (
      selectedLanguage ===
      language
    ) {
      return;
    }

    /*
     * Your AdminContext owns the
     * actual language persistence.
     */
    await setLanguage(
      selectedLanguage
    );
  }

  /* =======================================================
     PHOTO
  ======================================================= */

  async function handlePhotoChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    setUploadError(null);

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setUploadError(
        t(
          "photoInvalidType",
          language
        )
      );
      return;
    }

    if (
      file.size >
      MAX_AVATAR_SIZE_MB *
        1024 *
        1024
    ) {
      setUploadError(
        t(
          "photoTooLarge",
          language
        )
      );
      return;
    }

    const preview =
      URL.createObjectURL(
        file
      );

    setProfile(
      (previous) => ({
        ...previous,
        avatarUrl:
          preview,
      })
    );

    setUploading(true);

    try {
      const formData =
        new FormData();

      formData.append(
        "photo",
        file,
        file.name
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

      if (!response.ok) {
        throw new Error(
          `Failed to upload photo (${response.status})`
        );
      }

      const result =
        (await response.json()) as {
          url?: string | null;
        };

      if (result.url) {
        setProfile(
          (previous) => ({
            ...previous,
            avatarUrl:
              result.url ??
              "",
          })
        );
      }
    } catch (error) {
      console.error(
        "Photo upload failed:",
        error
      );

      setUploadError(
        t(
          "photoUploadFailed",
          language
        )
      );

      setProfile(
        (previous) => ({
          ...previous,
          avatarUrl:
            profile.avatarUrl,
        })
      );
    } finally {
      URL.revokeObjectURL(
        preview
      );

      setUploading(false);
    }
  }

  /* =======================================================
     PASSWORD
  ======================================================= */

  function startChangingPassword() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError(null);
    setIsChangingPassword(true);
  }

  function cancelChangingPassword() {
    setIsChangingPassword(false);
    setPasswordError(null);
  }

  async function submitPasswordChange() {
    setPasswordError(null);

    if (!currentPassword) {
      setPasswordError(
        t(
          "enterCurrentPassword",
          language
        )
      );
      return;
    }

    const failedRule =
      passwordRules.find(
        (rule) =>
          !rule.test(
            newPassword
          )
      );

    if (failedRule) {
      setPasswordError(
        `${t(
          "passwordNeeds",
          language
        )} ${failedRule.label}.`
      );
      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      setPasswordError(
        t(
          "passwordsDontMatch",
          language
        )
      );
      return;
    }

    if (
      newPassword ===
      currentPassword
    ) {
      setPasswordError(
        t(
          "passwordSameAsCurrent",
          language
        )
      );
      return;
    }

    setPasswordSaving(true);

    try {
      const response =
        await fetch(
          `${API_URL}/api/auth/change-password/`,
          {
            method: "POST",
            headers:
              authHeaders({
                "Content-Type":
                  "application/json",
              }),
            body:
              JSON.stringify({
                current_password:
                  currentPassword,
                new_password:
                  newPassword,
              }),
          }
        );

      if (!response.ok) {
        const errorData =
          await response
            .json()
            .catch(
              () => null
            );

        throw new Error(
          errorData?.detail ||
            errorData?.message ||
            t(
              "passwordUpdateFailed",
              language
            )
        );
      }

      setIsChangingPassword(
        false
      );

      setCurrentPassword(
        ""
      );

      setNewPassword("");

      setConfirmPassword("");
    } catch (error) {
      console.error(
        "Password update failed:",
        error
      );

      setPasswordError(
        error instanceof Error
          ? error.message
          : t(
              "passwordUpdateFailed",
              language
            )
      );
    } finally {
      setPasswordSaving(false);
    }
  }

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-40 rounded-lg bg-gray-200" />
          <div className="h-52 rounded-2xl bg-white" />
          <div className="h-24 rounded-2xl bg-white" />
          <div className="h-24 rounded-2xl bg-white" />
        </div>
      </div>
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="mx-auto w-full max-w-4xl">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            {t(
              "pageTitle",
              language
            )}
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            {t(
              "pageSubtitle",
              language
            )}
          </p>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={
              startEditing
            }
            className="
              flex
              w-fit
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              shadow-sm
              shadow-blue-200
              transition
              hover:bg-blue-700
            "
          >
            <Pencil className="h-4 w-4" />
            {t(
              "editProfile",
              language
            )}
          </button>
        ) : (
          <div className="flex w-fit items-center gap-2">
            <button
              type="button"
              onClick={
                cancelEditing
              }
              disabled={saving}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                px-4
                py-2.5
                text-sm
                font-medium
                text-slate-600
                transition
                hover:bg-slate-50
                disabled:opacity-50
              "
            >
              <X className="h-4 w-4" />

              {t(
                "cancel",
                language
              )}
            </button>

            <button
              type="button"
              onClick={
                saveProfile
              }
              disabled={saving}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-blue-600
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                shadow-sm
                shadow-blue-200
                transition
                hover:bg-blue-700
                disabled:opacity-50
              "
            >
              <Check className="h-4 w-4" />

              {saving
                ? t(
                    "saving",
                    language
                  )
                : t(
                    "save",
                    language
                  )}
            </button>
          </div>
        )}
      </div>

      {/* =====================================================
          PROFILE CARD
      ===================================================== */}

      <section className="mb-5 rounded-2xl bg-white p-5 shadow-sm sm:p-6">

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">

          {/* Avatar */}

          <div className="flex shrink-0 flex-col items-center gap-3">

            <div className="relative h-28 w-28 overflow-hidden rounded-full bg-blue-100 ring-1 ring-slate-100">

              {profile.avatarUrl ? (
                <img
                  src={
                    profile.avatarUrl
                  }
                  alt={
                    profile.fullName
                  }
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="
                  flex
                  h-full
                  w-full
                  items-center
                  justify-center
                  bg-gradient-to-br
                  from-blue-600
                  to-cyan-500
                  text-3xl
                  font-bold
                  text-white
                ">
                  {initials}
                </div>
              )}

            </div>

            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              disabled={uploading}
              className="
                flex
                items-center
                gap-1.5
                rounded-lg
                bg-blue-50
                px-3
                py-1.5
                text-sm
                font-medium
                text-blue-600
                transition
                hover:bg-blue-100
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <Camera className="h-3.5 w-3.5" />

              {uploading
                ? t(
                    "uploading",
                    language
                  )
                : t(
                    "changePhoto",
                    language
                  )}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={
                handlePhotoChange
              }
            />

            {uploadError && (
              <p className="max-w-[10rem] text-center text-xs text-red-500">
                {uploadError}
              </p>
            )}
          </div>

          {/* Information */}

          <div className="w-full flex-1 space-y-4 sm:pt-1">

            {!isEditing ? (
              <>
                <InfoRow
                  icon={User}
                  label={t(
                    "fullName",
                    language
                  )}
                  value={
                    profile.fullName ||
                    "-"
                  }
                />

                <InfoRow
                  icon={Mail}
                  label={t(
                    "email",
                    language
                  )}
                  value={
                    profile.email ||
                    "-"
                  }
                />

                <InfoRow
                  icon={Phone}
                  label={t(
                    "phone",
                    language
                  )}
                  value={
                    profile.phone ||
                    "-"
                  }
                />

                <InfoRow
                  icon={MapPin}
                  label={t(
                    "location",
                    language
                  )}
                  value={
                    profile.location ||
                    "-"
                  }
                />

                <InfoRow
                  icon={ShieldCheck}
                  label={t(
                    "role",
                    language
                  )}
                  value={translateRole(
                    profile.role,
                    language
                  )}
                />
              </>
            ) : (
              <>
                <FormRow
                  icon={User}
                  label={t(
                    "fullName",
                    language
                  )}
                  name="admin-full-name"
                  value={
                    draft.fullName
                  }
                  onChange={(value) =>
                    updateDraft(
                      "fullName",
                      value
                    )
                  }
                />

                <FormRow
                  icon={Mail}
                  label={t(
                    "email",
                    language
                  )}
                  name="admin-email"
                  type="email"
                  value={
                    draft.email
                  }
                  onChange={() => {}}
                  disabled
                />

                <FormRow
                  icon={Phone}
                  label={t(
                    "phone",
                    language
                  )}
                  name="admin-phone"
                  type="tel"
                  value={
                    draft.phone
                  }
                  onChange={(value) =>
                    updateDraft(
                      "phone",
                      value
                    )
                  }
                />

                <FormRow
                  icon={MapPin}
                  label={t(
                    "location",
                    language
                  )}
                  name="admin-location"
                  value={
                    draft.location
                  }
                  onChange={(value) =>
                    updateDraft(
                      "location",
                      value
                    )
                  }
                />

                <FormRow
                  icon={ShieldCheck}
                  label={t(
                    "role",
                    language
                  )}
                  name="admin-role"
                  value={translateRole(
                    draft.role,
                    language
                  )}
                  onChange={() => {}}
                  disabled
                />
              </>
            )}

          </div>
        </div>
      </section>

      {/* =====================================================
          ACCOUNT INFORMATION
      ===================================================== */}

      <section className="mb-5 rounded-2xl bg-white shadow-sm">

        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3.5 sm:px-6">
          <Lock className="h-4 w-4 text-slate-700" />

          <h2 className="text-sm font-semibold text-slate-900">
            {t(
              "accountInformation",
              language
            )}
          </h2>
        </div>

        {!isChangingPassword ? (
          <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

            <div>
              <p className="text-xs text-slate-400">
                {t(
                  "password",
                  language
                )}
              </p>

              <p className="mt-2 tracking-widest text-slate-500">
                ••••••••••••
              </p>
            </div>

            <button
              type="button"
              onClick={
                startChangingPassword
              }
              className="
                flex
                w-fit
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                px-4
                py-2.5
                text-sm
                font-medium
                text-blue-600
                transition
                hover:bg-slate-50
              "
            >
              <Lock className="h-3.5 w-3.5" />

              {t(
                "changePassword",
                language
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4 px-5 py-4 sm:px-6">

            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700">
                {t(
                  "changePassword",
                  language
                )}
              </p>

              <button
                type="button"
                onClick={() =>
                  setShowPasswords(
                    (previous) =>
                      !previous
                  )
                }
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-600"
              >
                {showPasswords ? (
                  <EyeOff className="h-3.5 w-3.5" />
                ) : (
                  <Eye className="h-3.5 w-3.5" />
                )}

                {showPasswords
                  ? t(
                      "hide",
                      language
                    )
                  : t(
                      "show",
                      language
                    )}
              </button>
            </div>

            <PasswordField
              label={t(
                "currentPassword",
                language
              )}
              value={
                currentPassword
              }
              onChange={
                setCurrentPassword
              }
              show={
                showPasswords
              }
              autoComplete="current-password"
            />

            <PasswordField
              label={t(
                "newPassword",
                language
              )}
              value={
                newPassword
              }
              onChange={
                setNewPassword
              }
              show={
                showPasswords
              }
              autoComplete="new-password"
            />

            <PasswordField
              label={t(
                "confirmNewPassword",
                language
              )}
              value={
                confirmPassword
              }
              onChange={
                setConfirmPassword
              }
              show={
                showPasswords
              }
              autoComplete="new-password"
            />

            <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {passwordRules.map(
                (rule) => {
                  const passed =
                    rule.test(
                      newPassword
                    );

                  return (
                    <li
                      key={
                        rule.key
                      }
                      className={`
                        flex
                        items-center
                        gap-1.5
                        text-xs
                        ${
                          passed
                            ? "text-emerald-600"
                            : "text-slate-400"
                        }
                      `}
                    >
                      <Check
                        className={`
                          h-3.5
                          w-3.5
                          ${
                            passed
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        `}
                      />

                      {rule.label}
                    </li>
                  );
                }
              )}
            </ul>

            {passwordError && (
              <p className="text-xs text-red-500">
                {passwordError}
              </p>
            )}

            <div className="flex items-center gap-2 pt-1">

              <button
                type="button"
                onClick={
                  cancelChangingPassword
                }
                disabled={
                  passwordSaving
                }
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-slate-600
                  transition
                  hover:bg-slate-50
                  disabled:opacity-50
                "
              >
                <X className="h-4 w-4" />

                {t(
                  "cancel",
                  language
                )}
              </button>

              <button
                type="button"
                onClick={
                  submitPasswordChange
                }
                disabled={
                  passwordSaving
                }
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  shadow-sm
                  shadow-blue-200
                  transition
                  hover:bg-blue-700
                  disabled:opacity-50
                "
              >
                <Check className="h-4 w-4" />

                {passwordSaving
                  ? t(
                      "updating",
                      language
                    )
                  : t(
                      "updatePassword",
                      language
                    )}
              </button>

            </div>
          </div>
        )}
      </section>

      {/* =====================================================
          PREFERENCES
      ===================================================== */}

      <section className="mb-5 rounded-2xl bg-white shadow-sm">

        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3.5 sm:px-6">

          <Settings className="h-4 w-4 text-slate-700" />

          <h2 className="text-sm font-semibold text-slate-900">
            {t(
              "preferences",
              language
            )}
          </h2>

        </div>

        <div className="flex flex-col gap-3 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <span className="text-sm text-slate-400">
            {t(
              "language",
              language
            )}
          </span>

          <div className="flex w-fit items-center gap-1 rounded-lg bg-slate-100 p-1">

            <button
              type="button"
              onClick={() =>
                handleLanguageChange(
                  "English"
                )
              }
              className={`
                rounded-md
                px-3
                py-1.5
                text-sm
                font-medium
                transition

                ${
                  language ===
                  "English"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }
              `}
            >
              {t(
                "english",
                language
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                handleLanguageChange(
                  "Bangla"
                )
              }
              className={`
                rounded-md
                px-3
                py-1.5
                text-sm
                font-medium
                transition

                ${
                  language ===
                  "Bangla"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }
              `}
            >
              {t(
                "bangla",
                language
              )}
            </button>

          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <p className="pb-2 text-center text-sm text-slate-400">

        {t(
          "needHelp",
          language
        )}{" "}

        <a
          href="#"
          className="font-semibold text-blue-600 hover:underline"
        >
          {t(
            "supportCenter",
            language
          )}
        </a>

      </p>

    </div>
  );
}

/* =========================================================
   INFO ROW
========================================================= */

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{
    className?: string;
  }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 sm:items-center sm:gap-4">

      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 sm:mt-0" />

      <span className="w-20 shrink-0 text-sm text-slate-400 sm:w-28">
        {label}
      </span>

      <span className="min-w-0 break-words text-sm font-medium text-slate-800">
        {value}
      </span>

    </div>
  );
}

/* =========================================================
   FORM ROW
========================================================= */

function FormRow({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled,
}: {
  icon: React.ComponentType<{
    className?: string;
  }>;
  label: string;
  name: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">

      <label
        htmlFor={name}
        className="flex w-28 shrink-0 items-center gap-2 text-sm text-slate-400"
      >
        <Icon className="h-4 w-4 shrink-0 text-slate-300" />

        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="
          w-full
          flex-1
          rounded-lg
          border
          border-slate-200
          bg-white
          px-3
          py-2
          text-sm
          font-medium
          text-slate-800
          outline-none
          transition
          focus:border-blue-400
          focus:ring-2
          focus:ring-blue-100
          disabled:cursor-not-allowed
          disabled:bg-slate-50
          disabled:text-slate-500
        "
      />

    </div>
  );
}

/* =========================================================
   PASSWORD FIELD
========================================================= */

function PasswordField({
  label,
  value,
  onChange,
  show,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  show: boolean;
  autoComplete: string;
}) {
  const id =
    `password-${label
      .replace(
        /\s+/g,
        "-"
      )
      .toLowerCase()}`;

  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">

      <label
        htmlFor={id}
        className="w-40 shrink-0 text-sm text-slate-400 sm:w-48"
      >
        {label}
      </label>

      <input
        id={id}
        type={
          show
            ? "text"
            : "password"
        }
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        autoComplete={
          autoComplete
        }
        className="
          w-full
          flex-1
          rounded-lg
          border
          border-slate-200
          bg-white
          px-3
          py-2
          text-sm
          font-medium
          text-slate-800
          outline-none
          transition
          focus:border-blue-400
          focus:ring-2
          focus:ring-blue-100
        "
      />

    </div>
  );
}