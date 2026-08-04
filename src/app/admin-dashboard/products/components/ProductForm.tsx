/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CategorySelect from "../CategorySelect";

interface Props {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function ProductForm({
  form,
  setForm,
}: Props) {
  return (
    <div className="space-y-8">

      {/* Basic Information */}

      <div className="rounded-xl border bg-white p-6">
        <h3 className="mb-6 text-lg font-semibold">
          Basic Information
        </h3>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Name
            </label>

            <input
              className="w-full rounded-lg border p-3"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Slug
            </label>

            <input
              className="w-full rounded-lg border p-3"
              value={form.slug}
              onChange={(e) =>
                setForm({
                  ...form,
                  slug: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              SKU
            </label>

            <input
              className="w-full rounded-lg border p-3"
              value={form.sku}
              onChange={(e) =>
                setForm({
                  ...form,
                  sku: e.target.value,
                })
              }
            />
          </div>

          <CategorySelect
            value={form.category_id}
            onChange={(value) =>
              setForm({
                ...form,
                category_id: value,
              })
            }
          />

        </div>
      </div>

      {/* Product Details */}

      <div className="rounded-xl border bg-white p-6">
        <h3 className="mb-6 text-lg font-semibold">
          Product Details
        </h3>

        <div className="grid gap-6 md:grid-cols-3">

          <div>

            <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
                Product Type
            </label>

            <select
                className="w-full rounded-lg border p-3"
                value={form.product_type}
                onChange={(e) =>
                setForm({
                    ...form,
                    product_type: e.target.value,
                })
                }
            >
                <option value="PURIFIER">
                Purifier
                </option>

                <option value="FILTER">
                Filter
                </option>

                <option value="REPLACEMENT_KIT">
                Replacement Kit
                </option>
            </select>
            </div>

          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Price
            </label>

            <input
              type="number"
              className="w-full rounded-lg border p-3"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
            />
          </div>

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
              <option value="ACTIVE">
                ACTIVE
              </option>

              <option value="INACTIVE">
                INACTIVE
              </option>
            </select>
          </div>

        </div>
      </div>

      {/* Description */}

      <div className="rounded-xl border bg-white p-6">
        <h3 className="mb-6 text-lg font-semibold">
          Description
        </h3>

        <div className="space-y-6">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Perfect For
            </label>

            <textarea
              rows={3}
              className="w-full rounded-lg border p-3"
              value={form.perfect_for}
              onChange={(e) =>
                setForm({
                  ...form,
                  perfect_for: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Short Description
            </label>

            <textarea
              rows={3}
              className="w-full rounded-lg border p-3"
              value={form.short_description}
              onChange={(e) =>
                setForm({
                  ...form,
                  short_description:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Key Features
            </label>

            <textarea
              rows={5}
              className="w-full rounded-lg border p-3"
              value={form.key_features}
              onChange={(e) =>
                setForm({
                  ...form,
                  key_features:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Technical Specifications
            </label>

            <textarea
              rows={5}
              className="w-full rounded-lg border p-3"
              value={form.technical_specs}
              onChange={(e) =>
                setForm({
                  ...form,
                  technical_specs:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Package Includes
            </label>

            <textarea
              rows={5}
              className="w-full rounded-lg border p-3"
              value={form.package_includes}
              onChange={(e) =>
                setForm({
                  ...form,
                  package_includes:
                    e.target.value,
                })
              }
            />
          </div>

        </div>
      </div>

      {/* Warranty */}

      <div className="rounded-xl border bg-white p-6">
        <h3 className="mb-6 text-lg font-semibold">
          Warranty
        </h3>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Warranty (Months)
            </label>

            <input
              type="number"
              className="w-full rounded-lg border p-3"
              value={form.warranty_duration_months}
              onChange={(e) =>
                setForm({
                  ...form,
                  warranty_duration_months:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Replacement (Months)
            </label>

            <input
              type="number"
              className="w-full rounded-lg border p-3"
              value={
                form.recommended_replacement_months
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  recommended_replacement_months:
                    e.target.value,
                })
              }
            />
          </div>

        </div>

        <div className="mt-8 flex items-center gap-3">

          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={(e) =>
              setForm({
                ...form,
                is_featured:
                  e.target.checked,
              })
            }
          />

          <label className="text-sm font-medium">
            Featured Product
          </label>

        </div>

      </div>

    </div>
  );
}