import { configureStore } from "@reduxjs/toolkit";
import recipient from "./slice/RecepientSlice";
import campaign from "./slice/CampaignSlice";
import transction from "./slice/TransactionSlice";
import price from "./slice/PriceSlice";
import tronData from "./slice/TronDataSlice";
import myCampaigns from "./slice/MyCampaignSlice";

export const store = configureStore({
  reducer: {
    recipient,
    campaign,
    transction,
    price,
    tronData,
    myCampaigns,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
