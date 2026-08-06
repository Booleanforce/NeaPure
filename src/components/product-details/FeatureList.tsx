/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircle2 } from "lucide-react";

export default function FeatureList({
  product,
}: any) {
  const features =
    product.key_features
      ?.split("\n")
      .filter(Boolean) || [];

  return (
    <section className="container mx-auto py-20">

      <h2 className="mb-10 text-4xl font-bold">

        Key Features

      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {features.map(
          (item: string, index: number) => (
            <div
              key={index}
              className="flex gap-3 rounded-xl bg-white p-6 shadow"
            >
              <CheckCircle2
                className="text-blue-600"
              />

              <span>{item}</span>
            </div>
          )
        )}

      </div>

    </section>
  );
}