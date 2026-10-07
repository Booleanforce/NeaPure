import { api } from '@/store/api';
import type { Category, Product } from '@/services/product.service';

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[] | { results: Category[] }, void>({
      query: () => 'products/categories',
    }),
    getProducts: builder.query<Product[] | { results: Product[] }, void>({
      query: () => 'products',
    }),
  }),
});

export const { useGetCategoriesQuery, useGetProductsQuery } = productsApi;