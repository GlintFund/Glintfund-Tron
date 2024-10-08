import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TronDataSliceT } from "../types";

// Define the initial state using that type
const initialState: TronDataSliceT = {
  walletAddress: null,
};

export const TronDataSlice = createSlice({
  name: "tronData",
  initialState,
  reducers: {
    addData: (state, { payload }: PayloadAction<TronDataSliceT>) => {
      state.walletAddress = payload.walletAddress;
    },
    clearData: () => {
      return initialState;
    },
  },
});

export const { clearData, addData } = TronDataSlice.actions;

export default TronDataSlice.reducer;
