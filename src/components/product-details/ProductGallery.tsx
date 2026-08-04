"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  images: {
    image_url?: string;
  }[];
}

export default function ProductGallery({
  images,
}: Props) {
  const [selected, setSelected] =
    useState(0);

  return (
    <div>

      <div className="relative h-[600px] rounded-3xl bg-white shadow">

        <Image
          src={
            images[selected]?.image_url ||
            "/images/product-placeholder.png"
          }
          fill
          alt=""
          className="object-contain p-10"
        />

      </div>

      <div className="mt-6 flex gap-4">

        {images.map((img, index) => (
          <button
            key={index}
            onClick={() =>
              setSelected(index)
            }
            className="relative h-24 w-24 overflow-hidden rounded-xl border"
          >
            <Image
              src={
                img.image_url ||
                "/images/product-placeholder.png"
              }
              fill
              alt=""
              className="object-cover"
            />
          </button>
        ))}

      </div>

    </div>
  );
}