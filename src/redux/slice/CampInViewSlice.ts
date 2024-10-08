import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CampaignT } from "../types";

// Define the initial state using that type
const initialState: CampaignT = {
  address: "",
  title: "",
  amountDonated: 0,
  amountRequired: 0,
  description: "",
  donationComplete: false,
  id: 0,
  endTime: 0,
  donationType: "",
};

export const CampaignInViewSlice = createSlice({
  name: "campaignInView",
  initialState,
  reducers: {
    addCampaignInView: (state, { payload }: PayloadAction<CampaignT>) => {
      state.address = payload.address;
      state.title = payload.title;
      state.amountDonated = payload.amountDonated;
      state.amountRequired = payload.amountRequired;
      state.description = payload.description;
      state.donationComplete = payload.donationComplete;
      state.id = payload.id;
      state.endTime = payload.endTime;
      state.donationType = payload.donationType;
    },

    clearCampaignInView: () => {
      return initialState;
    },
  },
});

export const { addCampaignInView, clearCampaignInView } =
  CampaignInViewSlice.actions;

export default CampaignInViewSlice.reducer;
