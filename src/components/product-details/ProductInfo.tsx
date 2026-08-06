/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";

export default function ProductInfo({
  product,
}: any) {
  return (
    <div>

      <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-700">

        {product.product_type}

      </span>

      <h1 className="mt-5 text-5xl font-bold">

        {product.name}

      </h1>

      <p className="mt-6 text-gray-600">

        {product.short_description}

      </p>

      <div className="mt-8 text-5xl font-bold text-blue-700">

        ৳ {product.price}

      </div>

      <div className="mt-10 flex gap-4">

        <Link
          href="/contact"
          className="rounded-xl bg-blue-600 px-8 py-4 text-white"
        >
          Buy Now
        </Link>

        <button className="rounded-xl border px-8 py-4">

          Compare

        </button>

      </div>

    </div>
  );
}