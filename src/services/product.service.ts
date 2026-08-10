/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "./apiClient";

/* -------------------------------------------------------------------------- */
/*                                   Category                                 */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                Product Image                               */
/* -------------------------------------------------------------------------- */

export interface ProductImage {
  id: string;

  image?: string;

  image_url?: string;

  alt_text: string;

  is_primary: boolean;

  order?: number;

  created_at?: string;
}

/* -------------------------------------------------------------------------- */
/*                                   Product                                  */
/* -------------------------------------------------------------------------- */

export interface Product {
  id: string;

  name: string;

  slug: string;

  sku: string;

  category?: Category;

  category_id?: string;

  product_type: string;

  price: number;

  perfect_for?: string;

  short_description?: string;

  key_features?: string;

  technical_specs?: string;

  package_includes?: string;

  warranty_duration_months?: number;

  recommended_replacement_months?: number;

  status: "ACTIVE" | "INACTIVE";

  is_featured: boolean;

  featured?: boolean;

  stock?: number;

  thumbnail?: string;

  image?: string;

  images?: ProductImage[];

  created_at?: string;

  updated_at?: string;
}

export interface ProductListResponse {
  count: number;

  next: string | null;

  previous: string | null;

  results: Product[];
}

/* -------------------------------------------------------------------------- */
/*                               Product Service                              */
/* -------------------------------------------------------------------------- */

export const productService = {
  // ===========================
  // Products
  // ===========================

  getProducts(search = "", page = 1) {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.append("search", search);
    }

    params.append("page", page.toString());

    return apiClient.get<ProductListResponse>(
      `/api/products/products/?${params.toString()}`
    );
  },

  getProduct(slug: string) {
    return apiClient.get<Product>(
      `/api/products/products/${slug}/`
    );
  },

  createProduct(data: any) {
    return apiClient.post<Product>(
      "/api/products/products/",
      data
    );
  },

  updateProduct(
    slug: string,
    data: Partial<Product>
  ) {
    return apiClient.patch<Product>(
      `/api/products/products/${slug}/`,
      data
    );
  },

  deleteProduct(slug: string) {
    return apiClient.delete(
      `/api/products/products/${slug}/`
    );
  },

  // ===========================
  // Categories
  // ===========================

  getCategories() {
    return apiClient.get<
      Category[] | CategoryListResponse
    >("/api/products/categories/");
  },

  getCategory(slug: string) {
    return apiClient.get<Category>(
      `/api/products/categories/${slug}/`
    );
  },

  createCategory(data: any) {
    return apiClient.post<Category>(
      "/api/products/categories/",
      data
    );
  },

  updateCategory(
    slug: string,
    data: Partial<Category>
  ) {
    return apiClient.patch<Category>(
      `/api/products/categories/${slug}/`,
      data
    );
  },

  deleteCategory(slug: string) {
    return apiClient.delete(
      `/api/products/categories/${slug}/`
    );
  },

  // ===========================
  // Upload Product Image
  // ===========================

  uploadImage(
    slug: string,
    file: File,
    alt_text = "",
    is_primary = true
  ) {
    const formData = new FormData();

    formData.append("image", file);

    formData.append("alt_text", alt_text);

    formData.append(
      "is_primary",
      String(is_primary)
    );

    return apiClient.post(
      `/api/products/products/${slug}/upload_image/`,
      formData
    );
  },

  // ===========================
  // Featured Products
  // ===========================

  getFeaturedProducts() {
    return apiClient.get<ProductListResponse>(
      "/api/products/products/featured/"
    );
  },
};