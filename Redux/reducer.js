import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loggedIn: false,
  dropCatch: "",
  nameCheapCatched: "",
  dynadotCatched: "",
  epikCatched: "",
  godaddyCatched: "",
  nameCheapWhois: "",
  dynadotWhois: "",
  epikWhois: "",
  godaddyWhois: "",
};

export const reducer = createSlice({
  name: "reducer",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },

    setDropCatch: (state, action) => {
      state.dropCatch =
        action.payload != ""
          ? [...state.dropCatch, action.payload]
          : action.payload;
    },
    setNameCheapCatched: (state, action) => {
      state.nameCheapCatched =
        action.payload != ""
          ? [...state.nameCheapCatched, action.payload]
          : action.payload;
    },
    setDynadotCatched: (state, action) => {
      state.dynadotCatched =
        action.payload != ""
          ? [...state.dynadotCatched, action.payload]
          : action.payload;
    },
    setEpikCatched: (state, action) => {
      state.epikCatched =
        action.payload != ""
          ? [...state.epikCatched, action.payload]
          : action.payload;
    },
    setGodaddyCatched: (state, action) => {
      state.godaddyCatched =
        action.payload != ""
          ? [...state.godaddyCatched, action.payload]
          : action.payload;
    },
    setNameCheapWhois: (state, action) => {
      state.nameCheapWhois =
        action.payload != ""
          ? [...state.nameCheapWhois, action.payload]
          : action.payload;
    },
    setDynadotWhois: (state, action) => {
      state.dynadotWhois =
        action.payload != ""
          ? [...state.dynadotWhois, action.payload]
          : action.payload;
    },
    setEpikWhois: (state, action) => {
      state.epikWhois =
        action.payload != ""
          ? [...state.epikWhois, action.payload]
          : action.payload;
    },
    setGodaddyWhois: (state, action) => {
      state.godaddyWhois =
        action.payload != ""
          ? [...state.godaddyWhois, action.payload]
          : action.payload;
    },
  },
});

export const {
  setLoggedIn,
  setDropCatch,
  setNameCheapCatched,
  setDynadotCatched,
  setEpikCatched,
  setGodaddyCatched,
  setDynadotWhois,
  setEpikWhois,
  setGodaddyWhois,
  setNameCheapWhois,
} = reducer.actions;
export default reducer.reducer;
