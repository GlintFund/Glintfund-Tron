import React from "react";
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

function ConnectWallet() {
  const navigate = useNavigate();
  const account = useAccount();
  console.log(account);

  return (
    <Box h="100vh">
      <BackgroundBeams />
      <Box h={"85vh"}>
        <Navbar />
        <Container mt={"30vh"}>
          <Center flexDirection="column">
            <Text
              fontWeight={500}
              textAlign={"center"}
              fontSize={{ base: "24px", md: "32px" }}
              mx={"8%"}
            >
              Connect your wallet to raise funds with Zetachain and other assets
            </Text>
            <Flex mt={8}>
              <ConnectButton />
            </Flex>
          </Center>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default ConnectWallet;

function ConnectionModal() {
  return {};
}
