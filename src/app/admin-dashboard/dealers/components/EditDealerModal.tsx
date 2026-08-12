/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast, Bounce } from "react-toastify";

import { dealerService } from "@/services/dealer.service";

interface Props {
  isOpen: boolean;
  dealerId: string | null;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditDealerModal({
  isOpen,
  dealerId,
  onClose,
  onUpdated,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",

    company_name: "",
    contact_person: "",
    trade_license: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    if (isOpen && dealerId) {
      loadDealer();
    }
  }, [isOpen, dealerId]);

  const loadDealer = async () => {
    if (!dealerId) return;

    try {
      setLoading(true);

      const dealer =
        await dealerService.getDealer(dealerId);

      const profile =
        dealer.dealer_profile;

      setForm({
        full_name:
          dealer.full_name || "",

        email:
          dealer.email || "",

        phone:
          dealer.phone || "",

        company_name:
          profile?.company_name || "",

        contact_person:
          profile?.contact_person || "",

        trade_license:
          profile?.trade_license || "",

        status:
          profile?.status || "ACTIVE",
      });
    } catch (error) {
      console.error(
        "GET DEALER ERROR:",
        error
      );

      alert("Failed to load dealer.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!dealerId) return;

    try {
      setSaving(true);

        const payload = {
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),

        dealer_profile: {
            company_name: form.company_name.trim(),
            contact_person: form.contact_person.trim(),
            trade_license: form.trade_license.trim(),
            status: form.status,
        },
        };
      console.log(
        "Update Dealer Payload:",
        payload
      );

      await dealerService.updateDealer(
        dealerId,
        payload
      );

      await onUpdated();

      toast.success(
        "Dealer updated successfully!",
        {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        }
      );

      onClose();
    } catch (error) {
      console.error(
        "UPDATE DEALER ERROR:",
        error
      );

      alert("Failed to update dealer.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const labelClass =
    "mb-1.5 block text-xs font-medium text-blue-900 sm:mb-2 sm:text-sm";

  const inputClass =
    "w-full rounded-lg border border-blue-100 bg-white p-2.5 text-sm text-slate-900 placeholder:text-blue-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:p-3 sm:text-base";

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-blue-950/40 p-3 backdrop-blur-sm sm:p-6">

      <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl shadow-blue-900/20">

        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-blue-100 bg-white px-4 py-3.5 sm:px-6 sm:py-4">

          <h2 className="text-base font-semibold text-blue-900 sm:text-xl">
            Edit Dealer
          </h2>

          <button
            onClick={onClose}
            disabled={saving}
            className="rounded-full p-1.5 text-blue-400 transition hover:bg-blue-50 hover:text-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Content */}

        {loading ? (

          <div className="flex flex-1 items-center justify-center p-12">

            <div className="text-center">

              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />

              <p className="text-sm text-blue-400">
                Loading dealer...
              </p>

            </div>

          </div>

        ) : (

          <div className="flex-1 overflow-y-auto bg-blue-50/40 px-4 py-5 sm:px-6">

            <div className="space-y-5 pb-4 sm:space-y-6">

              {/* Basic Information */}

              <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:p-6">

                <h3 className="mb-4 text-sm font-semibold text-blue-900 sm:mb-5 sm:text-base">
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

                  {/* Full Name */}

                  <div>
                    <label className={labelClass}>
                      Full Name
                    </label>

                    <input
                      className={inputClass}
                      value={form.full_name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          full_name:
                            e.target.value,
                        })
                      }
                      placeholder="Enter full name"
                    />
                  </div>

                  {/* Email */}

                  <div>
                    <label className={labelClass}>
                      Email
                    </label>

                    <input
                      type="email"
                      className={inputClass}
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email:
                            e.target.value,
                        })
                      }
                      placeholder="Enter email"
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
                          phone:
                            e.target.value,
                        })
                      }
                      placeholder="Phone number"
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
                          status:
                            e.target.value,
                        })
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

                </div>

              </div>

              {/* Dealer Information */}

              <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:p-6">

                <h3 className="mb-4 text-sm font-semibold text-blue-900 sm:mb-5 sm:text-base">
                  Dealer Information
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

                  {/* Company */}

                  <div>
                    <label className={labelClass}>
                      Company Name
                    </label>

                    <input
                      className={inputClass}
                      value={
                        form.company_name
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          company_name:
                            e.target.value,
                        })
                      }
                      placeholder="Company name"
                    />
                  </div>

                  {/* Contact Person */}

                  <div>
                    <label className={labelClass}>
                      Contact Person
                    </label>

                    <input
                      className={inputClass}
                      value={
                        form.contact_person
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          contact_person:
                            e.target.value,
                        })
                      }
                      placeholder="Contact person"
                    />
                  </div>

                  {/* Trade License */}

                  <div className="sm:col-span-2">

                    <label className={labelClass}>
                      Trade License
                    </label>

                    <input
                      className={inputClass}
                      value={
                        form.trade_license
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          trade_license:
                            e.target.value,
                        })
                      }
                      placeholder="Trade license number"
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Footer */}

        {!loading && (
          <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-blue-100 bg-white px-4 py-3.5 sm:flex-row sm:justify-end sm:px-6 sm:py-4">

            <button
              onClick={onClose}
              disabled={saving}
              className="w-full rounded-lg border border-blue-100 px-5 py-2.5 text-sm font-medium text-blue-900 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-2"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-2"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>
        )}

      </div>
    </div>
  );
}