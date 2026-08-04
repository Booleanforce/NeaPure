/* eslint-disable @typescript-eslint/no-explicit-any */
export default function SpecificationTable({
  product,
}: any) {
  return (
    <section className="container mx-auto py-16">

      <h2 className="mb-10 text-4xl font-bold">

        Technical Specifications

      </h2>

      <div className="overflow-hidden rounded-2xl border bg-white">

        <table className="w-full">

          <tbody>

            <tr>

              <td className="border p-4 font-semibold">

                Product Type

              </td>

              <td className="border p-4">

                {product.product_type}

              </td>

            </tr>

            <tr>

              <td className="border p-4">

                Warranty

              </td>

              <td className="border p-4">

                {product.warranty_duration_months} Months

              </td>

            </tr>

            <tr>

              <td className="border p-4">

                Replacement

              </td>

              <td className="border p-4">

                Every {product.recommended_replacement_months} Months

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </section>
  );
}