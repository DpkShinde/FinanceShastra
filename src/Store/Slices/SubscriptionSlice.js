import { createSlice } from '@reduxjs/toolkit'

const SubscriptioSlic = createSlice({
    name: "subscription",
    initialState: {
        subscription: false,
    },
    reducers: {
      setSubscriptionStatus: (state, action) => {
        state.subscription = action.payload;
      },
    },
  });
  
  export const { setSubscriptionStatus } = SubscriptioSlic.actions;
  export default SubscriptioSlic.reducer;