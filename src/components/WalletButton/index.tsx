import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { addData } from "../../redux/slice/TronDataSlice";
import { clearCampaign } from "../../redux/slice/CampaignSlice";
import { clearMyCampaigns } from "../../redux/slice/MyCampaignSlice";
// const network = "https://api.shasta.trongrid.io";
const network = "https://api.nileex.io";

const WalletButton = () => {
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const wallet = useAppSelector((state) => state.tronData);
  const dispatch = useAppDispatch();

  // Check for existing wallet connection on load
  useEffect(() => {
    const savedWalletAddress = localStorage.getItem("walletAddress");
    if (savedWalletAddress) {
      dispatch(addData({ walletAddress: savedWalletAddress }));
      checkNetwork();
    }
  }, [dispatch]);

  window.addEventListener("message", (event) => {
    if (
      event.data &&
      event.data.message &&
      event.data.message.action === "setNode"
    ) {
      const newNetwork = event.data.message.data.node;
      if (newNetwork.fullNode.host === network) {
        setIsWrongNetwork(false);
      } else {
        setIsWrongNetwork(true);
        toast.error("Please switch to Nile Testnet in TronLink.");
      }
    }
  });

  const connectWallet = async () => {
    try {
      if (typeof window.tronWeb !== "undefined") {
        if (window.tronWeb.ready) {
          const address = window.tronWeb.defaultAddress.base58;
          localStorage.setItem("walletAddress", address); // Save to localStorage
          checkNetwork();
          dispatch(addData({ walletAddress: address }));
        } else {
          await window.tronLink.request({ method: "tron_requestAccounts" });
          const address = window.tronWeb.defaultAddress.base58;
          localStorage.setItem("walletAddress", address); // Save to localStorage
          checkNetwork();
          dispatch(addData({ walletAddress: address }));
        }
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Please install TronLink to interact with this dApp.");
    }
  };

  const checkNetwork = () => {
    console.log(window.tronWeb.fullNode.host);
    if (window.tronWeb.fullNode.host === network) {
      setIsWrongNetwork(false);
    } else {
      toast.error("Please switch to the Nile Testnet in TronLink.");
      setIsWrongNetwork(true);
    }
  };

  const disconnectWallet = () => {
    dispatch(addData({ walletAddress: null }));
    localStorage.removeItem("walletAddress"); // Remove from localStorage
    setIsWrongNetwork(false);
    dispatch(clearCampaign());
    dispatch(clearMyCampaigns());
  };

  const copyAddress = () => {
    if (wallet.walletAddress) {
      navigator.clipboard.writeText(wallet.walletAddress);
      toast.success("Wallet address copied!");
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="relative">
      {!wallet.walletAddress ? (
        // Connect Wallet button
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      ) : (
        // If connected and wrong network
        <button
          className={`${
            isWrongNetwork ? "bg-red-500" : "bg-green-500"
          } text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors`}
          onClick={togglePopup}
        >
          {isWrongNetwork
            ? "Wrong Network"
            : wallet.walletAddress.slice(0, 6) +
              "..." +
              wallet.walletAddress.slice(-4)}
        </button>
      )}

      {/* Popup for Disconnect or Copy Address */}
      {showPopup && wallet.walletAddress && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-gray-300 rounded-md">
          <button
            className="block w-full text-left text-black px-4 py-2 hover:bg-gray-200"
            onClick={disconnectWallet}
          >
            Disconnect
          </button>
          <button
            className="block w-full text-left text-black px-4 py-2 hover:bg-gray-200"
            onClick={copyAddress}
          >
            Copy Address
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletButton;
