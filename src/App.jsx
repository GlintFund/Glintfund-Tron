import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import Onboarding1 from "./components/Onboarding/Onboarding1";
import Campaign from "./components/Campaign";
import Details from "./components/Campaign/Details";
import MessagePage from "./pages/Message";
import ConnectWallet from "./components/LandingPage/ConnectWallet";
import Loading from "./pages/Loading";
const App = () => {
  // Function to open TronLink upon button click
  // const handleConnectWallet = async () => {
  //   if (window.tronWeb && window.tronWeb.ready) {
  //     try {
  //       const address = window.tronWeb.defaultAddress.base58;
  //       setWalletAddress(address);
  //       console.log("Wallet address:", address);
  //     } catch (error) {
  //       console.error("Failed to fetch wallet address", error);
  //     }
  //   } else {
  //     alert("TronLink is not detected or unlocked");
  //   }
  // };

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="connect-wallet" element={<ConnectWallet />} />
        <Route path="onboarding" element={<Onboarding1 />} />
        <Route path="profile" element={<Profile />} />
        <Route path="campaign" element={<Campaign />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="message" element={<MessagePage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
