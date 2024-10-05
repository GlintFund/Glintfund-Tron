import React, { useContext } from "react";
import {
  Box,
  Text,
  Flex,
  Container,
  Center,
  Button,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";
import toast from "react-hot-toast";
import Navbar from "../Navbar/Nav2";
import Footer from "../Footer";
import { useAccount } from "wagmi";
import { BackgroundBeams } from "../../animations/background-beams";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BackgroundLines } from "../../animations/background-lines";
import WalletButton from "../WalletButton";

function ConnectWallet() {
  const navigate = useNavigate();
  const account = useAccount();
  console.log(account);
  const { connectWallet, getSmartContract, walletAddress } =
    useContext(AppContext);

  const getCampCounter = async () => {
    try {
      const smartContract = await getSmartContract();
      console.log(smartContract);
      // Call the campaignCounter function (Assuming it is a read function)
      const didi = await smartContract.campaignCounter().call();
      console.log("campaign counter", didi.toNumber());
      console.log("methods", await smartContract.methods);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <BackgroundLines className="flex  bg-custom-gradient  w-full flex-col px-4">
      <div className="flex flex-col h-screen justify-between">
        <Navbar />
        <Container>
          <Center flexDirection="column">
            <Text
              fontWeight={500}
              textAlign={"center"}
              fontSize={{ base: "24px", md: "32px" }}
              mx={"8%"}
            >
              Connect your wallet to raise funds with Tron and other assets
            </Text>
            <Flex mt={8}>
              <WalletButton />

              {/* <ConnectButton /> */}
            </Flex>
          </Center>
        </Container>

        <Footer />
      </div>
    </BackgroundLines>
  );
}

export default ConnectWallet;

function ConnectionModal() {
  return {};
}
