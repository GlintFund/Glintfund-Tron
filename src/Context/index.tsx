import React from 'react'
import idl from '../idl.json'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { addRecipient } from '../redux/slice/RecepientSlice'
import { addCampaign, clearCampaign } from '../redux/slice/CampaignSlice'
import {
  addTransaction,
  clearTransactions,
} from '../redux/slice/TransactionSlice'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { config } from '../utils/wagmi'
import contractAbi from '../contract/CrowdFunding-abi.json'
import { initContract } from '../utils/tronweb'
import abi from '../contract/Tron_CrowdFunding-abi.json'
// export const contractAddress_ = "TWE5CpLwpiXpaERhJbKuzUPHZksfPEniVS";
export const contractAddress_ = 'TUZarbS8ZyB1uoyJ78YxzqBUJxDbedCxs5'

// const contractAddress_ = "TX2bADS8Rca97UVpi9BnWvW3kECUhNEQKM";
import { useGetMyCampaigns, useGetAllCampaigns } from '../components/functions'
import { CampaignT } from '../redux/types'
import { useDisclosure } from '@chakra-ui/react'

type bioT = {
  name: string
  description: string
}

export const AppContext = React.createContext<{
  step: number
  setStep: any
  getSmartContract: any
  user: any
  transactionPending: any
  getUser: any
  tags: any
  setTags: any
  bio: bioT
  setBio: any
  initialized: any
  amount: number
  setAmount: any
  initUser: any
  getACampaign: any
  donate: any
  coinToRaiseIn: any
  setCoinToRaiseIn: any
  onToggle: any
  isOpen: boolean
  tronWebReady: boolean
  setTronWebReady: any
}>({
  step: 1,
  setStep: undefined,
  getSmartContract: undefined,
  user: undefined,
  transactionPending: undefined,
  getUser: undefined,
  tags: undefined,
  setTags: undefined,
  bio: { name: '', description: '' },
  setBio: undefined,
  initialized: undefined,
  amount: 0,
  setAmount: undefined,
  initUser: undefined,
  getACampaign: undefined,
  donate: undefined,
  coinToRaiseIn: undefined,
  setCoinToRaiseIn: undefined,
  onToggle: undefined,
  isOpen: false,
  tronWebReady: false,
  setTronWebReady: undefined,
})

// const network = "https://api.shasta.trongrid.io";
const network = 'https://api.nileex.io'

type SupportedCoins =
  | { id: 'TRX'; name: 'tron' }
  | { id: 'USDT'; name: 'tether' }
  | { id: 'BTT'; name: 'BitTorrent' }
  | { id: 'SUN'; name: 'SUN' }

export const AppProvider = ({ children }: any) => {
  const [step, setStep] = React.useState<number>(1)
  const [transactionPending, setTransactionPending] = React.useState(false)
  const [initialized, setInitialized] = React.useState(false)
  const [tags, setTags] = React.useState<string[]>([])
  const [bio, setBio] = React.useState({
    name: '',
    description: '',
  })
  const [amount, setAmount] = React.useState<number>(0)
  const [user, setUser] = React.useState({
    pda: '',
    name: '',
    amountDonated: 0,
    amountRequired: 0,
    description: '',
    donationComplete: false,
  })
  const [contract, setContract] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [coinToRaiseIn, setCoinToRaiseIn] = React.useState<SupportedCoins>({
    id: 'TRX',
    name: 'tron',
  })
  const [tronWebReady, setTronWebReady] = React.useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  // console.log("publickey type", publicKey);
  const dispatch = useAppDispatch()
  const recipient = useAppSelector((state) => state.recipient)
  const { getMyCampaigns } = useGetMyCampaigns()
  const { getAllCampaigns, loading: isLoading_ } = useGetAllCampaigns()
  const { address } = useAccount()
  const walletAddress = useAppSelector((state) => state.tronData.walletAddress)
  const campaigns = useAppSelector((state) => state.campaign)
  const { onToggle, isOpen } = useDisclosure()

  const getUser = () => {}

  const getSmartContract = async () => {
    window.tronWeb.setFullNode(network)
    if (walletAddress && tronWebReady) {
      // window.tronLink.request({method: 'tron_requestAccounts'})
      if (window.tronWeb.ready) {
        return await window.tronWeb.contract(abi.entrys, contractAddress_)
      }
    }
  }

  const initUser = async () => {
    console.log(bio, tags, amount, address)
  }

  const getACampaign = async (pub: string) => {}

  const donate = async (val: number) => {}

  const call = async () => {
    if (walletAddress && tronWebReady) {
      const contract = await window.tronWeb.contract(
        abi.entrys,
        contractAddress_
      )
      const totalCamp = await contract.campaignCounter().call()

      const campaignPromises = []
      const campgs = []
      for (let i = 1; i <= totalCamp.toNumber(); i++) {
        const campaignPromise = contract
          .campaigns(BigInt(i))
          .call()
          .then((data) => {
            const param = {
              address: window.tronWeb.address.fromHex(data.admin),
              title: data.title,
              amountDonated: data.amount_donated.toNumber() / 1000000,
              amountRequired: data.amount_required.toNumber() / 1000000,
              description: data.description,
              donationComplete: data.donation_complete,
              id: data.id.toNumber(),
              endTime: data.endTime.toNumber(),
              donationType: data.donationType,
            }
            dispatch(addCampaign(param))
            campgs.push(param)
          })
        campaignPromises.push(campaignPromise)
      }

      await Promise.all(campaignPromises)

      const userExist = campgs?.some(
        (campaign: CampaignT) => campaign.address === walletAddress
      )

      if (userExist) {
        // const previousPage = location.state?.from || 'campaign'
        // navigate(previousPage)
        return
      } else if (!userExist) {
        if (location.pathname.includes('connect-wallet')) {
          onToggle()
          return
        }
      }
    } else if (!walletAddress && location.pathname.includes('details/')) {
      return
    } else if (!walletAddress) {
      navigate('/')
    }
  }

  React.useEffect(() => {
    call()
  }, [walletAddress, tronWebReady])

  // React.useEffect(() => {
  //   const call = async () => {
  //     if (walletAddress && tronWebReady ) {
  //       const contract = await window.tronWeb.contract(abi.entrys, contractAddress_);
  //       // await getAllCampaigns(contract)
  //       const totalCamp = await contract.campaignCounter().call().then((data) => {

  //      for (let i = 1; i <= data.toNumber(); i++) {
  //         /*  const data =  */contract.campaigns(BigInt(i)).call().then((data) => {

  //            const param = {
  //              address: window.tronWeb.address.fromHex(data.admin),
  //           title: data.title,
  //           amountDonated: data.amount_donated.toNumber()/ 1000000,
  //           amountRequired: data.amount_required.toNumber(),
  //           description: data.description,
  //           donationComplete: data.donation_complete,
  //           id: data.id.toNumber(),
  //           endTime: data.endTime.toNumber(),
  //           donationType: data.donationType,
  //         };
  //         dispatch(addCampaign(param));
  //       // }
  //         });
  //     }

  //     })

  //       const userExist = campaigns?.some(
  //         (campaign: CampaignT) => campaign.address === walletAddress
  //       );
  //       console.log("CAMPIGNS", campaigns)
  //       // if (userExist) {
  //       //   console.log("user exists");
  //       //   const previousPage = location.state?.from || "campaign";
  //       //   navigate("campaign");
  //       //   return;
  //       // } else
  //       // if (!userExist) {
  //         if (location.pathname.includes("connect-wallet")) {
  //           onToggle();
  //           return;
  //         }

  //         // } else {
  //         // const previousPage = location.state?.from || "campaign";
  //         // console.log(location.state?.from)
  //         // navigate(previousPage);
  //         //   return;
  //         // }

  //     } else if (!walletAddress && location.pathname.includes("details/")) {
  //       return;
  //     } /* else if (!walletAddress) {
  //       navigate("/");
  //     } */
  //   };
  //   call();
  // }, [walletAddress, tronWebReady ]);

  return (
    <AppContext.Provider
      value={{
        user,
        transactionPending,
        step,
        setStep,
        getSmartContract,
        getUser,
        tags,
        setTags,
        bio,
        setBio,
        initialized,
        amount,
        setAmount,
        initUser,
        getACampaign,
        donate,
        coinToRaiseIn,
        setCoinToRaiseIn,
        onToggle,
        isOpen,
        tronWebReady,
        setTronWebReady,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
