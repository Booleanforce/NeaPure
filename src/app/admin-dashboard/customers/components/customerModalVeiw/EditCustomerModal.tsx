/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { customerService } from "@/services/customer.service";

interface Props {
  isOpen: boolean;
  customerId: string | null;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditCustomerModal({
  isOpen,
  customerId,
  onClose,
  onUpdated,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    status: "NEW",

    country: "",
    division_state: "",
    city: "",
    area: "",
    postal_code: "",
    full_address: "",
  });

  useEffect(() => {
    if (isOpen && customerId) {
      loadCustomer();
    }
  }, [isOpen, customerId]);

  const loadCustomer = async () => {
    try {
      setLoading(true);

      const customer = await customerService.getCustomer(
        customerId!
      );

      const address =
        customer.addresses?.find(
          (a) => a.is_default
        ) || customer.addresses?.[0];

      setForm({
        full_name: customer.full_name || "",
        email: customer.email || "",
        phone:
          customer.customer_profile?.alternate_phone ||
          customer.phone ||
          "",
        status:
          customer.customer_profile?.status ||
          "NEW",

        country: address?.country || "",
        division_state:
          address?.division_state || "",
        city: address?.city || "",
        area: address?.area || "",
        postal_code:
          address?.postal_code || "",
        full_address:
          address?.full_address || "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,

        customer_profile: {
          alternate_phone: form.phone,
          status: form.status,
        },

        addresses: [
          {
            country: form.country,
            division_state:
              form.division_state,
            city: form.city,
            area: form.area,
            postal_code:
              form.postal_code,
            full_address:
              form.full_address,
            is_default: true,
          },
        ],
      };

      console.log(payload);

      await customerService.updateCustomer(
        customerId!,
        payload
      );

      await onUpdated();

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update customer.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">

          <h2 className="text-xl font-semibold">
            Edit Customer
          </h2>

          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>

        </div>

        {loading ? (
          <div className="p-10 text-center">
            Loading...
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-5 pb-6">

            {/* Full Name */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                className="w-full rounded-lg border p-3"
                value={form.full_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    full_name: e.target.value,
                  })
                }
              />

            </div>

            {/* Email */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                className="w-full rounded-lg border p-3"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />

            </div>

            {/* Phone */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Phone
              </label>

              <input
                className="w-full rounded-lg border p-3"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
              />

            </div>

            {/* Status */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Status
              </label>

              <select
                className="w-full rounded-lg border p-3"
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value,
                  })
                }
              >
                <option value="NEW">
                  NEW
                </option>

                <option value="ACTIVE">
                  ACTIVE
                </option>

                <option value="INACTIVE">
                  INACTIVE
                </option>

                <option value="BLOCKED">
                  BLOCKED
                </option>

              </select>

            </div>

            <hr />

            <h3 className="text-lg font-semibold">
              Address Information
            </h3>

            {/* Country */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Country
              </label>

              <input
                className="w-full rounded-lg border p-3"
                value={form.country}
                onChange={(e) =>
                  setForm({
                    ...form,
                    country: e.target.value,
                  })
                }
              />

            </div>
                        {/* Division + City */}

            <div className="grid grid-cols-2 gap-4">

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Division / State
                </label>

                <input
                  className="w-full rounded-lg border p-3"
                  value={form.division_state}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      division_state: e.target.value,
                    })
                  }
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  City
                </label>

                <input
                  className="w-full rounded-lg border p-3"
                  value={form.city}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      city: e.target.value,
                    })
                  }
                />

              </div>

            </div>

            {/* Area + Postal Code */}

            <div className="grid grid-cols-2 gap-4">

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Area
                </label>

                <input
                  className="w-full rounded-lg border p-3"
                  value={form.area}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      area: e.target.value,
                    })
                  }
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Postal Code
                </label>

                <input
                  className="w-full rounded-lg border p-3"
                  value={form.postal_code}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      postal_code: e.target.value,
                    })
                  }
                />

              </div>

            </div>

            {/* Full Address */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Full Address
              </label>

              <textarea
                rows={4}
                className="w-full rounded-lg border p-3"
                value={form.full_address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    full_address: e.target.value,
                  })
                }
              />

            </div>

            {/* Footer */}

            <div className="sticky bottom-0 flex justify-end gap-3 border-t bg-white px-6 py-4">

              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </div>
          </div>
        )}

      </div>
    </div>
    
  );
}