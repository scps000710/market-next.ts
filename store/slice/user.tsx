import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface userStateInterface {
  username: string | null;
  email: string | null;
  token: string | null;
  isLogin: boolean;
}

const initialState: userStateInterface = {
  username: null,
  email: null,
  token: null,
  isLogin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUser: (state, action) => {
      return (state = {
        initialState,
        ...action.payload,
        isLogin: true,
      });
    },
    updateUser: (state, action) => {
      return (state = { ...state, ...action.payload, isLogin: true });
    },
    logOut: (state) => {
      localStorage.removeItem('Token');
      return (state = { ...initialState, isLogin: false });
    },
  },
});

export const selectUser = (state: RootState) => state.user;
export const { initUser, updateUser, logOut } = userSlice.actions;
export default userSlice.reducer;
