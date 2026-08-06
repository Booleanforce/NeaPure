/* eslint-disable @typescript-eslint/no-explicit-any */
export default function WarrantyCard({
  product,
}: any) {
  return (
    <section className="container mx-auto py-16">

      <div className="rounded-3xl bg-blue-700 p-10 text-white">

        <h2 className="text-4xl font-bold">

          Warranty

        </h2>

        <p className="mt-5 text-xl">

          {product.warranty_duration_months}
          {" "}
          Months Official Warranty

        </p>

      </div>

    </section>
  );
}