import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import constants from '../utils/constants';
import {setProducts} from '../slices/productSlice';

// const cartForStore = cartApi.endpoints.getAllCarts.useQueryState()?.data?.['REGULAR']?.[
//   storeDetails.id
// ];
// Define the base URL for API requests
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({baseUrl: constants.API_BASE_URL}),
  tagTypes: ['PRODUCTS'],
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => {
        return {
          url: `/products?limit=4`,
        };
      },
      providesTags: ['PRODUCTS'],
      async onQueryStarted(args, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled;
        dispatch(setProducts(data?.products));
        // console.log('data----', data);
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
            // console.log("dragt----",draft)
            draft.products = transformedProducts
          },
        );
        dispatch(getProductsPatch)
      },
      //   transformResponse: response => {

      //     setProducts(response)
      //     const transformedProducts = response.products.map((product) => ({
      //         id: product.id,
      //         title: product.title,
      //         description: product.description,
      //         price: product.price,
      //         discountPercentage: product.discountPercentage,
      //         rating: product.rating,
      //         thumbnail: product.thumbnail
      //       }));

      //       return transformedProducts;
      //   },
      //   keepUnusedDataFor: 0,
    }),
  }),
});

// Export the auto-generated hook for the `getUsers` endpoint
export const {useLazyGetProductsQuery} = productsApi;

// async onQueryStarted({orderId, type}, {dispatch, queryFulfilled}){
//   const {data} = await queryFulfilled;
//   const allOrderIssuePatchResult = orderApi.util.updateQueryData(
//     'getAllOrders',
//     undefined,
//     draft => {
//       let order = draft.orders.find(order => order.id == orderId);
//       if(type == 'RETURN'){
//         console.log("caching return--------------------")
//         const returns = [...order.returns, ...data]
//         order.returns = returns
//       }else{
//         console.log("caching cancel--------------------")
//         const cancels = [...order.cancels, ...data]
//         order.cancels = cancels
//       }
//       console.log("order data in draft after caching", JSON.stringify(order))
//       return draft
//     }
//   )
//   dispatch(allOrderIssuePatchResult);
// }
