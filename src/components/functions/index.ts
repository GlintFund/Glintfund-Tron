import React, { useState, useContext } from "react";
import { AppContext } from "../../Context";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { addCampaign } from "../../redux/slice/CampaignSlice";

export const useGetAllCampaigns = () => {
  const [loading, setLoading] = useState(false);
  const { getSmartContract } = useContext(AppContext);
  const dispatch = useAppDispatch();

  const getAllCampaigns = async () => {
    try {
      setLoading(true);
      const contract = await getSmartContract();
      const totalCamp = await contract.campaignCounter().call();
      for (let i = 1; i <= totalCamp.toNumber(); i++) {
        const data = await contract.campaigns(BigInt(i)).call();
        console.log(data);
        var param = {
          address: data.admin,
          title: data.title,
          amountDonated: data.amount_donated.toNumber(),
          amountRequired: data.amount_required.toNumber(),
          description: data.description,
          donationComplete: data.donation_complete,
          id: data.id.toNumber(),
          endTime: data.endTime.toNumber(),
          donationType: data.donationType,
        };
        dispatch(addCampaign(param));
      }
      setLoading(false);
    } catch (err) {
      toast.error("something went wrong");
      setLoading(false);
      console.log(err);
    }
  };

  return { getAllCampaigns, loading };
};
