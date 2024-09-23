import React from "react";
import idl from "../idl.json";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { addRecipient } from "../redux/slice/RecepientSlice";
import { addCampaign, clearCampaign } from "../redux/slice/CampaignSlice";
import {
  addTransaction,
  clearTransactions,
} from "../redux/slice/TransactionSlice";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useGetAllCampaigns, contractAddress } from "../hooks/index";
import { config } from "../utils/wagmi";
import contractAbi from "../contract/CrowdFunding-abi.json";

type bioT = {
  name: string;
  description: string;
};

export const AppContext = React.createContext<{
  step: number;
  setStep: any;
  smartContract: any;
  user: any;
  transactionPending: any;
  getUser: any;
  tags: any;
  setTags: any;
  bio: bioT;
  setBio: any;
  initialized: any;
  amount: number;
  setAmount: any;
  initUser: any;
  getAllCampaigns: any;
  getACampaign: any;
  donate: any;
}>({
  step: 1,
  setStep: undefined,
  smartContract: undefined,
  user: undefined,
  transactionPending: undefined,
  getUser: undefined,
  tags: undefined,
  setTags: undefined,
  bio: { name: "", description: "" },
  setBio: undefined,
  initialized: undefined,
  amount: 0,
  setAmount: undefined,
  initUser: undefined,
  getAllCampaigns: undefined,
  getACampaign: undefined,
  donate: undefined,
});

export const AppProvider = ({ children }: any) => {
  const [step, setStep] = React.useState<number>(1);
  const [transactionPending, setTransactionPending] = React.useState(false);
  const [initialized, setInitialized] = React.useState(false);
  const [tags, setTags] = React.useState<string[]>([]);
  const [bio, setBio] = React.useState({
    name: "",
    description: "",
  });
  const [amount, setAmount] = React.useState<number>(0);
  const [user, setUser] = React.useState({
    pda: "",
    name: "",
    amountDonated: 0,
    amountRequired: 0,
    description: "",
    donationComplete: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  // console.log("publickey type", publicKey);
  const dispatch = useAppDispatch();
  const recipient = useAppSelector((state) => state.recipient);

  const { address } = useAccount();
  const { data: campaigns, isLoading } = useGetAllCampaigns();

  const getUser = () => {};

  const smartContract = async () => {};

  const initUser = async () => {
    console.log(bio, tags, amount, address);
  };

  const getAllCampaigns = async () => {};

  const getACampaign = async (pub: string) => {};

  const donate = async (val: number) => {};

  const getTransactions = async () => {};

  React.useEffect(() => {
    const userExist = campaigns?.filter(
      (campaign: any) => campaign.admin === address
    );
    // console.log(userExist, "UserExist");
    // console.log(campaigns, "camp");
    if (userExist === undefined) {
      return;
    }
    if (!address && location.pathname.includes("details/")) {
      return;
    } else if (!address) {
      navigate("/");
    } else if (userExist.length > 0) {
      var user = {
        address,
        name: userExist[0].name,
        amountRequired: Number(userExist[0].amount_required),
        amountDonated: Number(userExist[0].amount_donated) / 10 ** 18,
        description: userExist[0].description,
        donationComplete: userExist[0].donation_complete,
        id: userExist[0].id,
      };
      dispatch(addCampaign(user));
      const previousPage = location.state?.from || "campaign";
      console.log(previousPage);
      navigate(previousPage);
    } else if (userExist.length === 0) {
      navigate("/onboarding");
    }
  }, [address, isLoading]);

  return (
    <AppContext.Provider
      value={{
        user,
        transactionPending,
        step,
        setStep,
        smartContract,
        getUser,
        tags,
        setTags,
        bio,
        setBio,
        initialized,
        amount,
        setAmount,
        initUser,
        getAllCampaigns,
        getACampaign,
        donate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
