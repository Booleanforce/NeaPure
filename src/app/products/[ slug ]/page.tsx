import {
  productService,
} from "@/services/product.service";

import ProductGallery from "@/components/product-details/ProductGallery";
import ProductInfo from "@/components/product-details/ProductInfo";
import FeatureList from "@/components/product-details/FeatureList";
import SpecificationTable from "@/components/product-details/SpecificationTable";
import PackageIncludes from "@/components/product-details/PackageIncludes";
import WarrantyCard from "@/components/product-details/WarrantyCard";
import RelatedProducts from "@/components/product-details/RelatedProducts";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetails({
  params,
}: Props) {
  const { slug } = await params;

  const product =
    await productService.getProduct(slug);

  const related =
    await productService.getProducts();

  return (
    <main className="bg-gray-50">

      <section className="container mx-auto py-16">

        <div className="grid gap-16 lg:grid-cols-2">

          <ProductGallery
            images={product.images || []}
          />

          <ProductInfo
            product={product}
          />

        </div>

      </section>

      <FeatureList
        product={product}
      />

      <SpecificationTable
        product={product}
      />

      <PackageIncludes
        product={product}
      />

      <WarrantyCard
        product={product}
      />

      <RelatedProducts
        products={related.results.filter(
          (item) =>
            item.slug !== product.slug
        )}
      />

    </main>
  );
}