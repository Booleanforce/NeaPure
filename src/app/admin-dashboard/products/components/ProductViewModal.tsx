/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useState } from "react";

import { Modal } from "@/components/ui/Modal";

import {
  Product,
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

  const loadProduct = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);

      const data =
        await productService.getProduct(slug);

      setProduct(data);
    } catch (err) {
      console.error(err);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (isOpen) {
      loadProduct();
    }
  }, [isOpen, loadProduct]);

  useEffect(() => {
    if (!isOpen) {
      setProduct(null);
      setActiveTab("Overview");
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
    >
      {loading ? (
        <div className="flex h-[600px] items-center justify-center">
          Loading Product...
        </div>
      ) : !product ? (
        <div className="flex h-[600px] items-center justify-center">
          Product not found.
        </div>
      ) : (
        <div className="flex max-h-[85vh] flex-col">

          <Header product={product} />

          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div className="flex-1 overflow-y-auto bg-gray-50 p-6">

            {activeTab === "Overview" && (
              <OverviewTab product={product} />
            )}

            {activeTab === "Gallery" && (
              <GalleryTab product={product} />
            )}

            {activeTab === "Specifications" && (
              <SpecificationTab
                product={product}
              />
            )}

            {activeTab === "Documents" && (
              <DocumentsTab
                product={product}
              />
            )}

            {activeTab === "Related" && (
              <RelatedProductsTab
                product={product}
              />
            )}

            {activeTab === "SEO" && (
              <SeoTab product={product} />
            )}

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