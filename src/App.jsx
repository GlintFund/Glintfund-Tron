import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Aos from 'aos'
import 'aos/dist/aos.css'

import LandingPage from './pages/LandingPage'
import Profile from './pages/Profile'
import Onboarding1 from './components/Onboarding/Onboarding1'
import Campaign from './components/Campaign'
import Details from './components/Campaign/Details'
import MessagePage from './pages/Message'
import ConnectWallet from './components/LandingPage/ConnectWallet'
import Loading from './pages/Loading'
import Exchange from './pages/Lending'
import { AppContext } from './Context'

const App = () => {
  const { tronWebReady, setTronWebReady } = React.useContext(AppContext)

  React.useEffect(() => {
    window.tronLink.request({ method: 'tron_requestAccounts' })
    console.log('tronweb not conenected succesfully')

    const checkTronLinkConnection = async () => {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        // Ensure TronLink and the user's wallet are ready
        setTronWebReady(true)
        console.log('tronweb conenected succesfully')
      } else {
        // Listen for TronLink injection
        window.tronLink.request({ method: 'tron_requestAccounts' })
        window.addEventListener('tronLink#initialized', async () => {
          if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            setTronWebReady(true)
          }
        })
      }
    }

    checkTronLinkConnection()
  }, [])

  useEffect(() => {
    Aos.init({
      duration: 2500,
      delay: 400,
    })
  }, [])

  return (
    <React.Fragment>
      {/*  {tronWebReady ? ( */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="connect-wallet" element={<ConnectWallet />} />
        <Route path="onboarding" element={<Onboarding1 />} />
        <Route path="profile" element={<Profile />} />
        <Route path="campaign" element={<Campaign />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="message" element={<MessagePage />} />
        <Route path="exchange" element={<Exchange />} />
      </Routes>
      {/* // ) : (
           <Routes>
             <Route path="/loading" element={<Loading />} />
           </Routes>
         )} */}
    </React.Fragment>
  )
}

export default App
