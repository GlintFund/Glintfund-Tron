import React, { useState, useContext } from "react";
import { AppContext } from "../../Context";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { addCampaign } from "../../redux/slice/CampaignSlice";
import { CampaignT } from "../../redux/types";

export const useGetAllCampaigns = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const getAllCampaigns = async (getSmartContract) => {
    setLoading(true);
    try {
      const contract = await getSmartContract();
      const totalCamp = await contract.campaignCounter().call();

      for (let i = 1; i <= totalCamp.toNumber(); i++) {
        const data = await contract.campaigns(BigInt(i)).call();
        const param = {
          address: window.tronWeb.address.fromHex(data.admin),
          title: data.title,
          amountDonated: data.amount_donated.toNumber()/ 100000,
          amountRequired: data.amount_required.toNumber(),
          description: data.description,
          donationComplete: data.donation_complete,
          id: data.id.toNumber(),
          endTime: data.endTime.toNumber(),
          donationType: data.donationType,
        };
        dispatch(addCampaign(param));
      }
    } catch (err) {
      console.error("Error fetching campaigns:", err);
    } finally {
      setLoading(false);
    }
  };

  return { getAllCampaigns, loading };
};

export const useGetMyCampaigns = () => {
  const [loading, setLoading] = useState(false);
  const { getSmartContract } = useContext(AppContext);
  const dispatch = useAppDispatch();
  const campaigns = useAppSelector((state) => state.campaign);
  const wallet = useAppSelector((state) => state.tronData);

  const getMyCampaigns = async () => {
    try {
      setLoading(true);
      const filter = campaigns?.filter(
        (camp: CampaignT) => camp.address === wallet.walletAddress
      );
      console.log("my campaign", filter);
      setLoading(false);
    } catch (err) {
      toast.error("something went wrong");
      setLoading(false);
      console.log(err);
    }
  };

  return { getMyCampaigns, loading };
};

export const useApproveSpending = () => {
  const [loading, setLoading] = useState(false);

  const approveSpending = async (tokenAddress, contractAddress, amount) => {
    try {
      setLoading(true);
      const getTokenContract = async (tokenAddress) => {
        const tokenContract = await window.tronWeb.contract().at(tokenAddress);
        return tokenContract;
      };

      // Get the TRC20 token contract
      const tokenContract = await getTokenContract(tokenAddress);

      // Approve the donation contract to spend tokens on behalf of the user
      const result = await tokenContract
        .approve(contractAddress, window.tronWeb.toSun(amount))
        .send({
          from: window.tronWeb.defaultAddress.base58,
        });
      setLoading(false);
      console.log("Approval successful:", result);
      return result;
    } catch (error) {
      setLoading(false);
      console.error("Error approving tokens:", error);
      throw error;
    }
  };
  return { approveSpending, loading };
};
