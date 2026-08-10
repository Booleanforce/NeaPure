import { apiClient } from "./apiClient";

/* ============================================================================
   CATEGORY
============================================================================ */

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
   PRODUCT IMAGE
============================================================================ */

export interface ProductImage {
  id: string;

  /**
   * Raw image path returned by Django.
   */
  image?: string;

  /**
   * Resolved image URL.
   */
  image_url?: string;

  alt_text?: string;

  is_primary: boolean;

  order?: number;

  created_at?: string;
}

/* ============================================================================
   PRODUCT
============================================================================ */

export interface Product {
  id: string;

  /* ------------------------------------------------------------------------
     Basic Information
  ------------------------------------------------------------------------ */

  name: string;
  slug: string;
  sku: string;

  product_type: string;

  /**
   * Django DecimalField may be returned as a string.
   */
  price: number | string;

  /* ------------------------------------------------------------------------
     Category
  ------------------------------------------------------------------------ */

  category?: Category | null;

  /**
   * Used by create/update payloads.
   */
  category_id?: string | null;

  /**
   * Used by ProductListSerializer.
   */
  category_name?: string | null;

  /* ------------------------------------------------------------------------
     Product Information
  ------------------------------------------------------------------------ */

  perfect_for?: string;

  short_description?: string;

  key_features?: string;

  technical_specs?: string;

  package_includes?: string;

  warranty_duration_months?: number;

  recommended_replacement_months?: number | null;

  /* ------------------------------------------------------------------------
     Status
  ------------------------------------------------------------------------ */

  status: "ACTIVE" | "INACTIVE";

  is_featured: boolean;

  /* ------------------------------------------------------------------------
     Images
  ------------------------------------------------------------------------ */

  /**
   * Primary image returned by ProductListSerializer.
   */
  primary_image?: string | null;

  /**
   * Complete image collection returned by ProductDetailSerializer.
   */
  images?: ProductImage[];

  /* ------------------------------------------------------------------------
     Optional inventory fields
     
     These are kept optional because your current Django
     ProductListSerializer/ProductDetailSerializer do not return them.
  ------------------------------------------------------------------------ */

  stock?: number;

  /* ------------------------------------------------------------------------
     Timestamps
  ------------------------------------------------------------------------ */

  created_at?: string;

  updated_at?: string;
}

/* ============================================================================
   PRODUCT LIST RESPONSE
============================================================================ */

export interface ProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

/* ============================================================================
   PRODUCT CREATE PAYLOAD
============================================================================ */

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
   PRODUCT UPDATE PAYLOAD
============================================================================ */

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
   PRODUCT SERVICE
============================================================================ */

export const productService = {
  /* ==========================================================================
     PRODUCTS
  ========================================================================== */

  /**
   * Get paginated products.
   *
   * GET
   * /api/products/products/
   */
  async getProducts(
    search = "",
    page = 1
  ): Promise<ProductListResponse> {
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
   * GET
   * /api/products/products/{slug}/
   *
   * Returns ProductDetailSerializer.
   */
  async getProduct(
    slug: string
  ): Promise<Product> {
    return apiClient.get<Product>(
      `/api/products/products/${slug}/`
    );
  },

  /**
   * Create product.
   *
   * POST
   * /api/products/products/
   */
  async createProduct(
    data: CreateProductPayload
  ): Promise<Product> {
    return apiClient.post<Product>(
      "/api/products/products/",
      data
    );
  },

  /**
   * Update product.
   *
   * PATCH
   * /api/products/products/{slug}/
   */
  async updateProduct(
    slug: string,
    data: UpdateProductPayload
  ): Promise<Product> {
    return apiClient.patch<Product>(
      `/api/products/products/${slug}/`,
      data
    );
  },

  /**
   * Delete product.
   *
   * DELETE
   * /api/products/products/{slug}/
   */
  async deleteProduct(
    slug: string
  ): Promise<void> {
    await apiClient.delete(
      `/api/products/products/${slug}/`
    );
  },

  /* ==========================================================================
     CATEGORIES
  ========================================================================== */

  /**
   * Get all categories.
   *
   * Backend may return either:
   * - Category[]
   * - CategoryListResponse
   */
  async getCategories(): Promise<
    Category[] | CategoryListResponse
  > {
    return apiClient.get<
      Category[] | CategoryListResponse
    >("/api/products/categories/");
  },

  /**
   * Get a single category by slug.
   *
   * GET
   * /api/products/categories/{slug}/
   */
  async getCategory(
    slug: string
  ): Promise<Category> {
    return apiClient.get<Category>(
      `/api/products/categories/${slug}/`
    );
  },

  /**
   * Create category.
   *
   * POST
   * /api/products/categories/
   */
  async createCategory(
    data: Pick<Category, "name" | "description">
  ): Promise<Category> {
    return apiClient.post<Category>(
      "/api/products/categories/",
      data
    );
  },

  /**
   * Update category.
   *
   * PATCH
   * /api/products/categories/{slug}/
   */
  async updateCategory(
    slug: string,
    data: Partial<
      Pick<Category, "name" | "description">
    >
  ): Promise<Category> {
    return apiClient.patch<Category>(
      `/api/products/categories/${slug}/`,
      data
    );
  },

  /**
   * Delete category.
   *
   * DELETE
   * /api/products/categories/{slug}/
   */
  async deleteCategory(
    slug: string
  ): Promise<void> {
    await apiClient.delete(
      `/api/products/categories/${slug}/`
    );
  },

  /* ==========================================================================
     PRODUCT IMAGE
  ========================================================================== */

  /**
   * Upload a product image.
   *
   * POST
   * /api/products/products/{slug}/upload_image/
   *
   * Uses multipart/form-data.
   */
  async uploadImage(
    slug: string,
    file: File,
    alt_text = "",
    is_primary = true
  ): Promise<Product> {
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

    /**
     * Your Django upload endpoint returns
     * ProductDetailSerializer(product),
     * not ProductImageSerializer.
     */
    return apiClient.post<Product>(
      `/api/products/products/${slug}/upload_image/`,
      formData
    );
  },

  /* ==========================================================================
     FEATURED PRODUCTS
  ========================================================================== */

  /**
   * Get featured products.
   *
   * GET
   * /api/products/products/featured/
   */
  async getFeaturedProducts(): Promise<
    Product[] | ProductListResponse
  > {
    return apiClient.get<
      Product[] | ProductListResponse
    >(
      "/api/products/products/featured/"
    );
  },
};