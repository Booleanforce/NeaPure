"use client";

import { useEffect, useState } from "react";
import { X, Camera, UserRound } from "lucide-react";
import { Bounce, toast } from "react-toastify";

import { technicianService } from "@/services/technician.service";

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
  const [saving, setSaving] = useState(false);

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

  /*
   * Clean up preview URL when component unmounts
   * or when preview changes.
   */
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  if (!isOpen) return null;

  const handleChange = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /*
   * Profile photo handler
   */
  const handlePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    /*
     * Validate file type
     */
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Please select a JPG, PNG, or WebP image."
      );

      event.target.value = "";
      return;
    }

    /*
     * Validate file size
     * Maximum 5MB
     */
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error(
        "Profile photo must be smaller than 5MB."
      );

      event.target.value = "";
      return;
    }

    /*
     * Remove old preview URL
     */
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    /*
     * Save file
     */
    setProfilePhoto(file);

    /*
     * Create preview
     */
    const previewUrl =
      URL.createObjectURL(file);

    setPhotoPreview(previewUrl);
  };

  /*
   * Remove selected photo
   */
  const handleRemovePhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    setProfilePhoto(null);
    setPhotoPreview(null);
  };

  /*
   * Create technician
   */
  const handleSave = async () => {
    if (
      !form.full_name.trim() ||
      !form.email.trim() ||
      !form.password.trim()
    ) {
      toast.error(
        "Name, email and password are required."
      );
      return;
    }

    try {
      setSaving(true);

      /*
       * ==========================================
       * CREATE FORM DATA
       * ==========================================
       */

      const formData = new FormData();

      formData.append(
        "full_name",
        form.full_name.trim()
      );

      formData.append(
        "email",
        form.email.trim()
      );

      formData.append(
        "password",
        form.password
      );

      formData.append(
        "phone",
        form.phone.trim()
      );

      /*
       * Django receives this as JSON string.
       */
      formData.append(
        "technician_profile",
        JSON.stringify({
          region: form.region.trim(),
          skills: form.skills.trim(),
          status: form.status,
        })
      );

      /*
       * Profile photo
       */
      if (profilePhoto) {
        formData.append(
          "profile_photo",
          profilePhoto
        );
      }

      /*
       * ==========================================
       * CREATE TECHNICIAN
       * ==========================================
       */

      await technicianService.createTechnician(
        formData
      );

      /*
       * Refresh technician table
       */
      await onCreated();

      /*
       * Success message
       */
      toast.success(
        "Technician created successfully!",
        {
          position: "bottom-center",
          autoClose: 4000,
          theme: "light",
          transition: Bounce,
        }
      );

      /*
       * ==========================================
       * RESET FORM
       * ==========================================
       */

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

      /*
       * Close modal
       */
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

  const labelClass =
    "mb-1.5 block text-xs font-medium text-blue-900 sm:mb-2 sm:text-sm";

  const inputClass =
    "w-full rounded-lg border border-blue-100 bg-white p-2.5 text-sm text-slate-900 placeholder:text-blue-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:p-3 sm:text-base";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !saving
        ) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

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
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ================================================== */}
        {/* CONTENT */}
        {/* ================================================== */}

        <div className="flex-1 overflow-y-auto bg-blue-50/40 px-4 py-5 sm:px-6">
          <div className="space-y-5 pb-4">

            {/* ================================================== */}
            {/* BASIC INFORMATION */}
            {/* ================================================== */}

            <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm sm:p-6">

              <h3 className="mb-5 text-sm font-semibold text-blue-900 sm:text-base">
                Basic Information
              </h3>

              {/* ============================================ */}
              {/* PROFILE PHOTO */}
              {/* ============================================ */}

              <div className="mb-6">
                <label className={labelClass}>
                  Profile Photo
                </label>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                  {/* Photo preview */}
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

                    {/* Camera badge */}
                    <label
                      htmlFor="technician-profile-photo"
                      className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-md transition hover:bg-blue-700"
                    >
                      <Camera className="h-4 w-4" />
                    </label>

                  </div>

                  {/* Upload section */}
                  <div className="flex-1">

                    <input
                      id="technician-profile-photo"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handlePhotoChange}
                      disabled={saving}
                      className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700 disabled:opacity-50"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      JPG, PNG or WebP. Maximum 5MB.
                    </p>

                    {profilePhoto && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        disabled={saving}
                        className="mt-2 text-xs font-medium text-red-500 transition hover:text-red-700 disabled:opacity-50"
                      >
                        Remove photo
                      </button>
                    )}

                  </div>

                </div>
              </div>

              {/* ============================================ */}
              {/* BASIC FIELDS */}
              {/* ============================================ */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

                {/* Full Name */}
                <div>
                  <label className={labelClass}>
                    Full Name *
                  </label>

                  <input
                    value={form.full_name}
                    onChange={(e) =>
                      handleChange(
                        "full_name",
                        e.target.value
                      )
                    }
                    placeholder="Enter full name"
                    className={inputClass}
                    disabled={saving}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className={labelClass}>
                    Email *
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      handleChange(
                        "email",
                        e.target.value
                      )
                    }
                    placeholder="Enter email"
                    className={inputClass}
                    disabled={saving}
                  />
                </div>

                {/* Password */}
                <div>
                  <label className={labelClass}>
                    Password *
                  </label>

                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      handleChange(
                        "password",
                        e.target.value
                      )
                    }
                    placeholder="Temporary password"
                    className={inputClass}
                    disabled={saving}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className={labelClass}>
                    Phone
                  </label>

                  <input
                    value={form.phone}
                    onChange={(e) =>
                      handleChange(
                        "phone",
                        e.target.value
                      )
                    }
                    placeholder="Phone number"
                    className={inputClass}
                    disabled={saving}
                  />
                </div>

              </div>
            </div>

            {/* ================================================== */}
            {/* TECHNICIAN INFORMATION */}
            {/* ================================================== */}

            <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm sm:p-6">

              <h3 className="mb-5 text-sm font-semibold text-blue-900 sm:text-base">
                Technician Information
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

                {/* Region */}
                <div>
                  <label className={labelClass}>
                    Region
                  </label>

                  <input
                    value={form.region}
                    onChange={(e) =>
                      handleChange(
                        "region",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Dhaka"
                    className={inputClass}
                    disabled={saving}
                  />
                </div>

                {/* Status */}
                <div>
                  <label className={labelClass}>
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      handleChange(
                        "status",
                        e.target.value
                      )
                    }
                    className={inputClass}
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

                {/* Skills */}
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Skills
                  </label>

                  <textarea
                    rows={4}
                    value={form.skills}
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

        {/* ================================================== */}
        {/* FOOTER */}
        {/* ================================================== */}

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