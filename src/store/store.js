import { configureStore } from "@reduxjs/toolkit";
import searchSearchDataReducer from "./Slices/searchDataSlice";
import isSubedReducer from './Slices/SubscriptionSlice'

export const store = configureStore({
  reducer: {
    searchData: searchSearchDataReducer,
    subscription: isSubedReducer
  },
});