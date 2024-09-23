import React from "react";
import { Box, Text, Link, Flex, Button } from "@chakra-ui/react";
import { FaXTwitter, FaGithub,  FaMedium } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";

function Footer() {
  return (
    <Flex
      justify={{ md: "space-evenly" }}
      flexDirection={{ base: "column", md: "row" }}
      align={{ base: "center" }}
      mt={8}
    >
      <Flex>
        <Text zIndex={1000000} size="24px" fontWeight={500}>
          Powered by&nbsp;
          <a
            href="https://zetachain.com"
            target="_blank"
            rel="Zetachain"
            className="text-green-800 font-bold z-100000"
          >
            Zetachain
          </a>
        </Text>
      </Flex>
      <Flex>
        <Text cursor={"pointer"}>Terms &nbsp;</Text>
        <Text color="purple" cursor={"pointer"}>
          and &nbsp;
        </Text>
        <Text cursor={"pointer"}>Conditions</Text>
      </Flex>
      <Flex gap={5} zIndex={100000}>
        <a
          href="https://x.com/glintfund"
          target="_blank"
          rel="GlintFund Twitter"
        >
          <FaXTwitter />
        </a>

        <a
          href="https://discord.gg/c7zQwM5h2E"
          target="_blank"
          rel="GlintFund Discord"
        >
          <FaDiscord />
        </a>
        <a
          href="https://github.com/Dunsin-cyber/glint-fund"
          target="_blank"
          rel="GlintFund Github"
        >
        <FaGithub />
        </a>
        <a
          href="https://medium.com/@glintfund"
          target="_blank"
          rel="GlintFund Medium"
        >
        <FaMedium />
        </a>
      </Flex>
    </Flex>
  );
}

export default Footer;
