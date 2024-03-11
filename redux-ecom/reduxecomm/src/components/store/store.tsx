import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import viewProductSlice from './viewProductSlice';
import customerSlice from "./customerSlice";

export const store = configureStore({
    reducer:{
        product : productSlice,
        cart : cartSlice,
        viewProduct : viewProductSlice,
        viewCustomers : customerSlice
    }
})