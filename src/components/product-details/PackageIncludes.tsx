/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PackageIncludes({
  product,
}: any) {
  const items =
    product.package_includes
      ?.split("\n")
      .filter(Boolean) || [];

  return (
    <section className="container mx-auto py-20">

      <h2 className="mb-10 text-4xl font-bold">

        Package Includes

      </h2>

      <ul className="grid gap-4">

        {items.map(
          (item: string, index: number) => (
            <li
              key={index}
              className="rounded-xl border bg-white p-5"
            >
              {item}
            </li>
          )
        )}

      </ul>

    </section>
  );
}