import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";
const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
    cart: cartReducer,
  },
});
export default store;
