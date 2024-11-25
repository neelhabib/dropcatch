import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  whoisHostingInputValue: "",
};

export const reducer = createSlice({
  name: "reducer",
  initialState,
  reducers: {
    setHomePageData: (state, action) => {
      state.whoisHostingInputValue = action.payload;
    },
  },
});

export const { setHomePageData } = reducer.actions;
export default reducer.reducer;
