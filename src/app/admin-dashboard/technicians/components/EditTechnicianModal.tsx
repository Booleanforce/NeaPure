"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
} from "react";

import {
  Loader2,
  X,
  Camera,
  Trash2,
  UserRound,
} from "lucide-react";

import {
  Bounce,
  toast,
} from "react-toastify";

import {
  technicianService,
} from "@/services/technician.service";

/* =========================================================
   API BASE URL
========================================================= */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

/* =========================================================
   TYPES
========================================================= */

interface Props {
  isOpen: boolean;
  technicianId: string | null;
  onClose: () => void;
  onUpdated: () => Promise<void>;
}

interface FormState {
  full_name: string;
  email: string;
  phone: string;
  region: string;
  skills: string;
  status: "ACTIVE" | "BLOCKED";
}

/* =========================================================
   INITIAL FORM
========================================================= */

const initialForm: FormState = {
  full_name: "",
  email: "",
  phone: "",
  region: "",
  skills: "",
  status: "ACTIVE",
};

/* =========================================================
   NORMALIZE API VALUE
========================================================= */

/**
 * Converts API values into safe strings.
 *
 * This prevents:
 *
 * form.skills.trim is not a function
 *
 * when the backend returns an array/object.
 */
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
          typeof item === "string" ||
          typeof item === "number" ||
          typeof item === "boolean"
        ) {
          return String(item);
        }

        try {
          return JSON.stringify(item);
        } catch {
          return String(item);
        }
      })
      .filter(Boolean)
      .join(", ");
  }

  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  return "";
}

/* =========================================================
   PHOTO URL HELPER
========================================================= */

function getProfilePhotoUrl(
  photo?: string | null
): string | null {
  if (!photo) {
    return null;
  }

  const value =
    normalizeText(photo).trim();

  if (!value) {
    return null;
  }

  /* Already absolute */

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  /* Protocol relative */

  if (value.startsWith("//")) {
    return `http:${value}`;
  }

  /* /media/... */

  if (value.startsWith("/")) {
    return `${API_BASE_URL}${value}`;
  }

  /* media/... */

  return `${API_BASE_URL}/${value}`;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function EditTechnicianModal({
  isOpen,
  technicianId,
  onClose,
  onUpdated,
}: Props) {
  /* =======================================================
     FORM
  ======================================================= */

  const [form, setForm] =
    useState<FormState>(
      initialForm
    );

  /* =======================================================
     LOADING / SAVING
  ======================================================= */

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  /* =======================================================
     EXISTING PHOTO
  ======================================================= */

  const [existingPhoto, setExistingPhoto] =
    useState<string | null>(null);

  /* =======================================================
     NEW PHOTO
  ======================================================= */

  const [profilePhoto, setProfilePhoto] =
    useState<File | null>(null);

  /* =======================================================
     PREVIEW
  ======================================================= */

  const [photoPreview, setPhotoPreview] =
    useState<string | null>(null);

  /* =======================================================
     IMAGE ERROR
  ======================================================= */

  const [photoError, setPhotoError] =
    useState(false);

  /* =======================================================
     REMOVE PHOTO
  ======================================================= */

  const [removePhoto, setRemovePhoto] =
    useState(false);

  /* =======================================================
     LOAD TECHNICIAN
  ======================================================= */

  useEffect(() => {
    if (
      !isOpen ||
      !technicianId
    ) {
      return;
    }

    const loadTechnician =
      async () => {
        try {
          setLoading(true);

          const technician =
            await technicianService.getTechnician(
              technicianId
            );

          const profile =
            technician.technician_profile;

          /* -------------------------------------------------
             NORMALIZE PROFILE DATA
          ------------------------------------------------- */

          setForm({
            full_name:
              normalizeText(
                technician.full_name
              ).trim(),

            email:
              normalizeText(
                technician.email
              ).trim(),

            phone:
              normalizeText(
                technician.phone
              ).trim(),

            region:
              normalizeText(
                profile?.region
              ).trim(),

            skills:
              normalizeText(
                profile?.skills
              ).trim(),

            status:
              normalizeText(
                profile?.status
              ).toUpperCase() ===
              "BLOCKED"
                ? "BLOCKED"
                : "ACTIVE",
          });

          /* -------------------------------------------------
             EXISTING PHOTO
          ------------------------------------------------- */

          setExistingPhoto(
            getProfilePhotoUrl(
              profile?.profile_photo
            )
          );

          /* -------------------------------------------------
             RESET PHOTO STATES
          ------------------------------------------------- */

          setProfilePhoto(null);
          setPhotoPreview(null);
          setRemovePhoto(false);
          setPhotoError(false);
        } catch (error) {
          console.error(
            "Failed to load technician:",
            error
          );

          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to load technician.",
            {
              position:
                "bottom-center",
              autoClose: 5000,
              theme: "light",
            }
          );

          onClose();
        } finally {
          setLoading(false);
        }
      };

    loadTechnician();
  }, [
    isOpen,
    technicianId,
    onClose,
  ]);

  /* =======================================================
     CLEANUP OBJECT URL
  ======================================================= */

  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(
          photoPreview
        );
      }
    };
  }, [photoPreview]);

  /* =======================================================
     RETURN NULL
  ======================================================= */

  if (
    !isOpen ||
    !technicianId
  ) {
    return null;
  }

  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const handleChange = (
    field: keyof FormState,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* =======================================================
     PHOTO CHANGE
  ======================================================= */

  const handlePhotoChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    /* -----------------------------------------------------
       VALIDATE TYPE
    ----------------------------------------------------- */

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      toast.error(
        "Please select a JPG, PNG or WebP image.",
        {
          position:
            "bottom-center",
          autoClose: 4000,
          theme: "light",
        }
      );

      event.target.value = "";
      return;
    }

    /* -----------------------------------------------------
       VALIDATE SIZE
    ----------------------------------------------------- */

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error(
        "Profile photo must be smaller than 5 MB.",
        {
          position:
            "bottom-center",
          autoClose: 4000,
          theme: "light",
        }
      );

      event.target.value = "";
      return;
    }

    /* -----------------------------------------------------
       REMOVE OLD PREVIEW
    ----------------------------------------------------- */

    if (photoPreview) {
      URL.revokeObjectURL(
        photoPreview
      );
    }

    /* -----------------------------------------------------
       CREATE NEW PREVIEW
    ----------------------------------------------------- */

    const previewUrl =
      URL.createObjectURL(file);

    setProfilePhoto(file);
    setPhotoPreview(previewUrl);

    /* -----------------------------------------------------
       RESET STATES
    ----------------------------------------------------- */

    setRemovePhoto(false);
    setPhotoError(false);
  };

  /* =======================================================
     REMOVE PHOTO
  ======================================================= */

  const handleRemovePhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(
        photoPreview
      );
    }

    setPhotoPreview(null);
    setProfilePhoto(null);
    setPhotoError(false);

    if (existingPhoto) {
      setRemovePhoto(true);
    }
  };

  /* =======================================================
     KEEP PHOTO
  ======================================================= */

  const handleKeepPhoto = () => {
    setRemovePhoto(false);
    setPhotoError(false);
  };

  /* =======================================================
     UPDATE TECHNICIAN
  ======================================================= */

  const handleUpdate =
    async () => {
      /* ---------------------------------------------------
         SAFE FORM VALUES
      --------------------------------------------------- */

      const fullName =
        normalizeText(
          form.full_name
        ).trim();

      const email =
        normalizeText(
          form.email
        ).trim();

      const phone =
        normalizeText(
          form.phone
        ).trim();

      const region =
        normalizeText(
          form.region
        ).trim();

      const skills =
        normalizeText(
          form.skills
        ).trim();

      const status =
        normalizeText(
          form.status
        ).toUpperCase() ===
        "BLOCKED"
          ? "BLOCKED"
          : "ACTIVE";

      /* ---------------------------------------------------
         VALIDATION
      --------------------------------------------------- */

      if (!fullName) {
        toast.error(
          "Full name is required.",
          {
            position:
              "bottom-center",
          }
        );

        return;
      }

      if (!email) {
        toast.error(
          "Email is required.",
          {
            position:
              "bottom-center",
          }
        );

        return;
      }

      try {
        setSaving(true);

        /* ---------------------------------------------
           FORM DATA
        --------------------------------------------- */

        const formData =
          new FormData();

        /* ---------------------------------------------
           USER FIELDS
        --------------------------------------------- */

        formData.append(
          "full_name",
          fullName
        );

        formData.append(
          "email",
          email
        );

        formData.append(
          "phone",
          phone
        );

        /* ---------------------------------------------
           TECHNICIAN PROFILE

           Send flat fields so the backend
           can safely handle multipart/form-data.
        --------------------------------------------- */

        formData.append(
          "region",
          region
        );

        formData.append(
          "skills",
          skills
        );

        formData.append(
          "status",
          status
        );

        /* ---------------------------------------------
           PROFILE PHOTO
        --------------------------------------------- */

        if (profilePhoto) {
          formData.append(
            "profile_photo",
            profilePhoto,
            profilePhoto.name
          );
        }

        /* ---------------------------------------------
           REMOVE PHOTO
        --------------------------------------------- */

        if (
          removePhoto &&
          !profilePhoto
        ) {
          formData.append(
            "remove_profile_photo",
            "true"
          );
        }

        /* ---------------------------------------------
           DEBUG
        --------------------------------------------- */

        console.log(
          "Updating technician:",
          technicianId
        );

        console.log(
          "Update values:",
          {
            full_name:
              fullName,
            email,
            phone,
            region,
            skills,
            status,
            photo:
              profilePhoto?.name ||
              null,
            removePhoto,
          }
        );

        /* ---------------------------------------------
           API
        --------------------------------------------- */

        const updatedTechnician =
          await technicianService.updateTechnician(
            technicianId,
            formData
          );

        console.log(
          "Technician updated:",
          updatedTechnician
        );

        /* ---------------------------------------------
           REFRESH LIST
        --------------------------------------------- */

        await onUpdated();

        /* ---------------------------------------------
           SUCCESS
        --------------------------------------------- */

        toast.success(
          "Technician updated successfully!",
          {
            position:
              "bottom-center",
            autoClose: 4000,
            theme: "light",
            transition: Bounce,
          }
        );

        /* ---------------------------------------------
           CLOSE
        --------------------------------------------- */

        onClose();
      } catch (error) {
        console.error(
          "Update technician error:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update technician.",
          {
            position:
              "bottom-center",
            autoClose: 5000,
            theme: "light",
          }
        );
      } finally {
        setSaving(false);
      }
    };

  /* =======================================================
     PHOTO TO DISPLAY
  ======================================================= */

  const displayedPhoto =
    photoPreview ||
    (
      !removePhoto &&
      !photoError
        ? existingPhoto
        : null
    );

  /* =======================================================
     INITIAL
  ======================================================= */

  const initial =
    normalizeText(
      form.full_name
    )
      .charAt(0)
      .toUpperCase() ||
    "T";

  /* =======================================================
     STYLES
  ======================================================= */

  const labelClass =
    "mb-1.5 block text-sm font-medium text-blue-900";

  const inputClass =
    "w-full rounded-lg border border-blue-100 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className="fixed inset-0 z-[180] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
            event.currentTarget &&
          !saving
        ) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between border-b border-blue-100 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-blue-950">
              Edit Technician
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Update technician account information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="flex-1 overflow-y-auto bg-blue-50/30 px-5 py-5 sm:px-6">

          {loading ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2
                  size={30}
                  className="animate-spin text-blue-600"
                />

                <p className="text-sm text-slate-500">
                  Loading technician...
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">

              {/* =========================================
                  PROFILE PHOTO
              ========================================= */}

              <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">

                <h3 className="mb-5 text-sm font-semibold text-blue-950">
                  Profile Photo
                </h3>

                <div className="flex flex-col items-center gap-5 sm:flex-row">

                  {/* IMAGE */}

                  <div className="relative">

                    {displayedPhoto ? (
                      <img
                        src={displayedPhoto}
                        alt={
                          full_name_placeholder(
                            form.full_name
                          )
                        }
                        className="h-28 w-28 rounded-full border-4 border-blue-50 object-cover shadow-md"
                        onError={() => {
                          console.error(
                            "Failed to load profile photo:",
                            displayedPhoto
                          );

                          setPhotoError(
                            true
                          );
                        }}
                      />
                    ) : (
                      <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-blue-50 bg-blue-100 text-3xl font-semibold text-blue-600 shadow-md">
                        {initial}
                      </div>
                    )}

                    {/* CAMERA */}

                    <label
                      htmlFor="technician-profile-photo"
                      className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-md transition hover:bg-blue-700"
                      title="Change profile photo"
                    >
                      <Camera size={17} />
                    </label>

                    <input
                      id="technician-profile-photo"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={
                        handlePhotoChange
                      }
                      disabled={
                        saving
                      }
                    />
                  </div>

                  {/* INFORMATION */}

                  <div className="flex-1 text-center sm:text-left">

                    <h4 className="text-sm font-semibold text-slate-800">
                      Technician Profile Photo
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Upload a JPG, PNG or WebP
                      image. Maximum size 5 MB.
                    </p>

                    <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">

                      <label
                        htmlFor="technician-profile-photo"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-50"
                      >
                        <Camera size={15} />

                        {profilePhoto
                          ? "Change Photo"
                          : "Upload Photo"}
                      </label>

                      {displayedPhoto &&
                        !removePhoto && (
                          <button
                            type="button"
                            onClick={
                              handleRemovePhoto
                            }
                            disabled={
                              saving
                            }
                            className="inline-flex items-center gap-2 rounded-lg border border-red-100 bg-white px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                          >
                            <Trash2
                              size={15}
                            />

                            Remove Photo
                          </button>
                        )}

                      {removePhoto && (
                        <button
                          type="button"
                          onClick={
                            handleKeepPhoto
                          }
                          disabled={
                            saving
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-green-100 bg-white px-3 py-2 text-xs font-medium text-green-600 transition hover:bg-green-50 disabled:opacity-50"
                        >
                          <UserRound
                            size={15}
                          />

                          Keep Photo
                        </button>
                      )}
                    </div>

                    {removePhoto && (
                      <p className="mt-2 text-xs font-medium text-red-500">
                        The current profile photo
                        will be removed when you
                        save.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* =========================================
                  BASIC INFORMATION
              ========================================= */}

              <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">

                <h3 className="mb-5 text-sm font-semibold text-blue-950">
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* NAME */}

                  <div>
                    <label
                      className={
                        labelClass
                      }
                    >
                      Full Name
                    </label>

                    <input
                      value={
                        form.full_name
                      }
                      onChange={(
                        event
                      ) =>
                        handleChange(
                          "full_name",
                          event.target
                            .value
                        )
                      }
                      className={
                        inputClass
                      }
                      placeholder="Full name"
                      disabled={
                        saving
                      }
                    />
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label
                      className={
                        labelClass
                      }
                    >
                      Email
                    </label>

                    <input
                      type="email"
                      value={
                        form.email
                      }
                      onChange={(
                        event
                      ) =>
                        handleChange(
                          "email",
                          event.target
                            .value
                        )
                      }
                      className={
                        inputClass
                      }
                      placeholder="Email"
                      disabled={
                        saving
                      }
                    />
                  </div>

                  {/* PHONE */}

                  <div>
                    <label
                      className={
                        labelClass
                      }
                    >
                      Phone
                    </label>

                    <input
                      value={
                        form.phone
                      }
                      onChange={(
                        event
                      ) =>
                        handleChange(
                          "phone",
                          event.target
                            .value
                        )
                      }
                      className={
                        inputClass
                      }
                      placeholder="Phone number"
                      disabled={
                        saving
                      }
                    />
                  </div>
                </div>
              </div>

              {/* =========================================
                  TECHNICIAN INFORMATION
              ========================================= */}

              <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">

                <h3 className="mb-5 text-sm font-semibold text-blue-950">
                  Technician Information
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* REGION */}

                  <div>
                    <label
                      className={
                        labelClass
                      }
                    >
                      Region
                    </label>

                    <input
                      value={
                        form.region
                      }
                      onChange={(
                        event
                      ) =>
                        handleChange(
                          "region",
                          event.target
                            .value
                        )
                      }
                      className={
                        inputClass
                      }
                      placeholder="e.g. Dhaka"
                      disabled={
                        saving
                      }
                    />
                  </div>

                  {/* STATUS */}

                  <div>
                    <label
                      className={
                        labelClass
                      }
                    >
                      Status
                    </label>

                    <select
                      value={
                        form.status
                      }
                      onChange={(
                        event
                      ) =>
                        handleChange(
                          "status",
                          event.target
                            .value
                        )
                      }
                      className={
                        inputClass
                      }
                      disabled={
                        saving
                      }
                    >
                      <option value="ACTIVE">
                        ACTIVE
                      </option>

                      <option value="BLOCKED">
                        BLOCKED
                      </option>
                    </select>
                  </div>

                  {/* SKILLS */}

                  <div className="sm:col-span-2">

                    <label
                      className={
                        labelClass
                      }
                    >
                      Skills
                    </label>

                    <textarea
                      rows={4}
                      value={
                        form.skills
                      }
                      onChange={(
                        event
                      ) =>
                        handleChange(
                          "skills",
                          event.target
                            .value
                        )
                      }
                      className={`${inputClass} resize-none`}
                      placeholder="Installation, Maintenance, Repair..."
                      disabled={
                        saving
                      }
                    />

                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="flex flex-col-reverse gap-3 border-t border-blue-100 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="w-full rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={
              handleUpdate
            }
            disabled={
              loading ||
              saving
            }
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {saving && (
              <Loader2
                size={16}
                className="animate-spin"
              />
            )}

            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PHOTO ALT TEXT HELPER
========================================================= */

function full_name_placeholder(
  value: unknown
): string {
  const name =
    normalizeText(value).trim();

  return name || "Technician";
}