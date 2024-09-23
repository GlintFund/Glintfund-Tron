import React, { ReactElement } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Flex, Text, Hide, Image, Button, Show } from "@chakra-ui/react";
import { TbWorld } from "react-icons/tb";
import { GoPeople } from "react-icons/go";
import { BsRepeat } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { Avatar } from "@chakra-ui/react";
import { useAppSelector } from "../../redux/hook";
import { TransactionT } from "../../redux/types";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import MobileNavBar from "../Navbar/MobileNavbar";
// import { BackgroundBeams } from "../../animations/background-beams";

function Index({ children }: any) {
  const navigate = useNavigate();
  const transaction = useAppSelector((state) => state.transction);

  const location = useLocation();
  const pathname = location.pathname;

  // const { pathname } = use();
  return (
    <Flex h="100vh" bgColor="#C5AFEA">
      {/* left */}
      <Hide below="md">
        <Box
          h="100vh"
          w="20%"
          justifyContent={"flex-start"}
          mt={8}
          alignItems={"flex-start"}
          display="flex"
          flexDirection={"column"}
          gap={10}
          px={"4%"}
        >
          <Text size="24px" fontStyle="bold" fontWeight={600} color="#181425">
            GLINTFUND
          </Text>
          <Box />
          {/* <w3m-button balance="hide" /> */}
          <ConnectButton
            chainStatus="none"
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "avatar",
            }}
          />
          {/* <Button maxWidth="200px" fontSize="10px" backgroundColor="#0a0315" /> */}
          <Flex
            fontWeight={600}
            py={3}
            px={3}
            justify="center"
            align="center"
            gap={1}
            cursor="pointer"
            onClick={() => {
              navigate("/campaign");
            }}
            borderRadius="md"
            transition="background-color 0.2s ease, transform 0.2s ease"
            _hover={{
              bg: "purple.600",
              transform: "scale(1.05)",
            }}
            bgColor={
              pathname.includes("campaign") ? "purple.600" : "transparent"
            }
            color={pathname.includes("campaign") ? "white" : "black"}
            _focus={{ boxShadow: "outline" }}
          >
            <FiHome />
            <Text>Home</Text>
          </Flex>
          <Flex
            fontWeight={600}
            color={pathname.includes("profile") ? "white" : "black"}
            justify="center"
            align="center"
            gap={1}
            cursor="pointer"
            onClick={() => {
              navigate("/profile");
            }}
            bgColor={
              pathname.includes("profile") ? "purple.600" : "transparent"
            }
            borderRadius="md"
            py={3}
            px={3}
            transition="background-color 0.2s ease, transform 0.2s ease"
            _hover={{
              bg: "purple.600",
              transform: "scale(1.05)",
            }}
            _focus={{ boxShadow: "outline" }}
          >
            <GoPeople color="black" />
            <Text>Profile</Text>
          </Flex>
          <Flex
            fontWeight={600}
            color="black"
            justify="center"
            align="center"
            gap={1}
            cursor="pointer"
            onClick={() => {
              navigate("/campaign");
            }}
            borderRadius="md"
            py={3}
            px={3}
            transition="background-color 0.2s ease, transform 0.2s ease"
            _hover={{
              bg: "purple.600",
              transform: "scale(1.05)",
            }}
            _focus={{ boxShadow: "outline" }}
          >
            <TbWorld />
            <Text>Campaign</Text>
          </Flex>
          <Flex
            fontWeight={600}
            color="black"
            justify="center"
            align="center"
            gap={1}
            cursor="pointer"
            borderRadius="md"
            py={3}
            px={3}
            transition="background-color 0.2s ease, transform 0.2s ease"
            _hover={{
              bg: "purple.600",
              transform: "scale(1.05)",
            }}
            _focus={{ boxShadow: "outline" }}
          >
            <BsRepeat color="black" />
            <Text>Swap</Text>
          </Flex>
        </Box>
      </Hide>
      {/* middle */}
      <Box
        bgColor={"#181425"}
        bgGradient="linear(to-br, #0A0315, #2C014D)"
        borderRadius={{ base: "0px", md: "15px" }}
        w={{ base: "100%", md: "60%" }}
      >
        {/* <BackgroundBeams/> */}
        {children}

        <Show below="md">
          <MobileNavBar />
        </Show>
      </Box>
      {/* right */}
      <Hide below="md">
        <Box
          h="100vh"
          w="20%"
          justifyContent={"flex-start"}
          mt={8}
          alignItems={"center"}
          display="flex"
          flexDirection={"column"}
          gap={10}
        >
          <Box gap={1}>
            <Image src="main-avatar.svg" w="166px" h="166px" />
            <Text color="black">ox3224dds....ww2w</Text>
          </Box>

          <Box>
            {/* Recent Transction */}

            <Text mb={5} color="black">
              Recent Activity
            </Text>
            <Flex
              h={"40vh"}
              overflowY={"scroll"}
              css={{
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar for Chrome, Safari, and Opera
                },
                scrollbarWidth: "none", // Hide scrollbar for Firefox
                msOverflowStyle: "none", // Hide scrollbar for Internet Explorer and Edge
              }}
              flexDirection="column"
              gap={3}
            >
              {transaction?.map((val: TransactionT, index: number) => (
                <Box key={index}>
                  <ActivityCard signature={val.signature} status={val.status} />
                </Box>
              ))}
            </Flex>
          </Box>
        </Box>
      </Hide>
    </Flex>
  );
}

export default Index;

interface ActivityType {
  signature: string;
  status: string;
}

const ActivityCard: React.FC<ActivityType> = ({ signature, status }) => {
  return (
    <Flex
      maxW="250px"
      align="center"
      h={"57px"}
      bgColor="white"
      borderRadius="10px"
      px={3}
      gap={2}
    >
      <Avatar size={"sm"} />
      <Box fontSize="10px" color="black">
        <Text>{status}</Text>
        <Text>{signature.slice(0, 20)}...</Text>
      </Box>
    </Flex>
  );
};
