import {createSlice} from '@reduxjs/toolkit';
import { productsApi } from '../services/productsApi';

const initialState = {
  products: [],
  showDetailsForProduct: {},
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
    //   state.products = [...state.products, ...action.payload];
      state.products = action.payload
    },
    setShowDetailsForProduct: (state, action) => {
      const productId = action.payload; // ID passed to the action
      state.showDetailsForProduct = state.products.find(
        (product) => product.id === productId
      ) || null;

      console.log("setShowDetailsForProduct", state.showDetailsForProduct.title)
    }
  },
//   extraReducers: builder => {
//     builder.addMatcher(
//       productsApi.endpoints.getProducts.matchFulfilled,
//       (state, action) => {
//         state.products = [...state.products, ...action.payload]; // Append when API fetch is fulfilled
//       },
//     );
//   },
});

export const {setProducts, setShowDetailsForProduct} = productSlice.actions;
export default productSlice.reducer;
