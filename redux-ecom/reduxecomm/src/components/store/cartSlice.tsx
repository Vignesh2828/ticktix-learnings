import { createSlice } from "@reduxjs/toolkit";

interface Rating {
    rate: number;
    count: number;
  }
  interface ProductValue {
    id: number;
    title: string;
    image: string;
    description: string;
    rating: Rating;
    price: number;
  }

const initialState:ProductValue[] = [];

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        add:(state,action) =>{
            state.push(action.payload);
        },
        remove:(state,action) =>{
            return state.filter(item => item.id !== action.payload)
        },
        clearCart :() =>{
            return [];
        }
    }
})

export const {add,remove, clearCart} = cartSlice.actions;
export default cartSlice.reducer;