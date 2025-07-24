import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shipping_info: {},
  stripe_client_secret: "",
  razorpay_order_id: "", // ✅ added
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    set_shipping: (state, { payload }) => {
      state.shipping_info = payload;
      localStorage.setItem("shipping_info", JSON.stringify(payload));
    },
    get_shipping: (state) => {
      const data = localStorage.getItem("shipping_info");
      state.shipping_info = data ? JSON.parse(data) : {};
    },
    set_client_secret: (state, { payload }) => {
      state.stripe_client_secret = payload;
    },
    set_razorpay_order_id: (state, { payload }) => {
      state.razorpay_order_id = payload; // ✅ Razorpay order ID setter
    },
  },
});

export const {
  get_shipping,
  set_shipping,
  set_client_secret,
  set_razorpay_order_id, // ✅ export it
} = orderSlice.actions;

export default orderSlice.reducer;
