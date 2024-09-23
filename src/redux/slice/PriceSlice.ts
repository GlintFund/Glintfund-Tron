import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PriceT } from "../types";

// Define the initial state using that type
const initialState: PriceT = {
  usd: "",
  zeta: 0,
};

export const PriceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    addPrice: (state, { payload }: PayloadAction<PriceT>) => {
      state.usd = payload.usd;
      state.zeta = payload.zeta;
    },
    clearPrice: () => {
      return initialState;
    },
  },
});

export const { addPrice, clearPrice } = PriceSlice.actions;

export default PriceSlice.reducer;
