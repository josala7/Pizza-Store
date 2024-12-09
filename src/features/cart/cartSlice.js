import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: "Margherita",
  //     unitprice: 10.99,
  //     quantity: 2,
  //     totalPrice: 33,
  //   },
  // ],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action) {
      // payload = newItem

      state.cart.push(action.payload);
    },
    increaseQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
      console.log(item.totalPrice);
    },
    decreaseQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      console.log(item.totalPrice);
      if (item.quantity === 0) {
        cartSlice.caseReducers.removeItem(state, action);
      }
    },
    removeItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;
export const {
  addItems,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export const getCart = (state) => state.cart.cart;
export const getTotalQuantity = (state) =>
  state.cart.cart.reduce((acc, pizza) => acc + pizza.quantity, 0);

export const getTotalPrice = (state) =>
  state.cart.cart.reduce((acc, pizza) => acc + pizza.totalPrice, 0);

export const getQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// export const getQuantityById(id){
//   return (state) =>
//     state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0
//   }
