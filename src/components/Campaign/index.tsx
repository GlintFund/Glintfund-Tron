// import React from "react";
// import {
//   Box,
//   Center,
//   Flex,
//   Image,
//   Text,
//   Container,
//   Grid,
//   Heading,
//   Badge,
//   Progress,
//   Tag,
// } from "@chakra-ui/react";
// import { AppContext } from "../../Context";
// import { Link } from "react-router-dom";
// import Navbar from "../Navbar";
// import { CampaignT } from "../../redux/types";
// import { useAppSelector } from "../../redux/hook";

// import HalfSide from "../SideNav/HalfSide";
// import { useGetAllCampaigns } from "../../hooks";

// function Campaign() {
//   const { data: campaigns, isLoading } = useGetAllCampaigns();
//   console.log(campaigns);

//   return (
//     <HalfSide>
//       <Flex
//         gap={6}
//         mt={3}
//         h="100vh"
//         overflowY={"scroll"}
//         css={{
//           "&::-webkit-scrollbar": {
//             display: "none", // Hide scrollbar for Chrome, Safari, and Opera
//           },
//           scrollbarWidth: "none",
//           msOverflowStyle: "none",
//         }}
//         flexDirection={"column"}
//         mx={6}
//       >
//         <Flex justify="Center" align="center">
//           <Text fontWeight={600}>Campaign</Text>
//         </Flex>
//         <Flex pt={8} gap={6} flexWrap="wrap" justify="center">
//           {campaigns?.map((camp: any) => (
//             <Link
//               style={{ textDecoration: "none" }}
//               key={camp.id}
//               to={`/details/${camp.id}`}
//             >
//               <Card
//                 id={camp.id}
//                 amountDonated={Number(camp.amount_donated) / 10 ** 18}
//                 amountRequired={Number(camp.amount_required)}
//                 name={camp.name}
//                 description={camp.description}
//                 tags={camp.tags}
//               />
//             </Link>
//           ))}
//         </Flex>
//       </Flex>
//     </HalfSide>
//   );
// }

// export default Campaign;

// type CardT = {
//   id: string;
//   name: string;
//   description: string;
//   amountRequired: number;
//   amountDonated: number;
//   tags: [string];
// };

// const colors = ["#C5AFEA", "#E2E8F0", "#FBCFE8"];
// const randomColor = Math.floor(Math.random() * colors.length);

// function Card({
//   id,
//   name,
//   description,
//   amountDonated,
//   amountRequired,
//   tags,
// }: CardT) {
//   const progress = (amountDonated / amountRequired) * 100;

//   const pics = [
//     "pic-1.jpg",
//     "pic-2.jpg",
//     "pic-3.jpg",
//     "pic-4.jpg",
//     "pic-5.jpg",
//     "pic-6.jpg",
//     "pic-7.jpg",
//     "pic-8.jpg",
//     "pic-9.jpg",
//     "pic-10.jpg",
//     "coin.jpg",
//   ];

//   const random = Math.floor(Math.random() * pics.length);

//   return (
//     <Center>
//       <Box
//         p="5"
//         maxW="301px"
//         borderRadius="md"
//         borderWidth="1px"
//         borderColor="#C5AFEA"
//         cursor="pointer"
//         transform="auto"
//         _hover={{ transform: `scale(1.09)`, transition: "transform 0.3s ease" }}
//         _active={{
//           transform: `scale(1.09)`,
//           transition: "transform 0.3s ease",
//         }}
//       >
//         <Image
//           w="271px"
//           h="159px"
//           borderRadius="md"
//           src={`/dummyPic/${pics[random]}`}
//         />
//         <Flex align="baseline" mt={3}>
//           <Text ml={2} fontSize="sm" fontWeight={700}>
//             {name}
//           </Text>
//         </Flex>
//         <Text my={2} fontSize="lg" lineHeight="short">
//           {description}
//         </Text>
//         {/* <Text mt={2}>${amountRequired}</Text> */}
//         <Progress size="sm" borderRadius="md" value={progress} />
//         <Flex mt={2} justify="space-between" align="center">
//           <Text ml={1} fontSize="sm">
//             <b>Z{amountDonated}</b>
//           </Text>
//           <Text ml={1} fontSize="sm">
//             <b>Z{amountRequired}</b>
//           </Text>
//         </Flex>
//         <Flex gap={2}>
//           {tags.map((tag) => (
//             <Tag key={tag} bgColor={colors[randomColor]}>
//               {tag}
//             </Tag>
//           ))}
//         </Flex>
//       </Box>
//     </Center>
//   );
// }

// / Dummy dashboard component with content
import React from "react";
import { SidebarDemo } from "../Sidebar";
import { HoverEffect } from "../../animations/card-hover-effect";
import { CardBody, CardContainer, CardItem } from "../../animations/3d-card";
import { Input } from "@chakra-ui/react";
import { CiFilter } from "react-icons/ci";
import FilterComponent from "./Filter";
import { useGetAllCampaigns } from "../functions";
import { useAppSelector } from "../../redux/hook";
import { AppContext } from "../../Context";

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

const Campaign = () => {
  const [onFilterChange, setOnFilterChange] = React.useState("All");
  const { getAllCampaigns } = useGetAllCampaigns();
  const campaigns = useAppSelector((state) => state.campaign);
  const { getSmartContract } = React.useContext(AppContext);

  const getRandomImage = () => {
    return pics[Math.floor(Math.random() * pics.length)];
  };
  const filteredCampaign = campaigns
    ?.filter((camp) => {
      if (onFilterChange === "All") return true; // Don't filter if it's "All"
      return camp.donationType?.toLowerCase() === onFilterChange.toLowerCase();
    })
    .map((camp) => ({
      ...camp, // Spread existing properties of each campaign
      image: getRandomImage(),
    }));

  React.useEffect(() => {
    if (campaigns.length < 1) {
      getAllCampaigns(getSmartContract);
    }
  }, []);

  return (
    <SidebarDemo>
      <div className="bg-customPurple mx-auto px-8">
        <div className="flex pt-3 justify-between items-center  mx-auto ">
          <h2 className="font-extrabold">Campaigns</h2>
          <Input maxW={"40%"} placeholder="search for campaign" />
          {/* <CiFilter/> */}
          <FilterComponent onFilterChange={setOnFilterChange} />
        </div>
        <HoverEffect items={filteredCampaign} />
      </div>
    </SidebarDemo>
  );
};

export default Campaign;

export const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progress: 20,
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progress: 30,
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progress: 0,
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progress: 78,
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progress: 49,
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progress: 90,
  },
];
