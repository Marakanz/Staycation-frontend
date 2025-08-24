import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, EMPTY_USER } from "../mutations/userMutations";

interface UserState {
  currentUser: User;
  isFetching: boolean;
  error: boolean;
  errorMessage?: string;
}

const initialState: UserState = {
  currentUser: EMPTY_USER,
  isFetching: false,
  error: false,
  errorMessage: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.errorMessage = undefined;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = action.payload;
      state.errorMessage = undefined;
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.currentUser = EMPTY_USER;
      state.errorMessage = action.payload;
    },
    logout: (state) => {
      state.currentUser = EMPTY_USER;
      state.error = false;
      state.isFetching = false;
      state.errorMessage = undefined;
    },
    clearError: (state) => {
      state.error = false;
      state.errorMessage = undefined;
    }
  }
});

export const { 
  loginStart, 
  loginError, 
  loginSuccess, 
  logout, 
  clearError 
} = userSlice.actions;

export default userSlice.reducer;