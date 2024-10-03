import React from "react";
import {Box} from "@chakra-ui/react";
import {SidebarDemo} from "../Sidebar"
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import cn from "classnames"

function Lending () {
    const [lendOption, setLendOption] = React.useState(true);


    const handleSelectOption = () => {
        setLendOption(prev => !prev)
    }

    return (
        <><SidebarDemo>
            <div className="mx-4">
                {/* navigation */}
                <h1 className="flex justify-center my-8 font-light">Lending and Borrowing</h1>
                <div className="flex flex-row justify-evenly my-3">
                    <div onClick={() => handleSelectOption()} className={cn("flex gap-x-3 w-[50%] justify-center cursor-pointer items-center", { "border border-gray-400 rounded-xl py-2 px-6 transition duration-300 ease-in-out transform hover:scale-105": lendOption, "": !lendOption })}>
                        <FaArrowUp />  <h3>Lending</h3>
                    </div>
                    <div onClick={() => handleSelectOption()}  className={cn("flex gap-x-3 w-[50%] justify-center cursor-pointer items-center", { "border border-gray-400 rounded-xl py-2 px-6 transition duration-300 ease-in-out transform hover:scale-105": !lendOption, "": lendOption })}>
                    <FaArrowDown />   <h3>Borrowing</h3>
                </div>
            </div>
            <hr className="border-t border-gray-200 opacity-30" />
        </div><div className="flex flex-row">
                {/* body */}
                <div className="bg-custom-gradient h-screen mt-6 w-full md:w-[70%] border border-transparent rounded-lg py-6 px-6">
                    <div className="flex flex-row justify-between items-center  px-3  mb-3">
                        <p>Token</p>
                        <p>Balance</p>
                        <p>Type</p>
                        <p>Action</p>
                    </div>

                    <hr className="border-t border-gray-200 opacity-30 mb-5" />

                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
                <div className="w-1 h-screen" />
                {/* History */}
                <div className="bg-custom-gradient h-screen mt-6 border border-transparent rounded-lg py-6 px-6 hidden sm:block w-[30%] ">
                    <h1 className="font-bold flex justify-center items-center mb-8">{lendOption ? "Lending" : "Borrowing"} History</h1>
                    <HistoryCard />
                    <HistoryCard />
                    <HistoryCard />
                    <HistoryCard />
                    <HistoryCard />
                    <HistoryCard />
                    <HistoryCard />
                </div>
            </div>
        </SidebarDemo>
            </>
    )
}

export default Lending


function Card () {
    return (
        <div className="border cursor-pointer bg-customPurple border-transparent rounded-xl flex flex-row justify-between items-center px-3 py-2 my-3 transition duration-300 ease-in-out transform hover:scale-105">
            <div>
                <p>BNB</p>
                <p className="border-t border-gray-200 opacity-30">$132</p>
            </div>
            <p>$3000</p>
            <p>NFT</p>
            <button className="bg-custom-gradient px-4 py-2 rounded-lg ">
                Borrow
            </button>

        </div>
    )
}



function HistoryCard () {
    return (
        <div className="border bg-customPurple bg-b border-transparent rounded-xl flex flex-col justify-start items-start px-3 py-2 my-3 transition duration-300 ease-in-out transform hover:scale-105">
            <h1 className="font-bold">Hyau Yaugh</h1>
            <p className="text-xs -gray-200 opacity-30">you borrowed 40BNB from 0X23233y34343...</p>

    </div>
    )
}