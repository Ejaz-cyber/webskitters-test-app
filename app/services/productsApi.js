import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import constants from '../utils/constants';
import {setProducts} from '../slices/productSlice';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({baseUrl: constants.API_BASE_URL}),
  tagTypes: ['PRODUCTS'],
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => {
        return {
          url: `/products?limit=10`,
        };
      },
      providesTags: ['PRODUCTS'],
      async onQueryStarted(args, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled;
        dispatch(setProducts(data?.products));
        const transformedProducts = data?.products?.map(product => ({
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          discountPercentage: product.discountPercentage,
          rating: product.rating,
          thumbnail: product.thumbnail,
        }));

        const getProductsPatch = productsApi.util.updateQueryData(
          'getProducts',
          undefined,
          draft => {
            draft.products = transformedProducts;
          },
        );
        dispatch(getProductsPatch);
      },
    }),
  }),
});

export const {useLazyGetProductsQuery, useGetProductsQuery} = productsApi;
