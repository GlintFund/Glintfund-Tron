import React, { useState } from "react";
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import {
  Box,
  Text,
  Flex,
  Container,
  Center,
  Button,
  Image,
  Heading,
  Show,
  Hide,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";
import toast from "react-hot-toast";
import Navbar from "../Navbar/Nav2";
import Footer from "../Footer";
import { BackgroundBeams } from "../../animations/background-beams";
import { TypewriterEffectSmooth } from "../../animations/typewriter-effect";
import { FlipWords } from "../../animations/flip-words";
import Lottie from "lottie-react";
import ICON from "../../animations/GIF/home-icon.json";
import WaitlistModal from "../Waitlist/WaitlistModal.jsx";
import supabase from "../../Services/supabase";
import Why from './Why';
import Trade from './Trade';
import Stats from './Stats';


const words = [
    {
      text: "Easily",
      className: "text-white sm:text-4xl",
    },
    {
      text: "raise",
      className: "text-white sm:text-4xl",
    },
    {
      text: "funds",
      className: "text-white sm:text-4xl",
    },
    {
      text: "on",
      className: "text-white sm:text-4xl",
    },
    {
      text: "Tron.",
      className: "text-purple-500 dark:text-purple-500 sm:text-4xl",
    },
  ];

function Hero ()  {
    const words_ = ["crowd funds", "manage NFT’s", "manage your balances"];

  return (
    <section>
          <BackgroundBeams />
      <div className='container mx-auto'>
      <Navbar />
        <div className='flex flex-col items-center lg:flex-row mt-[30px]'>
       
          <div className='flex-1'>
            {/* badge text */}
    
            {/* title */}
          <h1 className='text-[32px] lg:text-[56px] font-bold leading-tight mb-6'
          data-aos='fade-down'
          data-aos-delay='500'> 
                 Easily raise funds on &nbsp;
                 <span className="text-purple-500">Tron</span></h1>
          <p className='max-w-[440px] text-[16px] lg:text-[24px] leading-relaxed mb-8'
          data-aos='fade-down'
          data-aos-delay='600'> 
              Get
              <FlipWords className="text-white" words={words_} />
              on GlintFund{" "}
         </p>
            <button className='btn gap-x-6 pl-6 text-sm lg:h-16 lg:text-base' data-aos='fade-down'
          data-aos-delay='700'>
              Get Started
              <IoIosArrowDroprightCircle 
              className='text-2xl lg:text-3xl'/>
              </button>
          </div>
          {/* Hero image */}
          <div className='flex-1 w-[90%]' data-aos='fade-up'
          data-aos-delay='600'>
             <Lottie animationData={ICON} loop={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;