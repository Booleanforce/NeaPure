// app/dashboard/Customer-Dashboard/my-profile/ProfilePage.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from "@/features/customer_dashboard/api/customerDashboardApi";

const MAX_AVATAR_SIZE_MB = 5;

const TRANSLATIONS = {
  pageTitle: { English: "My Profile", Bangla: "আমার প্রোফাইল" },
  pageSubtitle: {
    English: "View and manage your personal information.",
    Bangla: "আপনার ব্যক্তিগত তথ্য দেখুন এবং পরিচালনা করুন।",
  },
  editProfile: { English: "Edit Profile", Bangla: "প্রোফাইল সম্পাদনা" },
  cancel: { English: "Cancel", Bangla: "বাতিল" },
  save: { English: "Save", Bangla: "সংরক্ষণ" },
  saving: { English: "Saving...", Bangla: "সংরক্ষণ হচ্ছে..." },
  changePhoto: { English: "Change Photo", Bangla: "ছবি পরিবর্তন" },
  uploading: { English: "Uploading...", Bangla: "আপলোড হচ্ছে..." },
  fullName: { English: "Full Name", Bangla: "পূর্ণ নাম" },
  email: { English: "Email", Bangla: "ইমেইল" },
  phone: { English: "Phone", Bangla: "ফোন" },
  location: { English: "Location", Bangla: "অবস্থান" },
  role: { English: "Role", Bangla: "ভূমিকা" },
  fullNamePlaceholder: {
    English: "Enter your full name",
    Bangla: "আপনার পূর্ণ নাম লিখুন",
  },
  emailPlaceholder: { English: "you@example.com", Bangla: "you@example.com" },
  phonePlaceholder: {
    English: "+880 1XX-XXXXXXX",
    Bangla: "+৮৮০ ১XX-XXXXXXX",
  },
  locationPlaceholder: { English: "City, Country", Bangla: "শহর, দেশ" },
  accountInformation: {
    English: "Account Information",
    Bangla: "অ্যাকাউন্ট তথ্য",
  },
  password: { English: "Password", Bangla: "পাসওয়ার্ড" },
  changePassword: { English: "Change Password", Bangla: "পাসওয়ার্ড পরিবর্তন" },
  updatePassword: { English: "Update Password", Bangla: "পাসওয়ার্ড আপডেট" },
  updating: { English: "Updating...", Bangla: "আপডেট হচ্ছে..." },
  show: { English: "Show", Bangla: "দেখান" },
  hide: { English: "Hide", Bangla: "লুকান" },
  currentPassword: { English: "Current Password", Bangla: "বর্তমান পাসওয়ার্ড" },
  newPassword: { English: "New Password", Bangla: "নতুন পাসওয়ার্ড" },
  confirmNewPassword: {
    English: "Confirm New Password",
    Bangla: "নতুন পাসওয়ার্ড নিশ্চিত করুন",
  },
  preferences: { English: "Preferences", Bangla: "পছন্দসমূহ" },
  language: { English: "Language", Bangla: "ভাষা" },
  needHelp: { English: "Need help? Visit our", Bangla: "সাহায্য দরকার? আমাদের" },
  supportCenter: { English: "Support Center", Bangla: "সাপোর্ট সেন্টার" },
  enterCurrentPassword: {
    English: "Enter your current password.",
    Bangla: "আপনার বর্তমান পাসওয়ার্ড লিখুন।",
  },
  passwordNeeds: { English: "Password needs:", Bangla: "পাসওয়ার্ডে প্রয়োজন:" },
  passwordsDontMatch: {
    English: "New password and confirmation don't match.",
    Bangla: "নতুন পাসওয়ার্ড ও নিশ্চিতকরণ মিলছে না।",
  },
  passwordSameAsCurrent: {
    English: "New password must be different from the current one.",
    Bangla: "নতুন পাসওয়ার্ড বর্তমান পাসওয়ার্ড থেকে ভিন্ন হতে হবে।",
  },
  passwordUpdateFailed: {
    English: "Couldn't update your password. Please try again.",
    Bangla: "পাসওয়ার্ড আপডেট করা যায়নি। আবার চেষ্টা করুন।",
  },
  photoInvalidType: {
    English: "Please choose an image file.",
    Bangla: "অনুগ্রহ করে একটি ছবি ফাইল নির্বাচন করুন।",
  },
  photoTooLarge: {
    English: `Image must be under ${MAX_AVATAR_SIZE_MB}MB.`,
    Bangla: `ছবির আকার অবশ্যই ${MAX_AVATAR_SIZE_MB}MB এর কম হতে হবে।`,
  },
  photoUploadFailed: {
    English: "Couldn't upload that photo. Please try again.",
    Bangla: "ছবি আপলোড করা যায়নি। আবার চেষ্টা করুন।",
  },
  ruleLength: { English: "8-16 characters", Bangla: "৮-১৬ অক্ষর" },
  ruleUppercase: {
    English: "One uppercase letter",
    Bangla: "একটি বড় হাতের অক্ষর",
  },
  ruleLowercase: {
    English: "One lowercase letter",
    Bangla: "একটি ছোট হাতের অক্ষর",
  },
  ruleNumber: { English: "One number", Bangla: "একটি সংখ্যা" },
  ruleSpecial: {
    English: "One special character",
    Bangla: "একটি বিশেষ চিহ্ন",
  },
} as const;

type TranslationKey = keyof typeof TRANSLATIONS;

function t(key: TranslationKey, language: "English" | "Bangla"): string {
  return TRANSLATIONS[key][language];
}

function getPasswordRules(
  language: "English" | "Bangla"
): { key: TranslationKey; label: string; test: (v: string) => boolean }[] {
  return [
    { key: "ruleLength", label: t("ruleLength", language), test: (v) => v.length >= 8 && v.length <= 16 },
    { key: "ruleUppercase", label: t("ruleUppercase", language), test: (v) => /[A-Z]/.test(v) },
    { key: "ruleLowercase", label: t("ruleLowercase", language), test: (v) => /[a-z]/.test(v) },
    { key: "ruleNumber", label: t("ruleNumber", language), test: (v) => /[0-9]/.test(v) },
    { key: "ruleSpecial", label: t("ruleSpecial", language), test: (v) => /[^A-Za-z0-9]/.test(v) },
  ];
}

const profileSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  location: z.string().min(1, "Location is required"),
  role: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .regex(/[A-Z]/, "Needs uppercase letter")
    .regex(/[a-z]/, "Needs lowercase letter")
    .regex(/[0-9]/, "Needs number")
    .regex(/[^A-Za-z0-9]/, "Needs special character"),
  confirmPassword: z.string().min(1, "Confirm password is required")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine((data) => data.newPassword !== data.currentPassword, {
  message: "New password must be different",
  path: ["newPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ProfilePage({
  onChangePassword,
}: {
  onChangePassword?: (payload: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void> | void;
}) {
  const { data: profile, isLoading } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [uploadAvatar] = useUploadAvatarMutation();
  
  const lang = profile?.language || "English";

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState(false);

  const passwordRules = getPasswordRules(lang);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      role: "",
    }
  });

  const { register: registerPwd, handleSubmit: handleSubmitPwd, reset: resetPwd, watch: watchPwd, formState: { errors: errorsPwd } } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
  });

  const newPasswordVal = watchPwd("newPassword");

  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        role: profile.role,
      });
    }
  }, [profile, reset]);

  if (isLoading || !profile) {
    return <div className="p-8 text-center text-slate-500">Loading...</div>;
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploadError(null);

    if (!file.type.startsWith("image/")) {
      setUploadError(t("photoInvalidType", lang));
      return;
    }
    if (file.size > MAX_AVATAR_SIZE_MB * 1024 * 1024) {
      setUploadError(t("photoTooLarge", lang));
      return;
    }

    setUploading(true);
    try {
      await uploadAvatar(file).unwrap();
    } catch {
      setUploadError(t("photoUploadFailed", lang));
    } finally {
      setUploading(false);
    }
  }

  function startEditing() {
    setIsEditing(true);
  }

  function cancelEditing() {
    setIsEditing(false);
    if (profile) {
      reset({
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        role: profile.role,
      });
    }
  }

  const saveProfile = async (data: ProfileFormData) => {
    setSaving(true);
    try {
      await updateProfile(data).unwrap();
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  function handleLanguageChange(language: "English" | "Bangla") {
    updateProfile({ language }).unwrap();
  }

  function startChangingPassword() {
    resetPwd();
    setPasswordError(null);
    setIsChangingPassword(true);
  }

  function cancelChangingPassword() {
    setIsChangingPassword(false);
  }

  const submitPasswordChange = async (data: PasswordFormData) => {
    setPasswordError(null);
    setPasswordSaving(true);
    try {
      await onChangePassword?.({ currentPassword: data.currentPassword, newPassword: data.newPassword });
      setIsChangingPassword(false);
      resetPwd();
    } catch {
      setPasswordError(t("passwordUpdateFailed", lang));
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            {t("pageTitle", lang)}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {t("pageSubtitle", lang)}
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={startEditing}
            className="flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700"
          >
            <Pencil className="h-4 w-4 shrink-0" />
            {t("editProfile", lang)}
          </button>
        ) : (
          <div className="flex w-fit items-center gap-2">
            <button
              onClick={cancelEditing}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <X className="h-4 w-4 shrink-0" />
              {t("cancel", lang)}
            </button>
            <button
              onClick={handleSubmit(saveProfile)}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-50"
            >
              <Check className="h-4 w-4 shrink-0" />
              {saving ? t("saving", lang) : t("save", lang)}
            </button>
          </div>
        )}
      </div>

      {/* Profile card */}
      <section className="mb-4 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
          {/* Avatar */}
          <div className="flex shrink-0 flex-col items-center gap-3">
            <div className="h-28 w-28 overflow-hidden rounded-full bg-slate-200 ring-1 ring-slate-100">
              <img
                src={profile.avatarUrl}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Camera className="h-3.5 w-3.5 shrink-0" />
              {uploading ? t("uploading", lang) : t("changePhoto", lang)}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            {uploadError && (
              <p className="max-w-[9rem] text-center text-xs text-red-500">
                {uploadError}
              </p>
            )}
          </div>

          {/* Info / Form */}
          <div className="w-full flex-1 space-y-4 sm:pt-1">
            {!isEditing ? (
              <>
                <InfoRow icon={User} label={t("fullName", lang)} value={profile.fullName} />
                <InfoRow icon={Mail} label={t("email", lang)} value={profile.email} />
                <InfoRow icon={Phone} label={t("phone", lang)} value={profile.phone} />
                <InfoRow icon={MapPin} label={t("location", lang)} value={profile.location} />
                <InfoRow icon={ShieldCheck} label={t("role", lang)} value={profile.role} />
              </>
            ) : (
              <form id="profile-form" onSubmit={handleSubmit(saveProfile)} className="space-y-4">
                <FormRow
                  icon={User}
                  label={t("fullName", lang)}
                  {...register("fullName")}
                  placeholder={t("fullNamePlaceholder", lang)}
                  error={errors.fullName?.message}
                />
                <FormRow
                  icon={Mail}
                  label={t("email", lang)}
                  type="email"
                  {...register("email")}
                  placeholder={t("emailPlaceholder", lang)}
                  disabled
                  error={errors.email?.message}
                />
                <FormRow
                  icon={Phone}
                  label={t("phone", lang)}
                  type="tel"
                  {...register("phone")}
                  placeholder={t("phonePlaceholder", lang)}
                  error={errors.phone?.message}
                />
                <FormRow
                  icon={MapPin}
                  label={t("location", lang)}
                  {...register("location")}
                  placeholder={t("locationPlaceholder", lang)}
                  error={errors.location?.message}
                />
                <FormRow
                  icon={ShieldCheck}
                  label={t("role", lang)}
                  {...register("role")}
                  disabled
                  error={errors.role?.message}
                />
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Account information */}
      <section className="mb-4 rounded-2xl bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3.5 sm:px-6">
          <Lock className="h-4 w-4 shrink-0 text-slate-700" />
          <h2 className="text-sm font-semibold text-slate-900">
            {t("accountInformation", lang)}
          </h2>
        </div>

        {!isChangingPassword ? (
          <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-xs text-slate-400">{t("password", lang)}</p>
              <p className="mt-2 tracking-widest text-slate-500">
                ••••••••••••
              </p>
            </div>
            <button
              onClick={startChangingPassword}
              className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-slate-50"
            >
              <Lock className="h-3.5 w-3.5 shrink-0" />
              {t("changePassword", lang)}
            </button>
          </div>
        ) : (
          <form id="password-form" onSubmit={handleSubmitPwd(submitPasswordChange)} className="space-y-4 px-5 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700">
                {t("changePassword", lang)}
              </p>
              <button
                type="button"
                onClick={() => setShowPasswords((v) => !v)}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-600"
              >
                {showPasswords ? (
                  <EyeOff className="h-3.5 w-3.5" />
                ) : (
                  <Eye className="h-3.5 w-3.5" />
                )}
                {showPasswords ? t("hide", lang) : t("show", lang)}
              </button>
            </div>

            <PasswordField
              label={t("currentPassword", lang)}
              {...registerPwd("currentPassword")}
              show={showPasswords}
              autoComplete="current-password"
              error={errorsPwd.currentPassword?.message}
            />
            <PasswordField
              label={t("newPassword", lang)}
              {...registerPwd("newPassword")}
              show={showPasswords}
              autoComplete="new-password"
              error={errorsPwd.newPassword?.message}
            />
            <PasswordField
              label={t("confirmNewPassword", lang)}
              {...registerPwd("confirmPassword")}
              show={showPasswords}
              autoComplete="new-password"
              error={errorsPwd.confirmPassword?.message}
            />

            {/* Live rule checklist */}
            <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {passwordRules.map((rule) => {
                const passed = rule.test(newPasswordVal || "");
                return (
                  <li
                    key={rule.key}
                    className={`flex items-center gap-1.5 text-xs ${
                      passed ? "text-emerald-600" : "text-slate-400"
                    }`}
                  >
                    <Check
                      className={`h-3.5 w-3.5 shrink-0 ${
                        passed ? "opacity-100" : "opacity-30"
                      }`}
                    />
                    {rule.label}
                  </li>
                );
              })}
            </ul>

            {passwordError && (
              <p className="text-xs text-red-500">{passwordError}</p>
            )}

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={cancelChangingPassword}
                disabled={passwordSaving}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                <X className="h-4 w-4 shrink-0" />
                {t("cancel", lang)}
              </button>
              <button
                type="submit"
                disabled={passwordSaving}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-50"
              >
                <Check className="h-4 w-4 shrink-0" />
                {passwordSaving ? t("updating", lang) : t("updatePassword", lang)}
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Preferences */}
      <section className="mb-4 rounded-2xl bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3.5 sm:px-6">
          <Settings className="h-4 w-4 shrink-0 text-slate-700" />
          <h2 className="text-sm font-semibold text-slate-900">
            {t("preferences", lang)}
          </h2>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 sm:px-6">
          <span className="text-sm text-slate-400">{t("language", lang)}</span>
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
            {(["English", "Bangla"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleLanguageChange(option)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  lang === option
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {option === "English" ? "English" : "বাংলা"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <p className="pb-2 text-center text-sm text-slate-400">
        {t("needHelp", lang)}{" "}
        <a href="#" className="font-semibold text-blue-600 hover:underline">
          {t("supportCenter", lang)}
        </a>
      </p>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Icon className="h-4 w-4 shrink-0 text-slate-300" />
      <span className="w-20 shrink-0 text-sm text-slate-400 sm:w-28">
        {label}
      </span>
      <span className="text-sm font-medium text-slate-800">{value}</span>
    </div>
  );
}

const FormRow = React.forwardRef<
  HTMLInputElement,
  {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ icon: Icon, label, name, type = "text", placeholder, disabled, error, ...rest }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
      <label
        htmlFor={name}
        className="flex w-28 shrink-0 items-center gap-2 text-sm text-slate-400"
      >
        <Icon className="h-4 w-4 shrink-0 text-slate-300" />
        {label}
      </label>
      <div className="w-full flex-1 flex flex-col">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          ref={ref}
          {...rest}
          className="w-full flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
        />
        {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
      </div>
    </div>
  );
});
FormRow.displayName = "FormRow";

const PasswordField = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    show: boolean;
    autoComplete: string;
    name: string;
    error?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, show, autoComplete, name, error, ...rest }, ref) => {
  const id = `pwd-${label.replace(/\s+/g, "-")}`;
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
      <label
        htmlFor={id}
        className="w-40 shrink-0 text-sm text-slate-400 sm:w-48"
      >
        {label}
      </label>
      <div className="w-full flex-1 flex flex-col">
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          ref={ref}
          {...rest}
          className="w-full flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
        {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
      </div>
    </div>
  );
});
PasswordField.displayName = "PasswordField";