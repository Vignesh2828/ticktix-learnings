import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import viewProductSlice from './viewProductSlice';
import customerSlice from "./customerSlice";
import specificProductSlice from "./specificProductSlice";

export const store = configureStore({
    reducer:{
        product : productSlice,
        cart : cartSlice,
        viewProduct : viewProductSlice,
        viewCustomers : customerSlice,
        viewSpecificProduct: specificProductSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
