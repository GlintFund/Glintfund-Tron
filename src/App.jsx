import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";

import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import Onboarding1 from "./components/Onboarding/Onboarding1";
import Campaign from "./components/Campaign";
import Details from "./components/Campaign/Details";
import MessagePage from "./pages/Message";
import ConnectWallet from "./components/LandingPage/ConnectWallet";
import Loading from "./pages/Loading";
import Exchange from "./pages/Lending";

const App = () => {
  useEffect(() => {
    Aos.init({
      duration: 2500,
      delay: 400,
    });
  }, []);

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
        <Route path="exchange" element={<Exchange />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
