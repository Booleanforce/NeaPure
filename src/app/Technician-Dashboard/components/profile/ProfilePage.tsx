/* eslint-disable @next/next/no-img-element */

"use client";

import { useRef, useState } from "react";

import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Camera,
  Lock,
  Pencil,
  Check,
  X,
  Eye,
  EyeOff,
  Wrench,
  Activity,
} from "lucide-react";

import {
  Bounce,
  toast,
} from "react-toastify";

import {
  useTechnician,
  type TechnicianLanguage,
  type TechnicianUser,
} from "../../context/TechnicianContext";

/* =========================================================
   TYPES
========================================================= */

type EditableField =
  | "fullName"
  | "email"
  | "phone"
  | "region"
  | "skills"
  | "status";

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
      "View and manage your technician profile information.",
    Bangla:
      "আপনার টেকনিশিয়ান প্রোফাইলের তথ্য দেখুন এবং পরিচালনা করুন।",
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

  region: {
    English: "Region",
    Bangla: "অঞ্চল",
  },

  skills: {
    English: "Skills",
    Bangla: "দক্ষতা",
  },

  role: {
    English: "Role",
    Bangla: "ভূমিকা",
  },

  status: {
    English: "Status",
    Bangla: "স্ট্যাটাস",
  },

  account: {
    English: "Account",
    Bangla: "অ্যাকাউন্ট",
  },

  active: {
    English: "ACTIVE",
    Bangla: "সক্রিয়",
  },

  blocked: {
    English: "BLOCKED",
    Bangla: "ব্লক করা হয়েছে",
  },

  accountActive: {
    English: "Active",
    Bangla: "সক্রিয়",
  },

  accountInactive: {
    English: "Inactive",
    Bangla: "নিষ্ক্রিয়",
  },

  technician: {
    English: "TECHNICIAN",
    Bangla: "টেকনিশিয়ান",
  },

  technicianInformation: {
    English: "Technician Information",
    Bangla: "টেকনিশিয়ান তথ্য",
  },

  accountInformation: {
    English: "Account Information",
    Bangla: "অ্যাকাউন্ট তথ্য",
  },

  profilePhoto: {
    English: "Profile Photo",
    Bangla: "প্রোফাইল ছবি",
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

  fullNamePlaceholder: {
    English: "Enter your full name",
    Bangla: "আপনার পূর্ণ নাম লিখুন",
  },

  phonePlaceholder: {
    English: "Enter your phone number",
    Bangla: "আপনার ফোন নম্বর লিখুন",
  },

  regionPlaceholder: {
    English: "e.g. Dhaka",
    Bangla: "যেমন: ঢাকা",
  },

  skillsPlaceholder: {
    English:
      "Installation, Maintenance, Repair...",
    Bangla:
      "ইনস্টলেশন, রক্ষণাবেক্ষণ, মেরামত...",
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
      "নতুন পাসওয়ার্ড এবং নিশ্চিতকরণ মিলছে না।",
  },

  passwordSameAsCurrent: {
    English:
      "New password must be different from the current one.",
    Bangla:
      "নতুন পাসওয়ার্ড বর্তমান পাসওয়ার্ড থেকে আলাদা হতে হবে।",
  },

  passwordUpdateFailed: {
    English:
      "Couldn't update your password. Please try again.",
    Bangla:
      "পাসওয়ার্ড আপডেট করা যায়নি। আবার চেষ্টা করুন।",
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
      "Couldn't upload that photo. Please try again.",
    Bangla:
      "ছবি আপলোড করা যায়নি। আবার চেষ্টা করুন।",
  },

  profileUpdated: {
    English:
      "Profile updated successfully!",
    Bangla:
      "প্রোফাইল সফলভাবে আপডেট হয়েছে!",
  },

  profileUpdateFailed: {
    English:
      "Failed to update profile.",
    Bangla:
      "প্রোফাইল আপডেট করা যায়নি।",
  },

  passwordUpdated: {
    English:
      "Password updated successfully!",
    Bangla:
      "পাসওয়ার্ড সফলভাবে আপডেট হয়েছে!",
  },

  passwordHandlerMissing: {
    English:
      "Password update handler is not configured.",
    Bangla:
      "পাসওয়ার্ড আপডেট সিস্টেম কনফিগার করা হয়নি।",
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

  supportText: {
    English: "Need help? Visit our",
    Bangla: "সাহায্য দরকার? আমাদের",
  },

  supportCenter: {
    English: "Support Center",
    Bangla: "সাপোর্ট সেন্টার",
  },

  cannotChangeStatus: {
    English:
      "Status can only be changed by an administrator.",
    Bangla:
      "স্ট্যাটাস শুধুমাত্র অ্যাডমিন পরিবর্তন করতে পারবেন।",
  },
} as const;

type TranslationKey =
  keyof typeof TRANSLATIONS;

/* =========================================================
   TRANSLATION HELPER
========================================================= */

function t(
  key: TranslationKey,
  language: TechnicianLanguage
): string {
  return TRANSLATIONS[key][language];
}

/* =========================================================
   PASSWORD RULES
========================================================= */

function getPasswordRules(
  language: TechnicianLanguage
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
   DRAFT TYPE
========================================================= */

type TechnicianDraft = {
  fullName: string;
  email: string;
  phone: string;
  region: string;
  skills: string;
  role: string;
  status: string;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function ProfilePage({
  onChangePassword,
}: {
  onChangePassword?: (payload: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void> | void;
}) {
  const {
    technician,
    language,
    updateTechnician,
    uploadProfilePhoto,
    loading,
    saving,
  } = useTechnician();

  /* =======================================================
     REF
  ======================================================= */

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  /* =======================================================
     PHOTO
  ======================================================= */

  const [uploading, setUploading] =
    useState(false);

  const [uploadError, setUploadError] =
    useState<string | null>(null);

  /* =======================================================
     EDIT
  ======================================================= */

  const [isEditing, setIsEditing] =
    useState(false);

  const [draft, setDraft] =
    useState<TechnicianDraft>(() =>
      technicianToDraft(technician)
    );

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
     PHOTO CHANGE
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

    if (!file.type.startsWith("image/")) {
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
      MAX_AVATAR_SIZE_MB * 1024 * 1024
    ) {
      setUploadError(
        t(
          "photoTooLarge",
          language
        )
      );
      return;
    }

    setUploading(true);

    try {
      await uploadProfilePhoto(file);
    } catch {
      setUploadError(
        t(
          "photoUploadFailed",
          language
        )
      );
    } finally {
      setUploading(false);
    }
  }

  /* =======================================================
     START EDITING
  ======================================================= */

  function startEditing() {
    setDraft(
      technicianToDraft(technician)
    );

    setIsEditing(true);
  }

  /* =======================================================
     CANCEL EDITING
  ======================================================= */

  function cancelEditing() {
    setDraft(
      technicianToDraft(technician)
    );

    setIsEditing(false);
  }

  /* =======================================================
     UPDATE DRAFT
  ======================================================= */

  function updateDraft(
    field: EditableField,
    value: string
  ) {
    setDraft((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  /* =======================================================
     SAVE PROFILE

     IMPORTANT:
     Status is intentionally NOT sent.
     Technicians cannot change their own status.
  ======================================================= */

  async function saveProfile() {
    try {
      await updateTechnician({
        fullName: draft.fullName.trim(),
        phone: draft.phone.trim(),
        region: draft.region.trim(),
        skills: draft.skills.trim(),
      });

      setIsEditing(false);

      toast.success(
        t(
          "profileUpdated",
          language
        ),
        {
          position: "bottom-center",
          autoClose: 4000,
          theme: "light",
          transition: Bounce,
        }
      );
    } catch (error) {
      console.error(
        "Failed to update technician profile:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : t(
              "profileUpdateFailed",
              language
            ),
        {
          position: "bottom-center",
          autoClose: 5000,
          theme: "light",
        }
      );
    }
  }

  /* =======================================================
     START PASSWORD CHANGE
  ======================================================= */

  function startChangingPassword() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError(null);
    setIsChangingPassword(true);
  }

  /* =======================================================
     CANCEL PASSWORD CHANGE
  ======================================================= */

  function cancelChangingPassword() {
    setIsChangingPassword(false);
    setPasswordError(null);
  }

  /* =======================================================
     PASSWORD CHANGE
  ======================================================= */

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
        (rule) => !rule.test(newPassword)
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
      if (!onChangePassword) {
        throw new Error(
          t(
            "passwordHandlerMissing",
            language
          )
        );
      }

      await onChangePassword({
        currentPassword,
        newPassword,
      });

      toast.success(
        t(
          "passwordUpdated",
          language
        ),
        {
          position: "bottom-center",
          autoClose: 4000,
          theme: "light",
          transition: Bounce,
        }
      );

      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(
        "Password update error:",
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
     INITIALS
  ======================================================= */

  const userInitials =
    technician.fullName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(
        (part) =>
          part.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase() || "T";

  /* =======================================================
     STATUS TRANSLATION
  ======================================================= */

  function translateStatus(
    status: string
  ) {
    const normalized =
      status.toUpperCase();

    if (normalized === "ACTIVE") {
      return t(
        "active",
        language
      );
    }

    if (normalized === "BLOCKED") {
      return t(
        "blocked",
        language
      );
    }

    return status;
  }

  /* =======================================================
     ROLE TRANSLATION
  ======================================================= */

  function translateRole(
    role: string
  ) {
    if (
      role.toUpperCase() ===
      "TECHNICIAN"
    ) {
      return t(
        "technician",
        language
      );
    }

    return role;
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="mx-auto w-full max-w-5xl">

      {/* ===================================================
          PAGE HEADER
      =================================================== */}

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
            onClick={startEditing}
            disabled={loading}
            className="flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
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
              onClick={cancelEditing}
              disabled={
                saving || loading
              }
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <X className="h-4 w-4" />

              {t(
                "cancel",
                language
              )}
            </button>

            <button
              type="button"
              onClick={saveProfile}
              disabled={
                saving || loading
              }
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
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

      {/* ===================================================
          PROFILE CARD
      =================================================== */}

      <section className="mb-5 rounded-2xl bg-white p-5 shadow-sm sm:p-6">

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">

          {/* Avatar */}

          <div className="flex shrink-0 flex-col items-center gap-3">

            <div className="relative h-28 w-28 overflow-hidden rounded-full bg-blue-100 ring-1 ring-slate-100">

              {technician.profile.profilePhoto ? (
                <img
                  src={
                    technician.profile.profilePhoto
                  }
                  alt={
                    technician.fullName ||
                    "Technician"
                  }
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display =
                      "none";
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-500 text-3xl font-bold text-white">
                  {userInitials}
                </div>
              )}

            </div>

            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              disabled={
                uploading ||
                loading
              }
              className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
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

          <div className="w-full flex-1 space-y-4">

            {!isEditing ? (
              <>
                <InfoRow
                  icon={User}
                  label={t(
                    "fullName",
                    language
                  )}
                  value={
                    technician.fullName ||
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
                    technician.email ||
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
                    technician.phone ||
                    "-"
                  }
                />

                <InfoRow
                  icon={MapPin}
                  label={t(
                    "region",
                    language
                  )}
                  value={
                    technician.profile
                      .region || "-"
                  }
                />

                <InfoRow
                  icon={Wrench}
                  label={t(
                    "skills",
                    language
                  )}
                  value={
                    technician.profile
                      .skills || "-"
                  }
                />

                <InfoRow
                  icon={ShieldCheck}
                  label={t(
                    "role",
                    language
                  )}
                  value={translateRole(
                    technician.role ||
                      "TECHNICIAN"
                  )}
                />

                <StatusRow
                  label={t(
                    "status",
                    language
                  )}
                  value={translateStatus(
                    technician.profile
                      .status ||
                      "ACTIVE"
                  )}
                  isActive={
                    (
                      technician
                        .profile
                        .status ||
                      "ACTIVE"
                    ).toUpperCase() ===
                    "ACTIVE"
                  }
                />
              </>
            ) : (
              <>
                {/* Full Name */}

                <FormRow
                  icon={User}
                  label={t(
                    "fullName",
                    language
                  )}
                  name="fullName"
                  value={
                    draft.fullName
                  }
                  onChange={(value) =>
                    updateDraft(
                      "fullName",
                      value
                    )
                  }
                  placeholder={t(
                    "fullNamePlaceholder",
                    language
                  )}
                  disabled={
                    saving
                  }
                />

                {/* Email - cannot edit */}

                <FormRow
                  icon={Mail}
                  label={t(
                    "email",
                    language
                  )}
                  name="email"
                  type="email"
                  value={
                    draft.email
                  }
                  onChange={() => {}}
                  disabled
                />

                {/* Phone */}

                <FormRow
                  icon={Phone}
                  label={t(
                    "phone",
                    language
                  )}
                  name="phone"
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
                  placeholder={t(
                    "phonePlaceholder",
                    language
                  )}
                  disabled={
                    saving
                  }
                />

                {/* Region */}

                <FormRow
                  icon={MapPin}
                  label={t(
                    "region",
                    language
                  )}
                  name="region"
                  value={
                    draft.region
                  }
                  onChange={(value) =>
                    updateDraft(
                      "region",
                      value
                    )
                  }
                  placeholder={t(
                    "regionPlaceholder",
                    language
                  )}
                  disabled={
                    saving
                  }
                />

                {/* Skills */}

                <TextAreaRow
                  icon={Wrench}
                  label={t(
                    "skills",
                    language
                  )}
                  name="skills"
                  value={
                    draft.skills
                  }
                  onChange={(value) =>
                    updateDraft(
                      "skills",
                      value
                    )
                  }
                  placeholder={t(
                    "skillsPlaceholder",
                    language
                  )}
                  disabled={
                    saving
                  }
                />

                {/* Role - cannot edit */}

                <FormRow
                  icon={ShieldCheck}
                  label={t(
                    "role",
                    language
                  )}
                  name="role"
                  value={translateRole(
                    draft.role
                  )}
                  onChange={() => {}}
                  disabled
                />

                {/* Status - READ ONLY */}

                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">

                  <div className="flex w-28 shrink-0 items-center gap-2 text-sm text-slate-400">
                    <Activity className="h-4 w-4 text-slate-300" />

                    {t(
                      "status",
                      language
                    )}
                  </div>

                  <div className="flex flex-1 items-center gap-3">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        draft.status
                          .toUpperCase() ===
                        "ACTIVE"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {translateStatus(
                        draft.status
                      )}
                    </span>

                    <span className="text-xs text-slate-400">
                      {t(
                        "cannotChangeStatus",
                        language
                      )}
                    </span>

                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ===================================================
          TECHNICIAN INFORMATION
      =================================================== */}

      <section className="mb-5 rounded-2xl bg-white shadow-sm">

        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3.5 sm:px-6">

          <Activity className="h-4 w-4 text-slate-700" />

          <h2 className="text-sm font-semibold text-slate-900">
            {t(
              "technicianInformation",
              language
            )}
          </h2>

        </div>

        <div className="grid grid-cols-1 gap-4 px-5 py-4 sm:grid-cols-2 sm:px-6">

          <InfoCard
            label={t(
              "region",
              language
            )}
            value={
              technician.profile
                .region || "-"
            }
            icon={MapPin}
          />

          <InfoCard
            label={t(
              "status",
              language
            )}
            value={translateStatus(
              technician.profile
                .status ||
                "ACTIVE"
            )}
            icon={Activity}
          />

          <InfoCard
            label={t(
              "role",
              language
            )}
            value={translateRole(
              technician.role ||
                "TECHNICIAN"
            )}
            icon={ShieldCheck}
          />

          <InfoCard
            label={t(
              "account",
              language
            )}
            value={
              technician.isActive
                ? t(
                    "accountActive",
                    language
                  )
                : t(
                    "accountInactive",
                    language
                  )
            }
            icon={User}
          />

        </div>
      </section>

      {/* ===================================================
          ACCOUNT INFORMATION
      =================================================== */}

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
              className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-slate-50"
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
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-slate-600"
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

            {/* Password Rules */}

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
                      className={`flex items-center gap-1.5 text-xs ${
                        passed
                          ? "text-emerald-600"
                          : "text-slate-400"
                      }`}
                    >
                      <Check
                        className={`h-3.5 w-3.5 ${
                          passed
                            ? "opacity-100"
                            : "opacity-30"
                        }`}
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
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
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
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-50"
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

      {/* ===================================================
          SUPPORT
      =================================================== */}

      <p className="pb-2 text-center text-sm text-slate-400">

        {t(
          "supportText",
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
   TECHNICIAN -> DRAFT
========================================================= */

function technicianToDraft(
  technician: TechnicianUser
): TechnicianDraft {
  return {
    fullName:
      technician.fullName || "",

    email:
      technician.email || "",

    phone:
      technician.phone || "",

    region:
      technician.profile.region || "",

    skills:
      technician.profile.skills || "",

    role:
      technician.role ||
      "TECHNICIAN",

    status:
      technician.profile.status ||
      "ACTIVE",
  };
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
  placeholder,
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
  placeholder?: string;
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
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
      />

    </div>
  );
}

/* =========================================================
   TEXTAREA
========================================================= */

function TextAreaRow({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  placeholder,
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
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-4">

      <label
        htmlFor={name}
        className="flex w-28 shrink-0 items-center gap-2 pt-2 text-sm text-slate-400"
      >
        <Icon className="h-4 w-4 shrink-0 text-slate-300" />

        {label}
      </label>

      <textarea
        id={name}
        name={name}
        rows={4}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full flex-1 resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
      />

    </div>
  );
}

/* =========================================================
   STATUS ROW
========================================================= */

function StatusRow({
  label,
  value,
  isActive,
}: {
  label: string;
  value: string;
  isActive: boolean;
}) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">

      <Activity className="h-4 w-4 shrink-0 text-slate-300" />

      <span className="w-20 shrink-0 text-sm text-slate-400 sm:w-28">
        {label}
      </span>

      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
          isActive
            ? "bg-emerald-100 text-emerald-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {value}
      </span>

    </div>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

      <div className="flex items-center gap-2 text-xs text-slate-400">

        <Icon className="h-4 w-4 text-blue-500" />

        {label}

      </div>

      <p className="mt-2 break-words text-sm font-semibold text-slate-800">
        {value}
      </p>

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
      .replace(/\s+/g, "-")
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
        className="w-full flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />

    </div>
  );
}