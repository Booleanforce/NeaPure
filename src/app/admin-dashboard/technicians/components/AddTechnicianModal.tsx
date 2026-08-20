"use client";

import { useEffect, useState } from "react";
import {
  X,
  Camera,
  UserRound,
} from "lucide-react";
import {
  Bounce,
  toast,
} from "react-toastify";

import {
  technicianService,
} from "@/services/technician.service";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => Promise<void>;
}

export default function AddTechnicianModal({
  isOpen,
  onClose,
  onCreated,
}: Props) {
  const [saving, setSaving] =
    useState(false);

  const [profilePhoto, setProfilePhoto] =
    useState<File | null>(null);

  const [photoPreview, setPhotoPreview] =
    useState<string | null>(null);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    region: "",
    skills: "",
    status: "ACTIVE",
  });

  /* =========================================================
     CLEANUP PREVIEW
  ========================================================= */

  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(
          photoPreview
        );
      }
    };
  }, [photoPreview]);

  if (!isOpen) {
    return null;
  }

  /* =========================================================
     HANDLE TEXT CHANGE
  ========================================================= */

  const handleChange = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =========================================================
     PHOTO CHANGE
  ========================================================= */

  const handlePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Please select a JPG, PNG, or WebP image.",
        {
          position: "bottom-center",
          autoClose: 4000,
          theme: "light",
        }
      );

      event.target.value = "";
      return;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error(
        "Profile photo must be smaller than 5MB.",
        {
          position: "bottom-center",
          autoClose: 4000,
          theme: "light",
        }
      );

      event.target.value = "";
      return;
    }

    if (photoPreview) {
      URL.revokeObjectURL(
        photoPreview
      );
    }

    setProfilePhoto(file);

    const previewUrl =
      URL.createObjectURL(file);

    setPhotoPreview(previewUrl);
  };

  /* =========================================================
     REMOVE PHOTO
  ========================================================= */

  const handleRemovePhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(
        photoPreview
      );
    }

    setProfilePhoto(null);
    setPhotoPreview(null);

    const input =
      document.getElementById(
        "technician-profile-photo"
      ) as HTMLInputElement | null;

    if (input) {
      input.value = "";
    }
  };

  /* =========================================================
     RESET FORM
  ========================================================= */

  const resetForm = () => {
    setForm({
      full_name: "",
      email: "",
      password: "",
      phone: "",
      region: "",
      skills: "",
      status: "ACTIVE",
    });

    handleRemovePhoto();
  };

  /* =========================================================
     CREATE TECHNICIAN
  ========================================================= */

  const handleSave = async () => {
    const fullName =
      form.full_name.trim();

    const email =
      form.email.trim();

    const password =
      form.password;

    const phone =
      form.phone.trim();

    const region =
      form.region.trim();

    const skills =
      form.skills.trim();

    /* ---------------------------------------------------------
       REQUIRED VALIDATION
    --------------------------------------------------------- */

    if (
      !fullName ||
      !email ||
      !password
    ) {
      toast.error(
        "Name, email and password are required.",
        {
          position: "bottom-center",
          autoClose: 4000,
          theme: "light",
        }
      );

      return;
    }

    /* ---------------------------------------------------------
       PASSWORD VALIDATION
    --------------------------------------------------------- */

    if (password.length < 8) {
      toast.error(
        "Password must be at least 8 characters.",
        {
          position: "bottom-center",
          autoClose: 4000,
          theme: "light",
        }
      );

      return;
    }

    /* ---------------------------------------------------------
       EMAIL VALIDATION
    --------------------------------------------------------- */

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(email)
    ) {
      toast.error(
        "Please enter a valid email address.",
        {
          position: "bottom-center",
          autoClose: 4000,
          theme: "light",
        }
      );

      return;
    }

    try {
      setSaving(true);

      /* =======================================================
         FORM DATA
      ======================================================= */

      const formData =
        new FormData();

      formData.append(
        "full_name",
        fullName
      );

      formData.append(
        "email",
        email
      );

      formData.append(
        "password",
        password
      );

      formData.append(
        "phone",
        phone
      );

      /*
       * Send technician profile fields
       * as normal multipart fields.
       *
       * This avoids nested multipart parsing issues.
       */
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
        form.status
      );

      /* =======================================================
         PROFILE PHOTO
      ======================================================= */

      if (profilePhoto) {
        formData.append(
          "profile_photo",
          profilePhoto,
          profilePhoto.name
        );
      }

      /* =======================================================
         DEBUG
      ======================================================= */

      console.log(
        "Creating technician..."
      );

      console.log({
        full_name: fullName,
        email,
        phone,
        region,
        skills,
        status: form.status,
        hasProfilePhoto:
          Boolean(profilePhoto),
      });

      /* =======================================================
         API
      ======================================================= */

      await technicianService.createTechnician(
        formData
      );

      /* =======================================================
         REFRESH TABLE
      ======================================================= */

      await onCreated();

      /* =======================================================
         SUCCESS
      ======================================================= */

      toast.success(
        "Technician created successfully!",
        {
          position: "bottom-center",
          autoClose: 4000,
          theme: "light",
          transition: Bounce,
        }
      );

      /* =======================================================
         RESET
      ======================================================= */

      resetForm();

      /* =======================================================
         CLOSE
      ======================================================= */

      onClose();
    } catch (error) {
      console.error(
        "Create technician error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create technician.",
        {
          position: "bottom-center",
          autoClose: 5000,
          theme: "light",
        }
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     STYLES
  ========================================================= */

  const labelClass =
    "mb-1.5 block text-xs font-medium text-blue-900 sm:mb-2 sm:text-sm";

  const inputClass =
    "w-full rounded-lg border border-blue-100 bg-white p-2.5 text-sm text-slate-900 placeholder:text-blue-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:p-3 sm:text-base";

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
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
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="flex items-center justify-between border-b border-blue-100 bg-white px-4 py-3.5 sm:px-6 sm:py-4">
          <div>
            <h2 className="text-base font-semibold text-blue-900 sm:text-xl">
              Add Technician
            </h2>

            <p className="mt-0.5 text-xs text-blue-400">
              Create a new technician account.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-full p-1.5 text-blue-400 transition hover:bg-blue-50 hover:text-blue-900 disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="flex-1 overflow-y-auto bg-blue-50/40 px-4 py-5 sm:px-6">
          <div className="space-y-5 pb-4">

            {/* =================================================
                BASIC INFORMATION
            ================================================= */}

            <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm sm:p-6">

              <h3 className="mb-5 text-sm font-semibold text-blue-900 sm:text-base">
                Basic Information
              </h3>

              {/* PROFILE PHOTO */}

              <div className="mb-6">
                <label className={labelClass}>
                  Profile Photo
                </label>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                  <div className="relative shrink-0">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-blue-100 bg-blue-50">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserRound
                          className="h-10 w-10 text-blue-300"
                        />
                      )}
                    </div>

                    <label
                      htmlFor="technician-profile-photo"
                      className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-md transition hover:bg-blue-700"
                    >
                      <Camera className="h-4 w-4" />
                    </label>
                  </div>

                  <div className="flex-1">
                    <input
                      id="technician-profile-photo"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={
                        handlePhotoChange
                      }
                      disabled={saving}
                      className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700 disabled:opacity-50"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      JPG, PNG or WebP. Maximum 5MB.
                    </p>

                    {profilePhoto && (
                      <button
                        type="button"
                        onClick={
                          handleRemovePhoto
                        }
                        disabled={saving}
                        className="mt-2 text-xs font-medium text-red-500 transition hover:text-red-700 disabled:opacity-50"
                      >
                        Remove photo
                      </button>
                    )}
                  </div>

                </div>
              </div>

              {/* BASIC FIELDS */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

                {/* FULL NAME */}

                <div>
                  <label
                    className={labelClass}
                  >
                    Full Name *
                  </label>

                  <input
                    value={
                      form.full_name
                    }
                    onChange={(e) =>
                      handleChange(
                        "full_name",
                        e.target.value
                      )
                    }
                    placeholder="Enter full name"
                    className={
                      inputClass
                    }
                    disabled={saving}
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label
                    className={labelClass}
                  >
                    Email *
                  </label>

                  <input
                    type="email"
                    value={
                      form.email
                    }
                    onChange={(e) =>
                      handleChange(
                        "email",
                        e.target.value
                      )
                    }
                    placeholder="Enter email"
                    className={
                      inputClass
                    }
                    disabled={saving}
                  />
                </div>

                {/* PASSWORD */}

                <div>
                  <label
                    className={labelClass}
                  >
                    Password *
                  </label>

                  <input
                    type="password"
                    value={
                      form.password
                    }
                    onChange={(e) =>
                      handleChange(
                        "password",
                        e.target.value
                      )
                    }
                    placeholder="Minimum 8 characters"
                    className={
                      inputClass
                    }
                    disabled={saving}
                  />
                </div>

                {/* PHONE */}

                <div>
                  <label
                    className={labelClass}
                  >
                    Phone
                  </label>

                  <input
                    value={
                      form.phone
                    }
                    onChange={(e) =>
                      handleChange(
                        "phone",
                        e.target.value
                      )
                    }
                    placeholder="Phone number"
                    className={
                      inputClass
                    }
                    disabled={saving}
                  />
                </div>

              </div>
            </div>

            {/* =================================================
                TECHNICIAN INFORMATION
            ================================================= */}

            <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm sm:p-6">

              <h3 className="mb-5 text-sm font-semibold text-blue-900 sm:text-base">
                Technician Information
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

                {/* REGION */}

                <div>
                  <label
                    className={labelClass}
                  >
                    Region
                  </label>

                  <input
                    value={
                      form.region
                    }
                    onChange={(e) =>
                      handleChange(
                        "region",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Dhaka"
                    className={
                      inputClass
                    }
                    disabled={saving}
                  />
                </div>

                {/* STATUS */}

                <div>
                  <label
                    className={labelClass}
                  >
                    Status
                  </label>

                  <select
                    value={
                      form.status
                    }
                    onChange={(e) =>
                      handleChange(
                        "status",
                        e.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                    disabled={saving}
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
                    className={labelClass}
                  >
                    Skills
                  </label>

                  <textarea
                    rows={4}
                    value={
                      form.skills
                    }
                    onChange={(e) =>
                      handleChange(
                        "skills",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Installation, Maintenance, Repair"
                    className={`${inputClass} resize-none`}
                    disabled={saving}
                  />
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <div className="flex flex-col-reverse gap-3 border-t border-blue-100 bg-white px-4 py-3.5 sm:flex-row sm:justify-end sm:px-6 sm:py-4">

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="w-full rounded-lg border border-blue-100 px-5 py-2.5 text-sm font-medium text-blue-900 transition hover:bg-blue-50 disabled:opacity-60 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {saving
              ? "Creating..."
              : "Create Technician"}
          </button>

        </div>
      </div>
    </div>
  );
}