// app/admin-dashboard/dealers/components/DeleteDealerModal.tsx
"use client";

import {
  AlertTriangle,
  Loader2,
  X,
  Mail,
} from "lucide-react";

import {
  Dealer,
} from "@/services/dealer.service";

interface Props {
  isOpen: boolean;
  loading: boolean;
  dealer: Dealer | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteDealerModal({
  isOpen,
  loading,
  dealer,
  onClose,
  onConfirm,
}: Props) {
  if (
    !isOpen ||
    !dealer
  ) {
    return null;
  }

  const companyName =
    dealer.dealer_profile
      ?.company_name ||
    "Dealer";

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-blue-950/40
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget &&
          !loading
        ) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full
          max-w-md
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
          shadow-blue-900/20
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-blue-100
            px-4
            py-3.5
            sm:px-6
            sm:py-4
          "
        >
          <div className="flex min-w-0 items-center gap-3">

            {/* Warning icon */}

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-red-100
                sm:h-11
                sm:w-11
              "
            >
              <AlertTriangle
                className="
                  h-5
                  w-5
                  text-red-600
                  sm:h-6
                  sm:w-6
                "
              />
            </div>

            {/* Title */}

            <div className="min-w-0">

              <h2
                className="
                  truncate
                  text-base
                  font-semibold
                  text-blue-900
                  sm:text-lg
                "
              >
                Delete Dealer
              </h2>

              <p className="text-xs text-blue-400 sm:text-sm">
                This action cannot be undone.
              </p>

            </div>
          </div>

          {/* Close */}

          <button
            type="button"
            onClick={
              onClose
            }
            disabled={
              loading
            }
            className="
              rounded-full
              p-1.5
              text-blue-400
              transition
              hover:bg-blue-50
              hover:text-blue-900
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* =====================================================
            BODY
        ===================================================== */}

        <div
          className="
            bg-blue-50/40
            px-4
            py-5
            sm:px-6
            sm:py-6
          "
        >
          <p className="text-sm leading-6 text-slate-600">
            Are you sure you want to permanently
            delete this dealer?
          </p>

          {/* Selected dealer */}

          <div
            className="
              mt-4
              rounded-xl
              border
              border-red-100
              bg-white
              p-3.5
            "
          >
            <div className="flex min-w-0 items-center gap-3">

              {/* Avatar */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-100
                  text-sm
                  font-bold
                  text-blue-700
                "
              >
                {dealer.full_name
                  ?.charAt(0)
                  .toUpperCase() ||
                  "D"}
              </div>

              <div className="min-w-0 flex-1">

                <p
                  className="
                    truncate
                    text-sm
                    font-semibold
                    text-slate-900
                  "
                  title={
                    dealer.full_name
                  }
                >
                  {dealer.full_name}
                </p>

                <div className="mt-0.5 flex min-w-0 items-center gap-1.5">

                  <Mail className="h-3 w-3 shrink-0 text-slate-400" />

                  <p
                    className="
                      min-w-0
                      truncate
                      text-xs
                      text-slate-500
                    "
                    title={
                      dealer.email
                    }
                  >
                    {dealer.email}
                  </p>

                </div>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-[10px]
                    text-blue-400
                  "
                  title={
                    companyName
                  }
                >
                  {companyName}
                </p>

              </div>
            </div>
          </div>

          {/* Warning */}

          <div
            className="
              mt-3
              rounded-lg
              border
              border-red-100
              bg-red-50
              p-3
            "
          >
            <p
              className="
                text-[11px]
                leading-relaxed
                text-red-600
              "
            >
              The dealer will be permanently
              removed from the system. This
              action cannot be undone.
            </p>
          </div>
        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div
          className="
            flex
            flex-col-reverse
            gap-3
            border-t
            border-blue-100
            px-4
            py-3.5
            sm:flex-row
            sm:justify-end
            sm:px-6
            sm:py-4
          "
        >

          {/* Cancel */}

          <button
            type="button"
            onClick={
              onClose
            }
            disabled={
              loading
            }
            className="
              w-full
              rounded-lg
              border
              border-blue-100
              px-5
              py-2.5
              text-sm
              font-medium
              text-blue-900
              transition
              hover:bg-blue-50
              disabled:cursor-not-allowed
              disabled:opacity-60
              sm:w-auto
              sm:py-2
            "
          >
            Cancel
          </button>

          {/* Delete */}

          <button
            type="button"
            onClick={
              onConfirm
            }
            disabled={
              loading
            }
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-red-600
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              shadow-sm
              transition
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-60
              sm:w-auto
              sm:py-2
            "
          >
            {loading && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}

            {loading
              ? "Deleting..."
              : "Delete Dealer"}
          </button>

        </div>
      </div>
    </div>
  );
}