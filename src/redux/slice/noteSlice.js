import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    userNotes: localStorage.getItem("userNotes") || "",
  },
  reducers: {
    updateNotes: (state, action) => {
      state.userNotes = action.payload;
      localStorage.setItem("userNotes", action.payload);
    },
  },
});

export const { updateNotes } = noteSlice.actions;
export default noteSlice.reducer;
