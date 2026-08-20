/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Users,
  ShieldCheck,
  UserCog,
  Store,
  Wrench,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  UserRound,
  RefreshCw,
  Eye,
  Trash2,
  X,
  AlertTriangle,
  Copy,
  Check,
} from "lucide-react";

import {
  apiClient,
  ApiError,
} from "../../../services/apiClient";

import {
  useAdmin,
  type AdminLanguage,
} from "../context/AdminContext";

/* =========================================================
   TYPES
========================================================= */

type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "OPERATIONS_ADMIN"
  | "OPERATION_ADMIN"
  | "DEALER"
  | "CUSTOMER"
  | "TECHNICIAN"
  | string;

interface UserRecord {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  role: UserRole;
  is_active?: boolean;
  photo?: string | null;
  language?: "en" | "bn" | null;
  created_at?: string | null;
  updated_at?: string | null;
}

type UserGroupKey =
  | "superAdmin"
  | "operationsAdmin"
  | "dealers"
  | "customers"
  | "technicians";

interface UserGroup {
  key: UserGroupKey;
  title: string;
  icon: React.ElementType;
  users: UserRecord[];
  color: string;
  iconBg: string;
}

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  pageTitle: {
    English: "User Management",
    Bangla: "ইউজার ম্যানেজমেন্ট",
  },

  pageSubtitle: {
    English:
      "View and manage users by their account role.",
    Bangla:
      "অ্যাকাউন্টের ভূমিকা অনুযায়ী সকল ব্যবহারকারী দেখুন ও পরিচালনা করুন।",
  },

  search: {
    English: "Search users...",
    Bangla: "ইউজার খুঁজুন...",
  },

  allUsers: {
    English: "All Users",
    Bangla: "সকল ইউজার",
  },

  superAdmin: {
    English: "Super Admin",
    Bangla: "সুপার অ্যাডমিন",
  },

  operationsAdmin: {
    English: "Operations Admin",
    Bangla: "অপারেশনস অ্যাডমিন",
  },

  dealers: {
    English: "Dealers",
    Bangla: "ডিলার",
  },

  customers: {
    English: "Customers",
    Bangla: "গ্রাহক",
  },

  technicians: {
    English: "Technicians",
    Bangla: "টেকনিশিয়ান",
  },

  noUsers: {
    English: "No users found.",
    Bangla: "কোনো ইউজার পাওয়া যায়নি।",
  },

  active: {
    English: "Active",
    Bangla: "সক্রিয়",
  },

  inactive: {
    English: "Inactive",
    Bangla: "নিষ্ক্রিয়",
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

  total: {
    English: "Total",
    Bangla: "মোট",
  },

  users: {
    English: "users",
    Bangla: "জন",
  },

  loading: {
    English: "Loading users...",
    Bangla: "ইউজার লোড হচ্ছে...",
  },

  failed: {
    English:
      "Failed to load users. Please try again.",
    Bangla:
      "ইউজার লোড করা যায়নি। আবার চেষ্টা করুন।",
  },

  retry: {
    English: "Retry",
    Bangla: "আবার চেষ্টা করুন",
  },

  viewDetails: {
    English: "View Details",
    Bangla: "বিস্তারিত দেখুন",
  },

  delete: {
    English: "Delete",
    Bangla: "ডিলিট",
  },

  deleteUser: {
    English: "Delete User",
    Bangla: "ইউজার ডিলিট করুন",
  },

  deleteConfirm: {
    English:
      "Are you sure you want to permanently delete this user?",
    Bangla:
      "আপনি কি নিশ্চিত যে এই ইউজারকে স্থায়ীভাবে ডিলিট করতে চান?",
  },

  deleteWarning: {
    English:
      "This action cannot be undone. All data related to this user may be permanently removed.",
    Bangla:
      "এই কাজটি আর পূর্বাবস্থায় ফেরানো যাবে না। এই ইউজারের সাথে সম্পর্কিত ডেটা স্থায়ীভাবে মুছে যেতে পারে।",
  },

  cancel: {
    English: "Cancel",
    Bangla: "বাতিল",
  },

  deleting: {
    English: "Deleting...",
    Bangla: "ডিলিট হচ্ছে...",
  },

  deleted: {
    English:
      "User deleted successfully.",
    Bangla:
      "ইউজার সফলভাবে ডিলিট হয়েছে।",
  },

  deleteFailed: {
    English:
      "Failed to delete user.",
    Bangla:
      "ইউজার ডিলিট করা যায়নি।",
  },

  noPhone: {
    English: "No phone number",
    Bangla: "ফোন নম্বর নেই",
  },

  noLocation: {
    English: "No location",
    Bangla: "অবস্থান নেই",
  },

  accountId: {
    English: "Account ID",
    Bangla: "অ্যাকাউন্ট আইডি",
  },

  createdAt: {
    English: "Created At",
    Bangla: "তৈরি হয়েছে",
  },

  updatedAt: {
    English: "Updated At",
    Bangla: "আপডেট হয়েছে",
  },

  accountStatus: {
    English: "Account Status",
    Bangla: "অ্যাকাউন্ট স্ট্যাটাস",
  },

  close: {
    English: "Close",
    Bangla: "বন্ধ করুন",
  },

  copied: {
    English: "Copied",
    Bangla: "কপি হয়েছে",
  },

  copy: {
    English: "Copy",
    Bangla: "কপি",
  },

  cannotDeleteSelf: {
    English:
      "You cannot delete your own account.",
    Bangla:
      "আপনি নিজের অ্যাকাউন্ট ডিলিট করতে পারবেন না।",
  },
} as const;

type TranslationKey =
  keyof typeof TRANSLATIONS;

/* =========================================================
   TRANSLATION HELPER
========================================================= */

function t(
  key: TranslationKey,
  language: AdminLanguage
): string {
  return TRANSLATIONS[key][language];
}

/* =========================================================
   ROLE NORMALIZATION
========================================================= */

function normalizeRole(
  role: string
): string {
  return role
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "_");
}

/* =========================================================
   ROLE TRANSLATION
========================================================= */

function translateRole(
  role: string,
  language: AdminLanguage
): string {
  const normalized =
    normalizeRole(role);

  switch (normalized) {
    case "SUPER_ADMIN":
      return t(
        "superAdmin",
        language
      );

    case "ADMIN":
    case "OPERATIONS_ADMIN":
    case "OPERATION_ADMIN":
      return t(
        "operationsAdmin",
        language
      );

    case "DEALER":
      return t(
        "dealers",
        language
      );

    case "CUSTOMER":
      return t(
        "customers",
        language
      );

    case "TECHNICIAN":
      return t(
        "technicians",
        language
      );

    default:
      return (
        role
          ?.replace(/_/g, " ")
          .replace(
            /\b\w/g,
            (character) =>
              character.toUpperCase()
          ) || "-"
      );
  }
}

/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(
  value: string | null | undefined
): string {
  if (!value) {
    return "-";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

/* =========================================================
   USER CARD
========================================================= */

function UserCard({
  user,
  language,
  currentUserId,
  onView,
  onDelete,
}: {
  user: UserRecord;
  language: AdminLanguage;
  currentUserId: string | null;
  onView: (
    user: UserRecord
  ) => void;
  onDelete: (
    user: UserRecord
  ) => void;
}) {
  const [
    imageError,
    setImageError,
  ] = useState(false);

  const initials =
    user.full_name
      ?.trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(
        (part) =>
          part.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const isActive =
    user.is_active !== false;

  const role =
    translateRole(
      user.role,
      language
    );

  const isCurrentUser =
    currentUserId !== null &&
    String(user.id) ===
      String(currentUserId);

  return (
    <div
      className="
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-4
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex min-w-0 items-start gap-3">

        {/* Avatar */}

        <div className="shrink-0">
          {user.photo &&
          !imageError ? (
            <img
              src={user.photo}
              alt={
                user.full_name ||
                "User"
              }
              className="
                h-11
                w-11
                rounded-full
                object-cover
                ring-1
                ring-gray-100
              "
              onError={() =>
                setImageError(
                  true
                )
              }
            />
          ) : (
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-blue-500
                to-cyan-500
                text-xs
                font-bold
                text-white
              "
            >
              {initials}
            </div>
          )}
        </div>

        {/* User */}

        <div className="min-w-0 flex-1">

          <div className="flex min-w-0 items-center gap-1.5">

            <h3
              className="
                min-w-0
                truncate
                text-sm
                font-semibold
                text-gray-900
              "
              title={
                user.full_name
              }
            >
              {user.full_name ||
                "Unknown User"}
            </h3>

            {isCurrentUser && (
              <span
                className="
                  shrink-0
                  rounded-full
                  bg-blue-50
                  px-1.5
                  py-0.5
                  text-[8px]
                  font-semibold
                  text-blue-600
                "
              >
                You
              </span>
            )}

          </div>

          <p
            className="
              mt-0.5
              truncate
              text-[10px]
              text-gray-400
            "
          >
            {role}
          </p>

        </div>

        {/* Status */}

        <span
          className={`
            inline-flex
            shrink-0
            items-center
            gap-1
            rounded-full
            px-2
            py-1
            text-[9px]
            font-semibold

            ${
              isActive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-500"
            }
          `}
        >
          {isActive ? (
            <CheckCircle2 className="h-3 w-3" />
          ) : (
            <XCircle className="h-3 w-3" />
          )}

          {isActive
            ? t(
                "active",
                language
              )
            : t(
                "inactive",
                language
              )}
        </span>
      </div>

      {/* =====================================================
          DETAILS
      ===================================================== */}

      <div className="mt-4 space-y-2">

        <div className="flex min-w-0 items-center gap-2">
          <Mail className="h-3.5 w-3.5 shrink-0 text-gray-300" />

          <span
            className="
              min-w-0
              truncate
              text-xs
              text-gray-500
            "
            title={
              user.email
            }
          >
            {user.email || "-"}
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <Phone className="h-3.5 w-3.5 shrink-0 text-gray-300" />

          <span
            className="
              min-w-0
              truncate
              text-xs
              text-gray-500
            "
          >
            {user.phone ||
              t(
                "noPhone",
                language
              )}
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-300" />

          <span
            className="
              min-w-0
              truncate
              text-xs
              text-gray-500
            "
          >
            {user.location ||
              t(
                "noLocation",
                language
              )}
          </span>
        </div>

      </div>

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div
        className="
          mt-4
          grid
          grid-cols-2
          gap-2
          border-t
          border-gray-100
          pt-3
        "
      >
        {/* View */}

        <button
          type="button"
          onClick={() =>
            onView(user)
          }
          className="
            flex
            items-center
            justify-center
            gap-1.5
            rounded-lg
            border
            border-blue-100
            bg-blue-50
            px-3
            py-2
            text-[10px]
            font-semibold
            text-blue-600
            transition
            hover:bg-blue-100
          "
        >
          <Eye className="h-3.5 w-3.5" />

          {t(
            "viewDetails",
            language
          )}
        </button>

        {/* Delete */}

        <button
          type="button"
          onClick={() =>
            onDelete(user)
          }
          disabled={
            isCurrentUser
          }
          className="
            flex
            items-center
            justify-center
            gap-1.5
            rounded-lg
            border
            border-red-100
            bg-red-50
            px-3
            py-2
            text-[10px]
            font-semibold
            text-red-500
            transition
            hover:bg-red-100
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <Trash2 className="h-3.5 w-3.5" />

          {t(
            "delete",
            language
          )}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   DETAILS MODAL
========================================================= */

function UserDetailsModal({
  user,
  language,
  onClose,
}: {
  user: UserRecord;
  language: AdminLanguage;
  onClose: () => void;
}) {
  const [
    copied,
    setCopied,
  ] = useState(false);

  const initials =
    user.full_name
      ?.trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(
        (part) =>
          part.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const role =
    translateRole(
      user.role,
      language
    );

  const isActive =
    user.is_active !== false;

  async function copyId() {
    try {
      await navigator.clipboard.writeText(
        String(user.id)
      );

      setCopied(true);

      setTimeout(
        () => {
          setCopied(
            false
          );
        },
        1500
      );
    } catch {
      // Ignore clipboard errors.
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-slate-950/50
        p-4
        backdrop-blur-[2px]
      "
      onMouseDown={(
        event
      ) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full
          max-w-lg
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-gray-100
            px-5
            py-4
          "
        >
          <div>
            <h2 className="text-base font-bold text-gray-900 sm:text-lg">
              {t(
                "viewDetails",
                language
              )}
            </h2>

            <p className="mt-0.5 text-[11px] text-gray-400">
              {role}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-gray-400
              transition
              hover:bg-gray-50
              hover:text-gray-700
            "
            aria-label={t(
              "close",
              language
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ===================================================
            BODY
        =================================================== */}

        <div className="max-h-[75vh] overflow-y-auto p-5">

          {/* User header */}

          <div
            className="
              flex
              flex-col
              items-center
              gap-3
              border-b
              border-gray-100
              pb-5
              text-center
            "
          >
            {user.photo ? (
              <img
                src={user.photo}
                alt={
                  user.full_name
                }
                className="
                  h-20
                  w-20
                  rounded-full
                  object-cover
                  ring-2
                  ring-blue-50
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-blue-500
                  to-cyan-500
                  text-xl
                  font-bold
                  text-white
                "
              >
                {initials}
              </div>
            )}

            <div className="min-w-0">
              <h3 className="truncate text-base font-bold text-gray-900">
                {user.full_name}
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                {role}
              </p>
            </div>

            <span
              className={`
                rounded-full
                px-3
                py-1
                text-[10px]
                font-semibold
                ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-500"
                }
              `}
            >
              {isActive
                ? t(
                    "active",
                    language
                  )
                : t(
                    "inactive",
                    language
                  )}
            </span>
          </div>

          {/* Information */}

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

            <DetailItem
              icon={Mail}
              label={t(
                "email",
                language
              )}
              value={
                user.email ||
                "-"
              }
            />

            <DetailItem
              icon={Phone}
              label={t(
                "phone",
                language
              )}
              value={
                user.phone ||
                t(
                  "noPhone",
                  language
                )
              }
            />

            <DetailItem
              icon={MapPin}
              label={t(
                "location",
                language
              )}
              value={
                user.location ||
                t(
                  "noLocation",
                  language
                )
              }
            />

            <DetailItem
              icon={ShieldCheck}
              label={t(
                "role",
                language
              )}
              value={role}
            />

            {/* Account ID */}

            <div className="min-w-0 rounded-xl border border-gray-100 bg-gray-50 p-3 sm:col-span-2">

              <div className="flex items-center gap-2">
                <UserRound className="h-4 w-4 shrink-0 text-blue-500" />

                <span className="text-[10px] text-gray-400">
                  {t(
                    "accountId",
                    language
                  )}
                </span>
              </div>

              <div className="mt-2 flex min-w-0 items-center gap-2">

                <span
                  className="
                    min-w-0
                    flex-1
                    truncate
                    font-mono
                    text-xs
                    text-gray-700
                  "
                >
                  {user.id}
                </span>

                <button
                  type="button"
                  onClick={copyId}
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-1
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    px-2
                    py-1.5
                    text-[9px]
                    font-medium
                    text-gray-500
                    hover:bg-gray-50
                  "
                >
                  {copied ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}

                  {copied
                    ? t(
                        "copied",
                        language
                      )
                    : t(
                        "copy",
                        language
                      )}
                </button>
              </div>
            </div>

            {/* Created */}

            {user.created_at && (
              <DetailItem
                icon={CheckCircle2}
                label={t(
                  "createdAt",
                  language
                )}
                value={formatDate(
                  user.created_at
                )}
              />
            )}

            {/* Updated */}

            {user.updated_at && (
              <DetailItem
                icon={RefreshCw}
                label={t(
                  "updatedAt",
                  language
                )}
                value={formatDate(
                  user.updated_at
                )}
              />
            )}

          </div>
        </div>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <div
          className="
            flex
            justify-end
            border-t
            border-gray-100
            px-5
            py-3
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              bg-blue-600
              px-4
              py-2
              text-xs
              font-semibold
              text-white
              transition
              hover:bg-blue-700
            "
          >
            {t(
              "close",
              language
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-gray-100 bg-gray-50 p-3">

      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0 text-blue-500" />

        <span className="text-[10px] text-gray-400">
          {label}
        </span>
      </div>

      <p
        className="
          mt-2
          break-words
          text-xs
          font-semibold
          text-gray-700
        "
      >
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   DELETE MODAL
========================================================= */

function DeleteUserModal({
  user,
  language,
  deleting,
  onCancel,
  onConfirm,
}: {
  user: UserRecord;
  language: AdminLanguage;
  deleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[110]
        flex
        items-center
        justify-center
        bg-slate-950/50
        p-4
        backdrop-blur-[2px]
      "
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">

        {/* Warning */}

        <div className="flex items-start gap-3">

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-red-50
              text-red-500
            "
          >
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div className="min-w-0">

            <h2 className="text-base font-bold text-gray-900">
              {t(
                "deleteUser",
                language
              )}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              {t(
                "deleteConfirm",
                language
              )}
            </p>

          </div>
        </div>

        {/* User */}

        <div
          className="
            mt-4
            rounded-xl
            border
            border-red-100
            bg-red-50
            p-3
          "
        >
          <p className="truncate text-sm font-semibold text-gray-800">
            {user.full_name}
          </p>

          <p className="mt-0.5 truncate text-xs text-gray-500">
            {user.email}
          </p>
        </div>

        {/* Warning */}

        <div className="mt-3 rounded-lg bg-gray-50 p-3">
          <p className="text-[11px] leading-relaxed text-gray-500">
            {t(
              "deleteWarning",
              language
            )}
          </p>
        </div>

        {/* Actions */}

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="
              rounded-lg
              border
              border-gray-200
              px-4
              py-2.5
              text-xs
              font-semibold
              text-gray-600
              transition
              hover:bg-gray-50
              disabled:opacity-50
            "
          >
            {t(
              "cancel",
              language
            )}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-red-500
              px-4
              py-2.5
              text-xs
              font-semibold
              text-white
              transition
              hover:bg-red-600
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Trash2 className="h-3.5 w-3.5" />

            {deleting
              ? t(
                  "deleting",
                  language
                )
              : t(
                  "delete",
                  language
                )}
          </button>

        </div>
      </div>
    </div>
  );
}

/* =========================================================
   GROUP SECTION
========================================================= */

function UserGroupSection({
  group,
  language,
  currentUserId,
  onView,
  onDelete,
}: {
  group: UserGroup;
  language: AdminLanguage;
  currentUserId: string | null;
  onView: (
    user: UserRecord
  ) => void;
  onDelete: (
    user: UserRecord
  ) => void;
}) {
  const Icon =
    group.icon;

  return (
    <section className="min-w-0">

      {/* Header */}

      <div className="mb-3 flex items-center justify-between gap-3">

        <div className="flex min-w-0 items-center gap-2.5">

          <div
            className={`
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              ${group.iconBg}
              ${group.color}
            `}
          >
            <Icon className="h-4 w-4" />
          </div>

          <div className="min-w-0">

            <h2 className="truncate text-sm font-bold text-gray-900 sm:text-base">
              {group.title}
            </h2>

            <p className="text-[10px] text-gray-400">
              {t(
                "total",
                language
              )}{" "}
              {group.users.length}{" "}
              {t(
                "users",
                language
              )}
            </p>

          </div>
        </div>

        <span
          className="
            flex
            h-7
            min-w-7
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-gray-100
            px-2
            text-[10px]
            font-bold
            text-gray-600
          "
        >
          {group.users.length}
        </span>

      </div>

      {/* Users */}

      {group.users.length ===
      0 ? (
        <div
          className="
            flex
            min-h-[120px]
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-gray-200
            bg-gray-50/50
            px-4
            py-6
            text-center
          "
        >
          <UserRound className="h-7 w-7 text-gray-300" />

          <p className="mt-2 text-xs text-gray-400">
            {t(
              "noUsers",
              language
            )}
          </p>
        </div>
      ) : (
        <div
          className="
            grid
            min-w-0
            grid-cols-1
            gap-3
            sm:grid-cols-2
            xl:grid-cols-3
          "
        >
          {group.users.map(
            (user) => (
              <UserCard
                key={user.id}
                user={user}
                language={language}
                currentUserId={
                  currentUserId
                }
                onView={onView}
                onDelete={
                  onDelete
                }
              />
            )
          )}
        </div>
      )}

    </section>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function UserManagementPage() {
  const {
    language,
  } = useAdmin();

  const [
    users,
    setUsers,
  ] = useState<UserRecord[]>(
    []
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null
  );

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedUser,
    setSelectedUser,
  ] = useState<UserRecord | null>(
    null
  );

  const [
    userToDelete,
    setUserToDelete,
  ] = useState<UserRecord | null>(
    null
  );

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const [
    currentUserId,
    setCurrentUserId,
  ] = useState<string | null>(
    null
  );

  /* =======================================================
     GET CURRENT USER ID
  ======================================================= */

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem(
          "user"
        );

      if (!storedUser) {
        return;
      }

      const parsed =
        JSON.parse(
          storedUser
        ) as {
          id?: string;
        };

      if (parsed.id) {
        setCurrentUserId(
          String(parsed.id)
        );
      }
    } catch {
      // Ignore invalid local storage data.
    }
  }, []);

  /* =======================================================
     FETCH USERS
  ======================================================= */

  const fetchUsers =
    async () => {
      setLoading(true);
      setError(null);

      try {
        const response =
          await apiClient.get<
            UserRecord[]
          >(
            "/api/auth/users/"
          );

        setUsers(
          Array.isArray(
            response
          )
            ? response
            : []
        );
      } catch (error) {
        console.error(
          "Failed to load users:",
          error
        );

        if (
          error instanceof
          ApiError
        ) {
          setError(
            error.status
              ? `Failed to load users. Please try again. (${error.status})`
              : error.message
          );
        } else {
          setError(
            t(
              "failed",
              language
            )
          );
        }
      } finally {
        setLoading(false);
      }
    };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    fetchUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredUsers =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return users;
      }

      return users.filter(
        (user) => {
          const searchable =
            [
              user.full_name,
              user.email,
              user.phone,
              user.location,
              user.role,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

          return searchable.includes(
            query
          );
        }
      );
    }, [
      users,
      search,
    ]);

  /* =======================================================
     GROUPS
  ======================================================= */

  const groups =
    useMemo<UserGroup[]>(() => {
      return [
        {
          key: "superAdmin",
          title: t(
            "superAdmin",
            language
          ),
          icon: ShieldCheck,
          users:
            filteredUsers.filter(
              (user) =>
                normalizeRole(
                  user.role
                ) ===
                "SUPER_ADMIN"
            ),
          color:
            "text-blue-600",
          iconBg:
            "bg-blue-50",
        },

        {
          key:
            "operationsAdmin",
          title: t(
            "operationsAdmin",
            language
          ),
          icon: UserCog,
          users:
            filteredUsers.filter(
              (user) => {
                const role =
                  normalizeRole(
                    user.role
                  );

                return (
                  role ===
                    "ADMIN" ||
                  role ===
                    "OPERATIONS_ADMIN" ||
                  role ===
                    "OPERATION_ADMIN"
                );
              }
            ),
          color:
            "text-purple-600",
          iconBg:
            "bg-purple-50",
        },

        {
          key: "dealers",
          title: t(
            "dealers",
            language
          ),
          icon: Store,
          users:
            filteredUsers.filter(
              (user) =>
                normalizeRole(
                  user.role
                ) ===
                "DEALER"
            ),
          color:
            "text-orange-600",
          iconBg:
            "bg-orange-50",
        },

        {
          key: "customers",
          title: t(
            "customers",
            language
          ),
          icon: Users,
          users:
            filteredUsers.filter(
              (user) =>
                normalizeRole(
                  user.role
                ) ===
                "CUSTOMER"
            ),
          color:
            "text-cyan-600",
          iconBg:
            "bg-cyan-50",
        },

        {
          key: "technicians",
          title: t(
            "technicians",
            language
          ),
          icon: Wrench,
          users:
            filteredUsers.filter(
              (user) =>
                normalizeRole(
                  user.role
                ) ===
                "TECHNICIAN"
            ),
          color:
            "text-emerald-600",
          iconBg:
            "bg-emerald-50",
        },
      ];
    }, [
      filteredUsers,
      language,
    ]);

  /* =======================================================
     DELETE USER
  ======================================================= */

  async function confirmDeleteUser() {
  if (!userToDelete) {
    return;
  }

  if (
    currentUserId &&
    String(userToDelete.id) ===
      String(currentUserId)
  ) {
    setError(
      t(
        "cannotDeleteSelf",
        language
      )
    );

    setUserToDelete(null);

    return;
  }

  setDeleting(true);
  setError(null);

  try {
        await apiClient.delete(
        `/api/auth/${userToDelete.id}/`
        );
    // Remove immediately from UI.
    setUsers((previous) =>
      previous.filter(
        (user) =>
          String(user.id) !==
          String(userToDelete.id)
      )
    );

    setSelectedUser((previous) => {
      if (
        previous &&
        String(previous.id) ===
          String(userToDelete.id)
      ) {
        return null;
      }

      return previous;
    });

    setUserToDelete(null);
  } catch (error) {
    console.error(
      "Failed to delete user:",
      error
    );

    if (error instanceof ApiError) {
      setError(
        error.message ||
          `${t(
            "deleteFailed",
            language
          )} (${error.status})`
      );
    } else {
      setError(
        t(
          "deleteFailed",
          language
        )
      );
    }
  } finally {
    setDeleting(false);
  }
}

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="space-y-6">

        <div className="animate-pulse">
          <div className="h-8 w-56 rounded-lg bg-gray-200" />
          <div className="mt-2 h-4 w-80 max-w-full rounded bg-gray-100" />
        </div>

        <div className="h-10 w-full max-w-xl animate-pulse rounded-xl bg-gray-200" />

        {Array.from({
          length: 3,
        }).map(
          (_, index) => (
            <div
              key={index}
              className="space-y-3"
            >
              <div className="h-7 w-40 animate-pulse rounded bg-gray-100" />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({
                  length: 3,
                }).map(
                  (_, cardIndex) => (
                    <div
                      key={
                        cardIndex
                      }
                      className="
                        h-44
                        animate-pulse
                        rounded-2xl
                        bg-white
                        shadow-sm
                      "
                    />
                  )
                )}
              </div>
            </div>
          )
        )}

        <p className="text-center text-xs text-gray-400">
          {t(
            "loading",
            language
          )}
        </p>
      </div>
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <div className="space-y-6">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div className="min-w-0">

            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              {t(
                "pageTitle",
                language
              )}
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-gray-400">
              {t(
                "pageSubtitle",
                language
              )}
            </p>

          </div>

          <div
            className="
              flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              border-blue-100
              bg-blue-50
              px-3
              py-2
            "
          >
            <Users className="h-4 w-4 text-blue-600" />

            <span className="text-xs font-medium text-blue-700">
              {t(
                "allUsers",
                language
              )}
            </span>

            <span className="text-sm font-bold text-blue-700">
              {users.length}
            </span>
          </div>
        </div>

        {/* ===================================================
            SEARCH / REFRESH
        =================================================== */}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

          <div className="relative w-full max-w-xl">

            <Search
              className="
                absolute
                left-3
                top-1/2
                h-4 w-4
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder={t(
                "search",
                language
              )}
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-white
                py-2.5
                pl-10
                pr-4
                text-sm
                text-gray-700
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-blue-400
                focus:ring-2
                focus:ring-blue-100
              "
            />
          </div>

          <button
            type="button"
            onClick={fetchUsers}
            className="
              flex
              w-fit
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-gray-200
              bg-white
              px-3
              py-2.5
              text-xs
              font-medium
              text-gray-600
              transition
              hover:bg-gray-50
            "
          >
            <RefreshCw className="h-3.5 w-3.5" />

            {t(
              "retry",
              language
            )}
          </button>
        </div>

        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div
            className="
              flex
              flex-col
              gap-3
              rounded-xl
              border
              border-red-100
              bg-red-50
              p-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p className="text-sm text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={
                fetchUsers
              }
              className="
                flex
                w-fit
                items-center
                gap-2
                rounded-lg
                bg-red-500
                px-3
                py-2
                text-xs
                font-semibold
                text-white
                transition
                hover:bg-red-600
              "
            >
              <RefreshCw className="h-3 w-3" />

              {t(
                "retry",
                language
              )}
            </button>
          </div>
        )}

        {/* ===================================================
            USER GROUPS
        =================================================== */}

        <div className="space-y-8">

          {groups.map(
            (group) => (
              <UserGroupSection
                key={
                  group.key
                }
                group={group}
                language={
                  language
                }
                currentUserId={
                  currentUserId
                }
                onView={(
                  user
                ) =>
                  setSelectedUser(
                    user
                  )
                }
                onDelete={(
                  user
                ) =>
                  setUserToDelete(
                    user
                  )
                }
              />
            )
          )}

        </div>
      </div>

      {/* =====================================================
          DETAILS MODAL
      ===================================================== */}

      {selectedUser && (
        <UserDetailsModal
          user={
            selectedUser
          }
          language={
            language
          }
          onClose={() =>
            setSelectedUser(
              null
            )
          }
        />
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {userToDelete && (
        <DeleteUserModal
          user={
            userToDelete
          }
          language={
            language
          }
          deleting={
            deleting
          }
          onCancel={() =>
            setUserToDelete(
              null
            )
          }
          onConfirm={
            confirmDeleteUser
          }
        />
      )}
    </>
  );
}