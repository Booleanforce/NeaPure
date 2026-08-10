"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { customerService } from "@/services/customer.service";

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

    onClose();
  } catch (error) {
    console.error(error);
    alert("Failed to create customer.");
  } finally {
    setSaving(false);
  }
};
return (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-6">

    <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-xl bg-white shadow-xl">

      <div className="flex items-center justify-between border-b px-6 py-4">

        <h2 className="text-2xl font-semibold">
          Add Customer
        </h2>

        <button onClick={onClose}>
          <X className="h-5 w-5" />
        </button>

      </div>

      <div className="flex-1 overflow-y-auto p-6">

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

  {/* Full Name */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Full Name *
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
      placeholder="Enter full name"
    />
  </div>

  {/* Email */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Email *
    </label>

    <input
      type="email"
      className="w-full rounded-lg border p-3"
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
    <label className="mb-2 block text-sm font-medium">
      Password *
    </label>

    <input
      type="password"
      className="w-full rounded-lg border p-3"
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
      placeholder="Phone Number"
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
      <option value="NEW">NEW</option>
      <option value="ACTIVE">ACTIVE</option>
      <option value="INACTIVE">INACTIVE</option>
      <option value="BLOCKED">BLOCKED</option>
    </select>
  </div>

  <div></div>

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
      placeholder="Country"
    />
  </div>

  {/* Division / State */}
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
      placeholder="Division"
    />
  </div>

  {/* City */}
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
      placeholder="City"
    />
  </div>

  {/* Area */}
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
      placeholder="Area"
    />
  </div>

  {/* Postal Code */}
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
      placeholder="Postal Code"
    />
  </div>

  {/* Full Address */}
  <div className="md:col-span-2">
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
      placeholder="Full Address"
    />
  </div>

</div>

      </div>

      <div className="flex justify-end gap-3 border-t px-6 py-4">

        <button
          onClick={onClose}
          className="rounded-lg border px-5 py-2"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          {saving ? "Creating..." : "Create Customer"}
        </button>

      </div>

    </div>

  </div>
);
}