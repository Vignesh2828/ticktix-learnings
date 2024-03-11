import { createSlice } from "@reduxjs/toolkit";

interface CustomerValue {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Address: string;
}
const initialState: CustomerValue[] = [];

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addCustomer } = customerSlice.actions;
export default customerSlice.reducer;
