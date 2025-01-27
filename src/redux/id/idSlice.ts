import { createSlice } from "@reduxjs/toolkit";

const idSlice = createSlice({
  name: "ID",
  initialState: {  value: localStorage.getItem("id")},
  reducers: {
    SetID: (state, ID) => {
      state.value = ID.payload;
    },
  },
});

// Export actions and reducer
export const { SetID } = idSlice.actions;
export default idSlice.reducer; // Correctly export the reducer
