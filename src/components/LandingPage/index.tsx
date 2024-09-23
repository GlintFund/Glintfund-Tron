import React from "react";
import { useState } from "react";
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
    text: "ZetaChain.",
    className: "text-purple-500 dark:text-purple-500 sm:text-4xl",
  },
];

function LandingPage() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const words_ = ["crowd funds", "manage NFT’s", "manage your balances"];
  const handleClick = async () => {
    navigate("profile");
  };

  interface WaitlistFormData {
    name: string;
    email: string;
  }

  const addToWaitlist = async (data: WaitlistFormData) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("waitlist")
        .insert([{ name: data.name, email: data.email }])
        .select();

      if (error) {
        setLoading(false);
        toast.error("Error adding to waitlist");
        console.error("Error adding to waitlist:", error);
      } else {
        setLoading(false);
        console.log("Successfully added to waitlist:", data);
      }
    } catch (error) {
      setLoading(false);
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <>
      <BackgroundBeams />
      <Box
        h="100vh"
        display="flex"
        alignItems="space-evenly"
        flexDirection={"column"}
      >
        <Navbar />
        <Flex
          mt={{ base: 2, md: "1%" }}
          justify="center"
          align="center"
          flexDirection={{ base: "column", md: "row" }}
          mx={{ sm: "auto", md: "5%" }}
          h="80vh"
        >
          {/* left-side */}
          <Flex
            gap={4}
            flexDir="column"
            justify={{ base: "center", md: "flex-start" }}
            align={{ base: "center", md: "flex-start" }}
            w={{ base: "90%", md: "60%" }}
            mt={{ base: 1, md: 0 }}
          >
            <Show above="md">
              <div className="">
                <TypewriterEffectSmooth words={words} />
              </div>
            </Show>
            <Show below="md">
              <Flex
                fontWeight={700}
                fontSize="3xl"
                justify="center"
                textAlign="center"
              >
                <Text>
                  Easily raise funds on &nbsp;
                  <span className="text-purple-500">ZetaChain</span>
                </Text>
              </Flex>
            </Show>

            <div className="sm:text-sm md:text-2xl mt-3 font-montserrat font-normal text-purple-400 dark:text-purple-700 text-center">
              Get
              <FlipWords className="text-white" words={words_} />
              on GlintFund{" "}
            </div>

            <Hide below="md">
              <div className="flex gap-8 items-center">
                <Button
                  mt={10}
                  cursor="pointer"
                  bg="transparent"
                  color="white"
                  _hover={{ bg: "transparent", color: "gray.300" }}
                  _active={{ bg: "transparent" }}
                  size="md"
                  onClick={() => setShowModal(true)}
                >
                  Join Waitlist
                </Button>

                <Button
                  mt={10}
                  cursor="pointer"
                  borderRadius={"10px"}
                  borderColor="purple"
                  variant={"purple"}
                  px={3}
                  py={1}
                  maxW={"45%"}
                  // fontSize="24px"
                  size="md"
                  onClick={() => {
                    navigate("/connect-wallet");
                  }}
                >
                  Get Started
                </Button>
              </div>
            </Hide>
          </Flex>

          {showModal && (
            <WaitlistModal
              showModal={showModal}
              setShowModal={setShowModal}
              addToWaitlist={addToWaitlist}
              loading={loading}
            />
          )}

          {/* right side */}
          <Flex
            gap={4}
            flexDir="column"
            justify={{ base: "center", md: "flex-end" }}
            align={{ base: "center", md: "flex-end" }}
            w={{ base: "90%", md: "40%" }}
            mt={{ base: 10, md: 0 }}
          >
            <Lottie animationData={ICON} loop={true} />
            <Show below="md">
              <Button
                mt={10}
                cursor="pointer"
                bg="transparent"
                color="white"
                _hover={{ bg: "transparent", color: "gray.300" }}
                _active={{ bg: "transparent" }}
                size="sm"
                onClick={() => setShowModal(true)}
              >
                Join Waitlist
              </Button>
              <Button
                mt="2%"
                borderRadius={"5px"}
                borderColor="purple"
                variant={"purple"}
                px={2}
                py={2}
                onClick={() => {
                  navigate("/connect-wallet");
                }}
              >
                Get Started
              </Button>
            </Show>
          </Flex>
        </Flex>
        <Box h="10vh">
          <Footer />
        </Box>
      </Box>
    </>
  );
}

export default LandingPage;
