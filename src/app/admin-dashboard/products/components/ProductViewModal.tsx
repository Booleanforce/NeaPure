/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useState } from "react";

import { Modal } from "@/components/ui/Modal";

import {
  Product,
  ProductImage,
  productService,
} from "@/services/product.service";

import Header from "./productModalView/Header";
import Tabs from "./productModalView/Tabs";
import OverviewTab from "./productModalView/OverviewTab";
import GalleryTab from "./productModalView/GalleryTab";
import SpecificationTab from "./productModalView/SpecificationTab";
import DocumentsTab from "./productModalView/DocumentsTab";
import RelatedProductsTab from "./productModalView/RelatedProductsTab";
import SeoTab from "./productModalView/SeoTab";
import HistoryTab from "./productModalView/HistoryTab";

interface Props {
  isOpen: boolean;
  slug: string | null;
  onClose: () => void;
}

export default function ProductViewModal({
  isOpen,
  slug,
  onClose,
}: Props) {
  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("Overview");

  /* -------------------------------------------------------------------------- */
  /*                              Load Product                                  */
  /* -------------------------------------------------------------------------- */

  const loadProduct = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);

      const data =
        await productService.getProduct(slug);

      console.log("PRODUCT DETAIL:", data);

      /* ---------------------------------------------------------------------- */
      /* Normalize Images                                                       */
      /* ---------------------------------------------------------------------- */

      let normalizedImages: ProductImage[] =
        Array.isArray(data.images)
          ? data.images
          : [];

      /* ---------------------------------------------------------------------- */
      /* Add primary_image if images array is empty                              */
      /* ---------------------------------------------------------------------- */

      if (
        data.primary_image &&
        normalizedImages.length === 0
      ) {
        normalizedImages = [
          {
            id: `primary-${data.id}`,
            image: data.primary_image,
            image_url: data.primary_image,
            alt_text: data.name,
            is_primary: true,
            order: 0,
          },
        ];
      }

      /* ---------------------------------------------------------------------- */
      /* If images exist but don't have primary image, add it                    */
      /* ---------------------------------------------------------------------- */

      if (
        data.primary_image &&
        normalizedImages.length > 0
      ) {
        const alreadyExists =
          normalizedImages.some(
            (image) =>
              image.image_url ===
                data.primary_image ||
              image.image ===
                data.primary_image
          );

        if (!alreadyExists) {
          normalizedImages = [
            {
              id: `primary-${data.id}`,
              image: data.primary_image,
              image_url: data.primary_image,
              alt_text: data.name,
              is_primary: true,
              order: 0,
            },
            ...normalizedImages,
          ];
        }
      }

      /* ---------------------------------------------------------------------- */
      /* Save Product                                                           */
      /* ---------------------------------------------------------------------- */

      setProduct({
        ...data,
        images: normalizedImages,
      });
    } catch (error) {
      console.error(
        "Failed to load product:",
        error
      );

      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  /* -------------------------------------------------------------------------- */
  /*                              Open Modal                                    */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (isOpen && slug) {
      loadProduct();
    }
  }, [isOpen, slug, loadProduct]);

  /* -------------------------------------------------------------------------- */
  /*                              Close Modal                                   */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (!isOpen) {
      setProduct(null);
      setActiveTab("Overview");
    }
  }, [isOpen]);

  /* -------------------------------------------------------------------------- */
  /*                                Render                                      */
  /* -------------------------------------------------------------------------- */

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
    >
      {/* ====================================================================== */}
      {/* Loading                                                               */}
      {/* ====================================================================== */}

      {loading ? (
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="flex flex-col items-center gap-3">

            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

            <p className="text-sm text-blue-500">
              Loading Product...
            </p>

          </div>
        </div>
      ) : !product ? (
        /* ==================================================================== */
        /* Product Not Found                                                    */
        /* ==================================================================== */

        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">

            <p className="text-lg font-semibold text-gray-800">
              Product not found.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Unable to load product information.
            </p>

          </div>
        </div>
      ) : (
        /* ==================================================================== */
        /* Product Content                                                      */
        /* ==================================================================== */

        <div className="flex min-h-0 flex-1 flex-col">

          {/* Header */}
          <Header product={product} />

          {/* Tabs */}
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Tab Content */}
          <div className="min-h-0 flex-1 overflow-y-auto bg-gray-50 p-6">

            {/* Overview */}
            {activeTab === "Overview" && (
              <OverviewTab
                product={product}
              />
            )}

            {/* Gallery */}
            {activeTab === "Gallery" && (
              <GalleryTab
                product={product}
              />
            )}

            {/* Specifications */}
            {activeTab === "Specifications" && (
              <SpecificationTab
                product={product}
              />
            )}

            {/* Documents */}
            {activeTab === "Documents" && (
              <DocumentsTab
                product={product}
              />
            )}

            {/* Related */}
            {activeTab === "Related" && (
              <RelatedProductsTab
                product={product}
              />
            )}

            {/* SEO */}
            {activeTab === "SEO" && (
              <SeoTab
                product={product}
              />
            )}

            {/* History */}
            {activeTab === "History" && (
              <HistoryTab
                product={product}
              />
            )}

          </div>
        </div>
      )}
    </Modal>
  );
}