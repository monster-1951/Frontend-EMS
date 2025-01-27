import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
  name: "Role",
  initialState: { value: localStorage.getItem("role") },
  reducers: {
    SetRole: (state, Role) => {
      state.value = Role.payload;
    },
  },
});

// Export actions and reducer
export const { SetRole } = roleSlice.actions;
export default roleSlice.reducer; // Correctly export the reducer
