import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CampaignT } from "../types";

// Define the initial state using that type
const initialState: CampaignT[] = [];

export const MyCampaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    addCampaign: (state, { payload }: PayloadAction<CampaignT>) => {
      state.push(payload);
    },
    clearMyCampaigns: () => {
      return initialState;
    },
  },
});

export const { clearMyCampaigns, addCampaign } = MyCampaignSlice.actions;

export default MyCampaignSlice.reducer;
