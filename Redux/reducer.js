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
  apiQueries: [],
  relatedQuestions: [],
  showRegistered: true,
  domains: "",
  showCard: false,
  suggestedDomains: "",
  prefix: "",
  suffix: "",
  godaddyAuctions: [],
  sedoDomains: "",
  biddingDomains: [],
  multiBiddingDomains: [],
  manualBiddingDomains: [],
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
    setApiQueries: (state, action) => {
      state.apiQueries = action.payload;
    },
    setRelatedQuestions: (state, action) => {
      state.relatedQuestions =
        action.payload != ""
          ? [...state.relatedQuestions, action.payload]
          : action.payload;
    },
    setShowRegistered: (state, action) => {
      state.showRegistered = !state.showRegistered;
    },
    setDomains: (state, action) => {
      state.domains = action.payload;
    },
    setShowCard: (state, action) => {
      state.showCard = action.payload;
    },

    setSuggestedDomains: (state, action) => {
      state.suggestedDomains = action.payload;
    },

    setPrefix: (state, action) => {
      state.prefix = action.payload;
    },

    setSuffix: (state, action) => {
      state.suffix = action.payload;
    },
    setGodaddyAuctions: (state, action) => {
      state.godaddyAuctions = action.payload;
    },
    setSedoDomains: (state, action) => {
      state.sedoDomains = action.payload;
    },
    setBiddingDomains: (state, action) => {
      state.biddingDomains =
        action.payload != ""
          ? [action.payload, ...state.biddingDomains]
          : action.payload;
    },
    setMultiBiddingDomains: (state, action) => {
      state.multiBiddingDomains =
        action.payload != ""
          ? [...action.payload, ...state.multiBiddingDomains]
          : action.payload;
    },
    setManualBiddingDomains: (state, action) => {
      state.manualBiddingDomains =
        action.payload != ""
          ? [...action.payload, ...state.manualBiddingDomains]
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
  setApiQueries,
  setRelatedQuestions,
  setShowRegistered,
  setDomains,
  setShowCard,
  setPrefix,
  setSuffix,
  setSuggestedDomains,
  setGodaddyAuctions,
  setSedoDomains,
  setBiddingDomains,
  setMultiBiddingDomains,
  setManualBiddingDomains,
} = reducer.actions;
export default reducer.reducer;
