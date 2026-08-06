"use client";

import Image from "next/image";
import { Upload, X } from "lucide-react";
import { useRef } from "react";

interface Props {
  preview: string | null;
  onFileChange: (file: File | null) => void;
}

export default function ImageUploader({
  preview,
  onFileChange,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  return (
    <div>

      <label className="mb-2 block text-sm font-medium">
        Product Image
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        className="group flex h-60 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 transition hover:border-blue-500"
      >

        {preview ? (
          <div className="relative h-full w-full">

            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onFileChange(null);
              }}
              className="absolute right-3 top-3 rounded-full bg-white p-2 shadow"
            >
              <X className="h-4 w-4" />
            </button>

          </div>
        ) : (
          <div className="text-center">

            <Upload className="mx-auto mb-4 h-10 w-10 text-gray-400" />

            <h3 className="font-semibold">
              Upload Product Image
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              PNG, JPG, WEBP
            </p>

          </div>
        )}

      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(e) =>
          onFileChange(
            e.target.files?.[0] || null
          )
        }
      />

    </div>
  );
}