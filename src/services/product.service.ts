/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "./apiClient";

/* ============================================================================
 * Category
 * ========================================================================== */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[];
}

/* ============================================================================
 * Product Image
 * ========================================================================== */

export interface ProductImage {
  id: string;

  /**
   * Raw image path returned by Django
   */
  image?: string;

  /**
   * Resolved/absolute image URL
   */
  image_url?: string;

  alt_text?: string;

  is_primary: boolean;

  order?: number;

  created_at?: string;
}

/* ============================================================================
 * Product
 * ========================================================================== */

export interface Product {
  id: string;

  name: string;
  slug: string;
  sku: string;

  /* ------------------------------------------------------------------------ */
  /* Category                                                                 */
  /* ------------------------------------------------------------------------ */

  category?: Category | null;

  category_id?: string | null;

  /**
   * Used by ProductListSerializer
   */
  category_name?: string | null;

  /* ------------------------------------------------------------------------ */
  /* Product Information                                                      */
  /* ------------------------------------------------------------------------ */

  product_type: string;

  /**
   * Django DecimalField can be returned as a string.
   */
  price: number | string;

  perfect_for?: string;

  short_description?: string;

  key_features?: string;

  technical_specs?: string;

  package_includes?: string;

  warranty_duration_months?: number;

  recommended_replacement_months?: number | null;

  /* ------------------------------------------------------------------------ */
  /* Status                                                                    */
  /* ------------------------------------------------------------------------ */

  status: "ACTIVE" | "INACTIVE";

  is_featured: boolean;

  /* ------------------------------------------------------------------------ */
  /* Images                                                                    */
  /* ------------------------------------------------------------------------ */

  /**
   * Primary image returned by ProductListSerializer
   * and ProductDetailSerializer.
   */
  primary_image?: string | null;

  /**
   * Full product image collection returned by
   * ProductDetailSerializer.
   */
  images?: ProductImage[];

  /* ------------------------------------------------------------------------ */
  /* Other                                                                     */
  /* ------------------------------------------------------------------------ */

  stock?: number;

  thumbnail?: string | null;

  image?: string | null;

  featured?: boolean;

  created_at?: string;

  updated_at?: string;
}

/* ============================================================================
 * Product List Response
 * ========================================================================== */

export interface ProductListResponse {
  count: number;

  next: string | null;

  previous: string | null;

  results: Product[];
}

/* ============================================================================
 * Product Create Payload
 * ========================================================================== */

export interface CreateProductPayload {
  category_id?: string | null;

  product_type: string;

  name: string;

  slug?: string;

  sku: string;

  price: number;

  perfect_for?: string;

  short_description?: string;

  key_features?: string;

  technical_specs?: string;

  package_includes?: string;

  warranty_duration_months?: number;

  recommended_replacement_months?: number | null;

  status?: "ACTIVE" | "INACTIVE";

  is_featured?: boolean;
}

/* ============================================================================
 * Product Update Payload
 * ========================================================================== */

export interface UpdateProductPayload {
  category_id?: string | null;

  product_type?: string;

  name?: string;

  slug?: string;

  sku?: string;

  price?: number;

  perfect_for?: string;

  short_description?: string;

  key_features?: string;

  technical_specs?: string;

  package_includes?: string;

  warranty_duration_months?: number;

  recommended_replacement_months?: number | null;

  status?: "ACTIVE" | "INACTIVE";

  is_featured?: boolean;
}

/* ============================================================================
 * Product Service
 * ========================================================================== */

export const productService = {
  /* ==========================================================================
   * Products
   * ======================================================================== */

  /**
   * Get paginated products.
   */
  getProducts(search = "", page = 1) {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.append("search", search.trim());
    }

    params.append("page", page.toString());

    return apiClient.get<ProductListResponse>(
      `/api/products/products/?${params.toString()}`
    );
  },

  /**
   * Get a single product by slug.
   *
   * This endpoint returns:
   * - primary_image
   * - images
   * - category
   * - complete product information
   */
  getProduct(slug: string) {
    return apiClient.get<Product>(
      `/api/products/products/${slug}/`
    );
  },

  /**
   * Create product.
   */
  createProduct(data: CreateProductPayload) {
    return apiClient.post<Product>(
      "/api/products/products/",
      data
    );
  },

  /**
   * Update product.
   *
   * Uses PATCH because only changed fields need to be sent.
   */
  updateProduct(
    slug: string,
    data: UpdateProductPayload
  ) {
    return apiClient.patch<Product>(
      `/api/products/products/${slug}/`,
      data
    );
  },

  /**
   * Delete product.
   */
  deleteProduct(slug: string) {
    return apiClient.delete(
      `/api/products/products/${slug}/`
    );
  },

  /* ==========================================================================
   * Categories
   * ======================================================================== */

  /**
   * Get categories.
   *
   * Backend may return either:
   * - Category[]
   * - paginated CategoryListResponse
   */
  getCategories() {
    return apiClient.get<
      Category[] | CategoryListResponse
    >("/api/products/categories/");
  },

  /**
   * Get one category by slug.
   */
  getCategory(slug: string) {
    return apiClient.get<Category>(
      `/api/products/categories/${slug}/`
    );
  },

  /**
   * Create category.
   */
  createCategory(
    data: Pick<
      Category,
      "name" | "description"
    >
  ) {
    return apiClient.post<Category>(
      "/api/products/categories/",
      data
    );
  },

  /**
   * Update category.
   */
  updateCategory(
    slug: string,
    data: Partial<
      Pick<Category, "name" | "description">
    >
  ) {
    return apiClient.patch<Category>(
      `/api/products/categories/${slug}/`,
      data
    );
  },

  /**
   * Delete category.
   */
  deleteCategory(slug: string) {
    return apiClient.delete(
      `/api/products/categories/${slug}/`
    );
  },

  /* ==========================================================================
   * Upload Product Image
   * ======================================================================== */

  /**
   * Upload a product image.
   *
   * If is_primary=true, Django's ProductImage model
   * will make this image the primary image.
   */
  uploadImage(
    slug: string,
    file: File,
    alt_text = "",
    is_primary = true
  ) {
    const formData = new FormData();

    formData.append(
      "image",
      file
    );

    formData.append(
      "alt_text",
      alt_text
    );

    formData.append(
      "is_primary",
      String(is_primary)
    );

    return apiClient.post<ProductImage>(
      `/api/products/products/${slug}/upload_image/`,
      formData
    );
  },

  /* ==========================================================================
   * Featured Products
   * ======================================================================== */

  getFeaturedProducts() {
    return apiClient.get<Product[]>(
      "/api/products/products/featured/"
    );
  },
};