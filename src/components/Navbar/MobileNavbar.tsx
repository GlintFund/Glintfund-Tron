import React from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { GoPeople } from "react-icons/go";


function MobileNavBar() {
  const navigate = useNavigate();
    return (
      <div className="w-100% flex items-center mx-5 absolute bottom-2 left-0 right-0 px-2 py-2 justify-between bg-#522473 rounded-lg border-2 border-slate-400">
        <div className="flex gap-4"  onClick={() => {
              navigate("/campaign");
            }}>

        <FiHome />
        </div>
  
        <ConnectButton 
            chainStatus="none"
        />  
        <div className="flex gap-4"  onClick={() => {
              navigate("/profile");
            }}>
        <GoPeople color="white" />
        </div>
      </div>
    );
  }

  export default MobileNavBar