import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./listingReducer";

export const store = configureStore({
  reducer: { counter: counterReducer },
});
