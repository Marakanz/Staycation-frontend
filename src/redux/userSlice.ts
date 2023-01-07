import { createSlice } from "@reduxjs/toolkit";

interface currentUser {
    login: {
      _id?: string
      email?: string
      isAdmin?: boolean
      accessToken?: string
    }
  }

  const user: currentUser["login"] = {}

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: user,
        isFetching: false,
        error: false,
    },
    reducers:{
        loginStart: (state: any) => {
            state.isFetching = true;
        },
        loginSuccess: (state: any, action: any) => {
            state.isFetching = false;
            state.error = false;
            state.currentUser = action.payload;
        },
        loginError:(state: any) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const { loginStart, loginError, loginSuccess } = userSlice.actions;
export default userSlice.reducer;