import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Rating {
        rate : number;
        count : number;
    }

interface SpecificProductState {
    data: {
        id: number;
        title: string;
        image: string;
        description: string;
        category: string; 
        price: number;
        rating: Rating
    }[]
    loading: boolean
    error: string | null
  }

export const getSpecificProducts:any = createAsyncThunk('products/get', async(id:number) => {
    const response = await axios.get("https://fakestoreapi.com/products/"+id);
   return [response.data]; 
})


const specificProductSlice = createSlice({
    name : "specificProducts",
    initialState: {
        data: [],
        loading: false,
        error: null
      } as SpecificProductState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getSpecificProducts.pending, (state,action) =>{
            state.loading = true
            state.error = null
        })
        .addCase(getSpecificProducts.fulfilled, (state,action) =>{
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(getSpecificProducts.rejected, (state,action) =>{
            state.loading = false
        state.error = action.error.message ?? null
        })
    }
})

export default specificProductSlice.reducer;
