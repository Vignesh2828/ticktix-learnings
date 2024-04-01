import { createSlice } from "@reduxjs/toolkit";

interface Rating {
    rate : number;
    count : number;
}
interface ProductValue {
    id : number;
    title : string;
    image : string;
    description : string;
    rating : Rating;
    price : number;
  }

const initialState: ProductValue[] = [];

const viewProductSlice = createSlice({
    name : 'viewProduct',
    initialState,
    reducers : {
        view : (state,action) => {
            return [action.payload]
        }
    }
})

export const {view} = viewProductSlice.actions;
export default viewProductSlice.reducer;