import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const addToCart = (state, action) => {
        const item = action.payload;
        const existItem = state.cartItems.find((x) => x._id === item.product);

        if (existItem) {
          state.cartItems = state.cartItems.map((x) =>
            x._id === existItem._id ? item : x
          );
        } else {
          state.cartItems = [...state.cartItems, item];
        }

        // Calculate the items price
        state.itemsPrice = addDecimal(
          state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        );

        // Calculate the shipping price (if orders are over $100, free shipping; otherwise $10)
        state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

        // Calculate the tax price (15% tax)
        state.taxPrice = addDecimal(
          Number((0.15 * state.itemsPrice).toFixed(2))
        );

        // Calculate the total price
        state.totalPrice = addDecimal(
          Number(state.itemsPrice) +
            Number(state.shippingPrice) +
            Number(state.taxPrice)
        );

        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(state));
      };

      addToCart(state, action); // Call the function inside addItem
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
