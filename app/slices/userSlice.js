import { createSlice } from '@reduxjs/toolkit';
import { removeToken } from '../utils/tokenUtils';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      removeToken()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('loginUser/fulfilled', (state, action) => {
        state.user = action.payload.user;
        state.status = 'succeeded';
      })
      .addCase('loginUser/pending', (state) => {
        state.status = 'loading';
      })
      .addCase('loginUser/rejected', (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
