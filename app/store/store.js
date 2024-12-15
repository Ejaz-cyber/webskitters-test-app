import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from '../services/userApi';
import { Provider } from 'react-redux';
import rtkQueryLogger from '../utils/rtkQueryLogger';
import { productsApi } from '../services/productsApi';
import productReduder from '../slices/productSlice'
import cartReducer from '../slices/cartSlice'
import orderReducer from '../slices/orderSlice'
import userReducer from '../slices/userSlice'


// Create a Redux store with RTK Query service included
const store = configureStore({
  reducer: {
    // Add the API reducer to the store
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    user: userReducer,
    product: productReduder,
    cart: cartReducer,
    order: orderReducer,
  },
  // Adding the middleware from RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApi.middleware,
      productsApi.middleware,
      rtkQueryLogger
    ),
});

export default store;
