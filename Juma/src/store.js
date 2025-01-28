import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "/src/slices/appSlice.js";
import cartSliceReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    [appSlice.reducerPath]: appSlice.reducer,
    cart: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appSlice.middleware),
  devTools: true,
});

export default store;
