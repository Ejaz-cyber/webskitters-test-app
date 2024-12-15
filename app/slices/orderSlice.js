import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    selectedOrder: {}
  };

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders.push(action.payload)
        },
        selectOrder: (state, action) => {
            state.selectedOrder = action.payload
        }
    }
})

export const {addOrder, selectOrder} = orderSlice.actions
export default orderSlice.reducer