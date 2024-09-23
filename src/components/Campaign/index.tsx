import React from "react";
import {
  Box,
  Center,
  Flex,
  Image,
  Text,
  Container,
  Grid,
  Heading,
  Badge,
  Progress,
  Tag,
} from "@chakra-ui/react";
import { AppContext } from "../../Context";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { CampaignT } from "../../redux/types";
import { useAppSelector } from "../../redux/hook";

import HalfSide from "../SideNav/HalfSide";
import { useGetAllCampaigns } from "../../hooks";

function Campaign() {
  const { data: campaigns, isLoading } = useGetAllCampaigns();
  console.log(campaigns);

  return (
    <HalfSide>
      <Flex
        gap={6}
        mt={3}
        h="100vh"
        overflowY={"scroll"}
        css={{
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for Chrome, Safari, and Opera
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        flexDirection={"column"}
        mx={6}
      >
        <Flex justify="Center" align="center">
          <Text fontWeight={600}>Campaign</Text>
        </Flex>
        <Flex pt={8} gap={6} flexWrap="wrap" justify="center">
          {campaigns?.map((camp: any) => (
            <Link
              style={{ textDecoration: "none" }}
              key={camp.id}
              to={`/details/${camp.id}`}
            >
              <Card
                id={camp.id}
                amountDonated={Number(camp.amount_donated) / 10 ** 18}
                amountRequired={Number(camp.amount_required)}
                name={camp.name}
                description={camp.description}
                tags={camp.tags}
              />
            </Link>
          ))}
        </Flex>
      </Flex>
    </HalfSide>
  );
}

export default Campaign;

type CardT = {
  id: string;
  name: string;
  description: string;
  amountRequired: number;
  amountDonated: number;
  tags: [string];
};

const colors = ["#C5AFEA", "#E2E8F0", "#FBCFE8"];
const randomColor = Math.floor(Math.random() * colors.length);

function Card({
  id,
  name,
  description,
  amountDonated,
  amountRequired,
  tags,
}: CardT) {
  const progress = (amountDonated / amountRequired) * 100;

  const pics = [
    "pic-1.jpg",
    "pic-2.jpg",
    "pic-3.jpg",
    "pic-4.jpg",
    "pic-5.jpg",
    "pic-6.jpg",
    "pic-7.jpg",
    "pic-8.jpg",
    "pic-9.jpg",
    "pic-10.jpg",
    "coin.jpg",
  ];

  const random = Math.floor(Math.random() * pics.length);

  return (
    <Center>
      <Box
        p="5"
        maxW="301px"
        borderRadius="md"
        borderWidth="1px"
        borderColor="#C5AFEA"
        cursor="pointer"
        transform="auto"
        _hover={{ transform: `scale(1.09)`, transition: "transform 0.3s ease" }}
        _active={{
          transform: `scale(1.09)`,
          transition: "transform 0.3s ease",
        }}
      >
        <Image
          w="271px"
          h="159px"
          borderRadius="md"
          src={`/dummyPic/${pics[random]}`}
        />
        <Flex align="baseline" mt={3}>
          <Text ml={2} fontSize="sm" fontWeight={700}>
            {name}
          </Text>
        </Flex>
        <Text my={2} fontSize="lg" lineHeight="short">
          {description}
        </Text>
        {/* <Text mt={2}>${amountRequired}</Text> */}
        <Progress size="sm" borderRadius="md" value={progress} />
        <Flex mt={2} justify="space-between" align="center">
          <Text ml={1} fontSize="sm">
            <b>Z{amountDonated}</b>
          </Text>
          <Text ml={1} fontSize="sm">
            <b>Z{amountRequired}</b>
          </Text>
        </Flex>
        <Flex gap={2}>
          {tags.map((tag) => (
            <Tag key={tag} bgColor={colors[randomColor]}>
              {tag}
            </Tag>
          ))}
        </Flex>
      </Box>
    </Center>
  );
}
