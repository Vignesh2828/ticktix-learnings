import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data:[],
    status : 'idle'
}


export const getProducts: any = createAsyncThunk('products/get', async() => {
    const response = await axios.get("https://fakestoreapi.com/products");
    const result = response.data;
    return result;
})


const productSlice = createSlice({
    name : "products",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getProducts.pending, (state,action) =>{
            state.status = "Loading";
        })
        .addCase(getProducts.fulfilled, (state,action) =>{
            state.status = "Complted";
            state.data=action.payload;
        })
        .addCase(getProducts.rejected, (state,action) =>{
            state.status = "Rejected";
        })
    }
})

export default productSlice.reducer;
