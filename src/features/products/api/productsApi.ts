import { api } from '@/store/api';
import type { Category, Product } from '@/services/product.service';

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[] | { results: Category[] }, void>({
      query: () => 'products/categories/', // Map to actual Django endpoint for now
    }),
    getProducts: builder.query<{ results: Product[] }, void>({
      query: () => 'products/',
    }),
  }),
});

export const { useGetCategoriesQuery, useGetProductsQuery } = productsApi;
