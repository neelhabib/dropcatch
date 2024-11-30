import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loggedIn: false,
  dropCatch: "",
  nameCheapCatched: "",
  dynadotCatched: "",
  nameSiloCatched: "",
  godaddyCatched: "",
  spaceShipCatched: "",
  nameCheapWhois: "",
  dynadotWhois: "",
  nameSiloWhois: "",
  godaddyWhois: "",
  spaceShipWhois: "",
  bulkWhois: "",
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
    setNamesiloCatched: (state, action) => {
      state.nameSiloCatched =
        action.payload != ""
          ? [...state.nameSiloCatched, action.payload]
          : action.payload;
    },
    setGodaddyCatched: (state, action) => {
      state.godaddyCatched =
        action.payload != ""
          ? [...state.godaddyCatched, action.payload]
          : action.payload;
    },
    setSpaceShipCatched: (state, action) => {
      state.spaceShipCatched =
        action.payload != ""
          ? [...state.spaceShipCatched, action.payload]
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
    setNamesiloWhois: (state, action) => {
      state.nameSiloWhois =
        action.payload != ""
          ? [...state.nameSiloWhois, action.payload]
          : action.payload;
    },
    setGodaddyWhois: (state, action) => {
      state.godaddyWhois =
        action.payload != ""
          ? [...state.godaddyWhois, action.payload]
          : action.payload;
    },
    setSpaceShipWhois: (state, action) => {
      state.spaceShipWhois =
        action.payload != ""
          ? [...state.spaceShipWhois, action.payload]
          : action.payload;
    },
    setBulkWhois: (state, action) => {
      state.bulkWhois =
        action.payload != ""
          ? [...state.bulkWhois, action.payload]
          : action.payload;
    },
  },
});

export const {
  setLoggedIn,
  setDropCatch,
  setNameCheapCatched,
  setDynadotCatched,
  setNamesiloCatched,
  setGodaddyCatched,
  setDynadotWhois,
  setNamesiloWhois,
  setGodaddyWhois,
  setNameCheapWhois,
  setSpaceShipCatched,
  setSpaceShipWhois,
  setBulkWhois,
} = reducer.actions;
export default reducer.reducer;
