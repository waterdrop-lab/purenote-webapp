import { createSlice } from "@reduxjs/toolkit";
import { RESET_APP } from ".";

const initialState = {
  errorMessage: null,
  noteSiderbarWidth: 300,
};
const client = createSlice({
  name: "client",
  initialState,
  reducers: {
    setNoteSiderbarWidth: (state, action) => {
      return {
        ...state,
        noteSiderbarWidth: action.payload,
      };
    },
    setErrorMessage: (state, action) => {
      return {
        ...state,
        errorMessage: action.payload,
      };
    },
    clearErrorMessage: (state, action) => {
      return {
        ...state,
        errorMessage: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_APP, () => initialState); // 重置为初始状态
  },
});

export const {
  setSocketConnected,
  setErrorMessage,
  setNoteSiderbarWidth,
  clearErrorMessage,
} = client.actions;
export default client;
