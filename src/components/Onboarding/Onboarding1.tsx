import React from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Select,
  Show,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";
import Onboarding2 from "./Onboarding2";
import Onboarding3 from "./Onboarding3";
import {
  useGetAllUsers,
  useGetUserProfile,
  useGetACampaign,
  useGetAllCampaigns,
} from "../../hooks";
import { useWriteContract, useAccount } from "wagmi";
import { config } from "../../utils/wagmi";
import contractAbi from "../../contract/CrowdFunding-abi.json";
import { BackgroundBeams } from "../../animations/background-beams";

function Onboarding1() {
  const navigate = useNavigate();
  const { step, setStep } = React.useContext(AppContext);
  const { address } = useAccount();

  // const { data } = useGetAllCampaigns();
  // console.log("all camp", data);
  // const { data: profile } = useGetUserProfile(address);
  // console.log("profile", profile);
  // const { data: allUsers } = useGetAllUsers();

  // console.log("all users", allUsers);

  return (
    <Flex>
      {/* Left */}
      <BackgroundBeams />
      <Show above="md">
        <Box
          display="flex"
          justifyContent={"center"}
          pt="40vh"
          px="34px"
          // w={"30%"}
          bgColor="primary.50"
          color="white"
        >
          <Text fontSize="36px" fontWeight={700}>
            Let's begin your fundraising journey
          </Text>
        </Box>
      </Show>
      <Box h={"100vh"} w={"1px"} bgColor={"white"} />
      {/* Right */}
      <Box
        px={10}
        pl={{ md: "150px" }}
        pt={{ base: "5vh", md: "30vh" }}
        color="black"
        w={{ base: "100%", md: "70%" }}
        bgColor="primary.100"
      >
        <ArrowBackIcon
          zIndex={10000000000}
          mb={4}
          boxSize={6}
          cursor="pointer"
          onClick={() => {
            if (step === 1) return;
            setStep((prev: number) => prev - 1);
          }}
        />
        {step === 1 && <Step1 />}
        {step === 2 && <Onboarding2 />}
        {step === 3 && <Onboarding3 />}
      </Box>
    </Flex>
  );
}

export default Onboarding1;

const tagVal = [
  "School",
  "health",
  "children",
  "Travel",
  "Funeral",
  "Events",
  "Faith",
  "Family",
  "Education",
  "kids",
  "climate",
  "sport",
  "tech",
  "community",
];

function Step1() {
  const { setStep, tags, setTags } = React.useContext(AppContext);
  // console.log(tags);

  const handleClick = () => {
    setStep(2);
  };
  return (
    <Box>
      <Box>
        <Text fontSize="32px" fontWeight={600}>
          Where will the funding go?
        </Text>
        <Text pt={4} fontSize="16px">
          funding are 100 percent on-chain, secure and tamper-proof on the
          Zetachain Blockchain. You can fund with any of the compatible tokens
          on Zetachain
        </Text>
      </Box>
      {/* pick funding type */}
      <Flex pt={4}>
        <Select size="lg" variant="outline" placeholder="Zeta">
          {/* <option value="Zeta">Zeta</option> */}
          <option value="BNB">BNB</option>
          <option value="BTC">BTC</option>
        </Select>
        {/* <Input value={publicKey?.toString()} isReadOnly size="lg" /> */}
      </Flex>
      {/* funding sector */}
      <Flex zIndex={1000000} pt={8} flexWrap="wrap" gap={6}>
        {tags.map((tag: any) => (
          <Tag
            zIndex={1000000}
            cursor="pointer"
            py={3}
            pl={4}
            size={{ base: "sm", md: "xl" }}
            variant="solid"
            borderRadius="full"
            key={tag}
            px={4}
          >
            {tag}
            <TagCloseButton />
          </Tag>
        ))}
      </Flex>
      <Text>what's the funding for?</Text>
      <Flex pt={8} gap={6} flexWrap="wrap">
        {tagVal.map((tag) => (
          <Tag
            cursor="pointer"
            py={4}
            px={4}
            size={{ base: "sm", md: "xl" }}
            variant="solid"
            key={tag}
            onClick={() => {
              setTags([...tags, tag]);
            }}
            bgColor={"primary.50"}
          >
            <TagLabel zIndex={1000000}> {tag}</TagLabel>
          </Tag>
        ))}
      </Flex>
      <Flex justify="flex-end" mt={8}>
        <Button
          py={7}
          px={5}
          color="white"
          bgColor="primary.50"
          onClick={handleClick}
          isDisabled={tags.length < 2}
        >
          Next Step
        </Button>
      </Flex>
    </Box>
  );
}
