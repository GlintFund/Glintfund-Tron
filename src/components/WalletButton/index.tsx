import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context/index";
import toast from "react-hot-toast";

const WalletButton = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { connectWallet: conectWaletFnc } = useContext(AppContext);

  useEffect(() => {
    // Check if the wallet is already connected and get its address
    const checkWalletConnection = async () => {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        setWalletAddress(window.tronWeb.defaultAddress.base58);
        checkNetwork();
      }
    };
    checkWalletConnection();
  }, []);

  window.addEventListener("message", (event) => {
    if (
      event.data &&
      event.data.message &&
      event.data.message.action === "setNode"
    ) {
      const newNetwork = event.data.message.data.node;
      if (newNetwork.fullNode === "https://api.nileex.io") {
        setIsWrongNetwork(false);
      } else {
        toast.error("Please switch to Nile Testnet in TronLink.");
      }
    }
  });

  const connectWallet = async () => {
    try {
      if (typeof window.tronWeb !== "undefined") {
        if (window.tronWeb.ready) {
          const address = window.tronWeb.defaultAddress.base58;
          setWalletAddress(address);
          checkNetwork();
        } else {
          await window.tronLink.request({ method: "tron_requestAccounts" });
          const address = window.tronWeb.defaultAddress.base58;
          setWalletAddress(address);
          checkNetwork();
        }
      }
      // Request account from TronLink
      await window.tronLink.request({ method: "tron_requestAccounts" });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Please install TronLink to interact with this dApp.");
    }
  };

  const checkNetwork = () => {
    // Check if TronLink is on the Nile Testnet (network ID for Nile is 2)
    if (window.tronWeb.fullNode.host.includes("nile")) {
      setIsWrongNetwork(false);
    } else {
      toast.error("Please switch to the Nile Testnet in TronLink.");

      setIsWrongNetwork(true);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsWrongNetwork(false);
  };

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      alert("Wallet address copied!");
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="relative">
      {!walletAddress ? (
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
            : walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)}
        </button>
      )}

      {/* Popup for Disconnect or Copy Address */}
      {showPopup && walletAddress && (
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
