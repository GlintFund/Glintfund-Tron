import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CampaignT } from "../types";

// Define the initial state using that type
const initialState: CampaignT = {
  address: "",
  name: "",
  amountDonated: 0,
  amountRequired: 0,
  description: "",
  donationComplete: false,
  id: 0,
};

export const CampaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    addCampaign: (state, { payload }: PayloadAction<CampaignT>) => {
      state.address = payload.address;
      state.name = payload.name;
      state.amountDonated = payload.amountDonated;
      state.amountRequired = payload.amountRequired;
      state.description = payload.description;
      state.donationComplete = payload.donationComplete;
      state.id = payload.id;
    },
    clearCampaign: () => {
      return initialState;
    },
  },
});

export const { clearCampaign, addCampaign } = CampaignSlice.actions;

export default CampaignSlice.reducer;
