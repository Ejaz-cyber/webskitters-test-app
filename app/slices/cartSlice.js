import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload; // { id, title, ... }
      // const existingItem = state.cartItems.find(item => item.id === product.id);
      // if (existingItem) {
      //   existingItem.quantity += 1;
      // }
      // if(state.cartItems.length > 0){

      // }
      // else {
      state.cartItems.push(product);
      // }
      console.log('add to cart --', state?.cartItems?.length);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== productId);
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.cartItems.find(item => item.id === productId);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.cartItems.find(item => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(item => item.id !== productId);
      }
    },
    clearCart: state => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
