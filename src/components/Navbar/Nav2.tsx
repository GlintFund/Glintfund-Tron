import React from "react";
import { Box, Text, Link, Flex, Button, Hide } from "@chakra-ui/react";

function Nav2() {
  return (
    <Flex justify="space-between" mx="48px" mt="24px">
      <Flex>
        <Text size="24px" fontStyle="bold" fontWeight={700}>
          GLINTFUND
        </Text>
      </Flex>
      <Hide below="md">
        <Flex gap={12} align="center" justify="center"  zIndex={100000}>
          <Button
            borderRadius={"10px"}
            variant={"purple"}
            cursor={"pointer"}
            px={3}
            py={5}
            borderColor={"purple"}
          >
            Home
          </Button>
          <a
           href="https://medium.com/@glintfund"
           target="_blank"
           rel="GlintFund Medium"
         >
          <Text cursor={"pointer"} >Learn</Text> </a>
          <a
          href="https://discord.gg/c7zQwM5h2E"
          target="_blank"
          rel="GlintFund Discord"
        >
          <Text cursor={"pointer"}>Community</Text>
          </a>
          <a
          href="https://x.com/glintfund"
          target="_blank"
          rel="GlintFund Twitter"
        >
          <Text cursor={"pointer"}>Support</Text>
          </a>
        </Flex>
      </Hide>
    </Flex>
  );
}

export default Nav2;
