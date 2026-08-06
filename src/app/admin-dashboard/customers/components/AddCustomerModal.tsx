"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { customerService } from "@/services/customer.service";
import { Bounce, toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function AddCustomerModal({
  isOpen,
  onClose,
  onCreated,
}: Props) {
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",

    status: "NEW",

    country: "",
    division_state: "",
    city: "",
    area: "",
    postal_code: "",
    full_address: "",
  });

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        phone: form.phone,

        customer_profile: {
          alternate_phone: form.phone,
          status: form.status,
        },

        addresses: [
          {
            country: form.country,
            division_state: form.division_state,
            city: form.city,
            area: form.area,
            postal_code: form.postal_code,
            full_address: form.full_address,
            is_default: true,
          },
        ],
      };

      console.log(payload);

      await customerService.createCustomer(payload);

      await onCreated();
      toast.success("Sign-in Successful!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create customer.");
    } finally {
      setSaving(false);
    }
  };

  const labelClass =
    "mb-1.5 block text-xs font-medium text-blue-900 sm:mb-2 sm:text-sm";
  const inputClass =
    "w-full rounded-lg border border-blue-100 bg-white p-2.5 text-sm text-slate-900 placeholder:text-blue-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:p-3 sm:text-base";

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-blue-950/40 p-3 backdrop-blur-sm sm:p-6">
      <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl shadow-blue-900/20">

        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-blue-100 bg-white px-4 py-3.5 sm:px-6 sm:py-4">

          <h2 className="text-base font-semibold text-blue-900 sm:text-xl">
            Add Customer
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-blue-400 transition hover:bg-blue-50 hover:text-blue-900"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Content */}

        <div className="flex-1 overflow-y-auto bg-blue-50/40 px-4 py-5 sm:px-6">
          <div className="space-y-5 pb-4 sm:space-y-6">

            {/* Basic Info */}

            <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:p-6">

              <h3 className="mb-4 text-sm font-semibold text-blue-900 sm:mb-5 sm:text-base">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

                {/* Full Name */}
                <div>
                  <label className={labelClass}>
                    Full Name *
                  </label>

                  <input
                    className={inputClass}
                    value={form.full_name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        full_name: e.target.value,
                      })
                    }
                    placeholder="Enter full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className={labelClass}>
                    Email *
                  </label>

                  <input
                    type="email"
                    className={inputClass}
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    placeholder="Enter email"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className={labelClass}>
                    Password *
                  </label>

                  <input
                    type="password"
                    className={inputClass}
                    value={form.password}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                    placeholder="Temporary password"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className={labelClass}>
                    Phone
                  </label>

                  <input
                    className={inputClass}
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Phone Number"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className={labelClass}>
                    Status
                  </label>

                  <select
                    className={inputClass}
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="NEW">NEW</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="BLOCKED">BLOCKED</option>
                  </select>
                </div>

              </div>

            </div>

            {/* Address Info */}

            <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:p-6">

              <h3 className="mb-4 text-sm font-semibold text-blue-900 sm:mb-5 sm:text-base">
                Address Information
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

                {/* Country */}
                <div>
                  <label className={labelClass}>
                    Country
                  </label>

                  <input
                    className={inputClass}
                    value={form.country}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        country: e.target.value,
                      })
                    }
                    placeholder="Country"
                  />
                </div>

                {/* Division / State */}
                <div>
                  <label className={labelClass}>
                    Division / State
                  </label>

                  <input
                    className={inputClass}
                    value={form.division_state}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        division_state: e.target.value,
                      })
                    }
                    placeholder="Division"
                  />
                </div>

                {/* City */}
                <div>
                  <label className={labelClass}>
                    City
                  </label>

                  <input
                    className={inputClass}
                    value={form.city}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        city: e.target.value,
                      })
                    }
                    placeholder="City"
                  />
                </div>

                {/* Area */}
                <div>
                  <label className={labelClass}>
                    Area
                  </label>

                  <input
                    className={inputClass}
                    value={form.area}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        area: e.target.value,
                      })
                    }
                    placeholder="Area"
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <label className={labelClass}>
                    Postal Code
                  </label>

                  <input
                    className={inputClass}
                    value={form.postal_code}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        postal_code: e.target.value,
                      })
                    }
                    placeholder="Postal Code"
                  />
                </div>

                {/* Full Address */}
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Full Address
                  </label>

                  <textarea
                    rows={4}
                    className={`${inputClass} resize-none`}
                    value={form.full_address}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        full_address: e.target.value,
                      })
                    }
                    placeholder="Full Address"
                  />
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Footer */}

        <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-blue-100 bg-white px-4 py-3.5 sm:flex-row sm:justify-end sm:px-6 sm:py-4">

          <button
            onClick={onClose}
            className="w-full rounded-lg border border-blue-100 px-5 py-2.5 text-sm font-medium text-blue-900 transition hover:bg-blue-50 sm:w-auto sm:py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-2"
          >
            {saving ? "Creating..." : "Create Customer"}
          </button>

        </div>

      </div>
    </div>
  );
}