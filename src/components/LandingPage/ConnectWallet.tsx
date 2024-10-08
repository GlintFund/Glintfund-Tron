import React, { useContext, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Container,
  Center,
  Button,
  Image,
  useDisclosure,
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
import OptionModal from "./Modal";
import { useAppSelector } from "../../redux/hook";
import { CampaignT } from "../../redux/types";
import { useGetAllCampaigns } from "../functions";

function ConnectWallet() {
  const navigate = useNavigate();
  const wallet = useAppSelector((state) => state.tronData);
  const campaigns = useAppSelector((state) => state.campaign);
  const { getAllCampaigns, loading: isLoading_ } = useGetAllCampaigns();

  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    if (wallet.walletAddress != null) {
      getAllCampaigns();
      // TODO: also check if the wallet address has been linked before: i.e user exists
      const userExist = campaigns?.filter(
        (campaign: CampaignT) => campaign.address === wallet.walletAddress
      );

      if (userExist.length > 0) {
        navigate("/campaign");
      } else {
        onToggle();
      }
    }
  }, [wallet.walletAddress]);

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
            </Flex>
          </Center>
        </Container>
        <OptionModal onToggle={onToggle} isOpen={isOpen} />

        <Footer />
      </div>
    </BackgroundLines>
  );
}

export default ConnectWallet;

function ConnectionModal() {
  return {};
}
