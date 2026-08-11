// app/dashboard/Customer-Dashboard/my-profile/ProfilePage.tsx
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
  Settings,
  Pencil,
  Check,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { useUser, type CustomerProfile } from "../../context/UserContext";

// Fields the "Edit Profile" form exposes. Role is included as a field
// per the design, but is rendered as a disabled input since role changes
// normally go through an admin flow, not self-service.
type EditableField = "fullName" | "email" | "phone" | "location" | "role";

const MAX_AVATAR_SIZE_MB = 5;

// ---------------------------------------------------------------------
// i18n: every string on this page is looked up through t(key) below,
// keyed off profile.language. Add more languages by adding another
// column to TRANSLATIONS.
// ---------------------------------------------------------------------
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

// Password rules: 8-16 chars, at least one uppercase, one lowercase,
// one digit, one special character.
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

// NOTE: outer page padding (px/py) and background now come from
// app/dashboard/layout.tsx's <main>. This component only handles
// its own internal layout so every dashboard page gets consistent
// spacing "for free" instead of re-declaring it per page.
//
// Profile data now comes from the shared UserContext (see
// app/dashboard/context/UserContext.tsx) instead of local component
// state, so any change here (e.g. a new avatar) is immediately visible
// everywhere else that reads the context, like Topbar. The context is
// also responsible for actually persisting changes to the backend, so
// they survive a refresh.
export default function ProfilePage({
  onChangePassword,
}: {
  // Called with { currentPassword, newPassword } when the user submits
  // a valid new password. Wire this to your auth API.
  onChangePassword?: (payload: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void> | void;
}) {
  const { profile, updateProfile } = useUser();
  const lang = profile.language;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<CustomerProfile>(profile);

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordRules = getPasswordRules(lang);

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // Reset the input so selecting the same file again still fires onChange.
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
      // FileReader -> base64 data URL. This shows a reliable local
      // preview immediately (and updates it everywhere via context,
      // e.g. the Topbar avatar) while the real upload happens.
      const localPreview = await readFileAsDataUrl(file);
      await updateProfile({ avatarUrl: localPreview });

      // Now actually upload the file to storage and persist the
      // resulting hosted URL, swapping out the temporary data URL.
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await fetch("/api/profile/avatar", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(`Upload failed (${res.status})`);
      const { url } = (await res.json()) as { url: string };
      if (url) {
        await updateProfile({ avatarUrl: url });
      }
    } catch {
      setUploadError(t("photoUploadFailed", lang));
    } finally {
      setUploading(false);
    }
  }

  function startEditing() {
    setDraft(profile);
    setIsEditing(true);
  }

  function cancelEditing() {
    setIsEditing(false);
  }

  function updateDraft(field: EditableField, value: string) {
    setDraft((prev) => ({ ...prev, [field]: value }));
  }

  async function saveProfile() {
    setSaving(true);
    try {
      await updateProfile(draft);
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  }

  function handleLanguageChange(language: "English" | "Bangla") {
    updateProfile({ language });
    setDraft((prev) => ({ ...prev, language }));
  }

  function startChangingPassword() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError(null);
    setIsChangingPassword(true);
  }

  function cancelChangingPassword() {
    setIsChangingPassword(false);
  }

  async function submitPasswordChange() {
    setPasswordError(null);

    if (!currentPassword) {
      setPasswordError(t("enterCurrentPassword", lang));
      return;
    }
    const failedRule = passwordRules.find((rule) => !rule.test(newPassword));
    if (failedRule) {
      setPasswordError(`${t("passwordNeeds", lang)} ${failedRule.label}.`);
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError(t("passwordsDontMatch", lang));
      return;
    }
    if (newPassword === currentPassword) {
      setPasswordError(t("passwordSameAsCurrent", lang));
      return;
    }

    setPasswordSaving(true);
    try {
      await onChangePassword?.({ currentPassword, newPassword });
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setPasswordError(t("passwordUpdateFailed", lang));
    } finally {
      setPasswordSaving(false);
    }
  }

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
              onClick={saveProfile}
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
              <>
                <FormRow
                  icon={User}
                  label={t("fullName", lang)}
                  name="fullName"
                  value={draft.fullName}
                  onChange={(v) => updateDraft("fullName", v)}
                  placeholder={t("fullNamePlaceholder", lang)}
                />
                <FormRow
                  icon={Mail}
                  label={t("email", lang)}
                  name="email"
                  type="email"
                  value={draft.email}
                  onChange={(v) => updateDraft("email", v)}
                  placeholder={t("emailPlaceholder", lang)}
                />
                <FormRow
                  icon={Phone}
                  label={t("phone", lang)}
                  name="phone"
                  type="tel"
                  value={draft.phone}
                  onChange={(v) => updateDraft("phone", v)}
                  placeholder={t("phonePlaceholder", lang)}
                />
                <FormRow
                  icon={MapPin}
                  label={t("location", lang)}
                  name="location"
                  value={draft.location}
                  onChange={(v) => updateDraft("location", v)}
                  placeholder={t("locationPlaceholder", lang)}
                />
                <FormRow
                  icon={ShieldCheck}
                  label={t("role", lang)}
                  name="role"
                  value={draft.role}
                  onChange={(v) => updateDraft("role", v)}
                  disabled
                />
              </>
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
          <div className="space-y-4 px-5 py-4 sm:px-6">
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
              value={currentPassword}
              onChange={setCurrentPassword}
              show={showPasswords}
              autoComplete="current-password"
            />
            <PasswordField
              label={t("newPassword", lang)}
              value={newPassword}
              onChange={setNewPassword}
              show={showPasswords}
              autoComplete="new-password"
            />
            <PasswordField
              label={t("confirmNewPassword", lang)}
              value={confirmPassword}
              onChange={setConfirmPassword}
              show={showPasswords}
              autoComplete="new-password"
            />

            {/* Live rule checklist */}
            <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {passwordRules.map((rule) => {
                const passed = rule.test(newPassword);
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
                onClick={cancelChangingPassword}
                disabled={passwordSaving}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                <X className="h-4 w-4 shrink-0" />
                {t("cancel", lang)}
              </button>
              <button
                onClick={submitPasswordChange}
                disabled={passwordSaving}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-50"
              >
                <Check className="h-4 w-4 shrink-0" />
                {passwordSaving ? t("updating", lang) : t("updatePassword", lang)}
              </button>
            </div>
          </div>
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

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
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
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
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
        onChange={(e) => onChange(e.target.value)}
        className="w-full flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
      />
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  show,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  autoComplete: string;
}) {
  const id = `pwd-${label.replace(/\s+/g, "-")}`;
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
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="w-full flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}