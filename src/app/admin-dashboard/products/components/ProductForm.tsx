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
  const labelClass =
    "mb-1.5 block text-xs font-medium text-blue-900 sm:mb-2 sm:text-sm";
  const inputClass =
    "w-full rounded-lg border border-blue-100 bg-white p-2.5 text-sm text-slate-900 placeholder:text-blue-300 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:p-3 sm:text-base";
  const cardClass =
    "rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:p-6";
  const cardTitleClass =
    "mb-4 text-sm font-semibold text-blue-900 sm:mb-6 sm:text-lg";

  return (
    <div className="space-y-5 sm:space-y-8">

      {/* Basic Information */}

      <div className={cardClass}>
        <h3 className={cardTitleClass}>
          Basic Information
        </h3>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">

          <div>
            <label className={labelClass}>
              Product Name
            </label>

            <input
<<<<<<< HEAD
              className={inputClass}
=======
              className="w-full rounded-lg border p-3 text-gray-900"
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
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
            <label className={labelClass}>
              Slug
            </label>

            <input
<<<<<<< HEAD
              className={inputClass}
=======
              className="w-full rounded-lg border p-3 text-gray-900"
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
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
            <label className={labelClass}>
              SKU
            </label>

            <input
<<<<<<< HEAD
              className={inputClass}
=======
              className="w-full rounded-lg border p-3 text-gray-900"
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
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

      <div className={cardClass}>
        <h3 className={cardTitleClass}>
          Product Details
        </h3>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">

          <div>

            <div>
              <label className={labelClass}>
                Product Type
              </label>

<<<<<<< HEAD
              <select
                className={inputClass}
=======
            <select
                className="w-full rounded-lg border p-3 text-gray-900"
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
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
            <label className={labelClass}>
              Price
            </label>

            <input
              type="number"
<<<<<<< HEAD
              className={inputClass}
=======
              className="w-full rounded-lg border p-3 text-gray-900"
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
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
            <label className={labelClass}>
              Status
            </label>

            <select
<<<<<<< HEAD
              className={inputClass}
=======
              className="w-full rounded-lg border p-3 text-gray-900"
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
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

      <div className={cardClass}>
        <h3 className={cardTitleClass}>
          Description
        </h3>

        <div className="space-y-4 sm:space-y-6">

          <div>
            <label className={labelClass}>
              Perfect For
            </label>

            <textarea
              rows={3}
<<<<<<< HEAD
              className={`${inputClass} resize-none`}
=======
              className="w-full rounded-lg border p-3 text-gray-900"
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
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
            <label className={labelClass}>
              Short Description
            </label>

            <textarea
              rows={3}
<<<<<<< HEAD
              className={`${inputClass} resize-none`}
=======
              className="w-full rounded-lg border p-3 text-gray-900"
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
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
            <label className={labelClass}>
              Key Features
            </label>

            <textarea
              rows={5}
<<<<<<< HEAD
              className={`${inputClass} resize-none`}
=======
              className="w-full rounded-lg border p-3 text-gray-900"
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
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
            <label className={labelClass}>
              Technical Specifications
            </label>

            <textarea
              rows={5}
<<<<<<< HEAD
              className={`${inputClass} resize-none`}
=======
              className="w-full rounded-lg border p-3 text-gray-900"
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
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
            <label className={labelClass}>
              Package Includes
            </label>

            <textarea
              rows={5}
<<<<<<< HEAD
              className={`${inputClass} resize-none`}
=======
              className="w-full rounded-lg border p-3 text-gray-900"
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
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

      <div className={cardClass}>
        <h3 className={cardTitleClass}>
          Warranty
        </h3>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">

          <div>
            <label className={labelClass}>
              Warranty (Months)
            </label>

            <input
              type="number"
<<<<<<< HEAD
              className={inputClass}
=======
              className="w-full rounded-lg border p-3 text-gray-900"
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
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
            <label className={labelClass}>
              Replacement (Months)
            </label>

            <input
              type="number"
<<<<<<< HEAD
              className={inputClass}
=======
              className="w-full rounded-lg border p-3 text-gray-900"
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
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

        <div className="mt-6 flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50/40 p-3 sm:mt-8 sm:p-4">

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
            className="h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
          />

          <label className="text-sm font-medium text-blue-900">
            Featured Product
          </label>

        </div>

      </div>

    </div>
  );
}