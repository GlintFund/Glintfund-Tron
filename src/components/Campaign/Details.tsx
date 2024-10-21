import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Text,
  Progress,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
  Button,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { CampaignT, TransactionT } from "../../redux/types";
import { IoIosArrowBack } from "react-icons/io";
import SideNav from "../SideNav/HalfSide";
import { contractAddress, useGetACampaign_ } from "../../hooks";
import { useAccount, useConnect, useWriteContract } from "wagmi";
import toast from "react-hot-toast";
import { parseEther } from "viem";
// import { getTokenPrice } from "../../utils/tokenPrice";
import { getTokenConversion } from "../../utils/tokenPrice";
import { SidebarDemo } from "../Sidebar";
import { addCampaignInView } from "../../redux/slice/CampInViewSlice";
import { AppContext, contractAddress_ } from "../../Context";
import { useApproveSpending } from "../functions";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState<number>(0);
  const [dollarVal, setDollarVal] = useState(0);
  const [eqSendingDollar, seteqSendingDollar] = useState(0);
  const format = (val: number) => `T${val}`;
  const parse = (val: string) => val.replace(/^\T/, "");
  const [loading, setLoading] = useState<boolean>(false);
  const [donateLoading, setDonateLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const details: CampaignT = useAppSelector(
    (state) => state.CampaignInViewSlice
  );
  const { getSmartContract } = useContext(AppContext);
  const { approveSpending, loading: approveSpendLoading } =
    useApproveSpending();

  const convert = async () => {
    const val = await getTokenConversion(details?.amountRequired);
    setDollarVal(val);
  };


  useEffect(() => {
    const callOnMount = async () => {
      try {
        setLoading(true);
        const contract = await getSmartContract();
        const data = await contract?.campaigns(BigInt(id)).call();
        console.log(data);
        if (data) {
          const val: CampaignT = {
            address: window.tronWeb.address.fromHex(data.admin),
            title: data.title,
            amountDonated: data.amount_donated.toNumber()/1000000,
            amountRequired: data.amount_required.toNumber(),
            description: data.description,
            donationComplete: data.donation_complete,
            id: data.id.toNumber(),
            endTime: data.endTime.toNumber(),
            donationType: data.donationType,
          };
          dispatch(addCampaignInView(val));
          setLoading(false);
          convert();
        }
      } catch (err) {
        setLoading(false);
        toast.error("Connect your wallet to donate");
      }
    };
    callOnMount();
  }, []);

  const handleDonate = async () => {
    try {
      setDonateLoading(true);
      // await approveSpending(
      //   "TFUD8x3iAZ9dF7NDCGBtSjznemEomE5rP9",
      //   contractAddress_,
      //   value
      // );
      const contract = await getSmartContract();
      var theId = +id;
      const donate = await contract
        .donate(BigInt(theId))
        .send({
          callValue: window?.tronWeb.toSun(value),
          from: window?.tronWeb.defaultAddress.base58,
          shouldPollResponse: false,
        });
      console.log(donate);
      if (donate) {
        setDonateLoading(false);
        toast.success("Donation Successful");
      }
    } catch (err: any) {
      setDonateLoading(false);
      toast.error(err.message);
      console.log(err);
      return;
    }
  };

  const handleSendVal = (valueString: string) => {
    setValue(+parse(valueString));
  };

  if (loading) {
    return (
      <SidebarDemo>
        <Center>
          <Text>Loading...</Text>
        </Center>
        </SidebarDemo>
    );
  }

  return (
    <SidebarDemo>
      <div className="mx-6 w-full ">
        <Flex my={6} justify="space-between">
          <Box onClick={() => navigate(-1)}>
            <IoIosArrowBack />
          </Box>
          <Text overflowWrap="break-word">
            TronFunding for {details?.title}
          </Text>
          <Box />
        </Flex>

        <Box
          color="black"
          py={3}
          mx={8}
          px={8}
          borderRadius={"15px"}
          bgColor="gray.200"
          gap={6}
          transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
          _hover={{
            transform: "scale(1.05)",
            boxShadow: "xl",
          }}
          cursor="pointer"
        >
          <Flex color="#5E5E5E" fontWeight={600} justify="space-between">
            <Text>{details?.description}</Text>
            <Text>
              {(details?.amountDonated / details?.amountRequired) *
                100}
              %
            </Text>
          </Flex>
          <Flex color="#353535" mt={1}>
            ${dollarVal}
          </Flex>
          <Flex color="#1935C4" fontWeight={600} mt={3} justify="space-between">
            <Text>T{details?.amountDonated.toLocaleString()}</Text>
            <Text>T{details?.amountRequired.toLocaleString()}</Text>
          </Flex>
          <Progress
            // color="#1935C4"
            value={
              (details?.amountDonated / details?.amountRequired) * 100
            }
          />
        </Box>

        <Box mx={8}>
          <NumberInput
            defaultValue={format(value)}
            min={0}
            onChange={(valueString) => handleSendVal(valueString)}
          >
            <NumberInputField my={3} placeholder="how much in tron?" />
          </NumberInput>
          <Button
            onClick={handleDonate}
            w={"full"}
            my={3}
            color="white"
            bgColor="purple"
            isLoading={donateLoading}
          >
            Send
          </Button>
        </Box>
      </div>
    </SidebarDemo>
  );
}

export default Details;

export function Transactions() {
  const transaction = useAppSelector((state) => state.transction);

  return (
    <TableContainer
      mx={8}
      h={"200px"}
      overflowY={"scroll"}
      css={{
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for Chrome, Safari, and Opera
        },
        scrollbarWidth: "none", // Hide scrollbar for Firefox
        msOverflowStyle: "none", // Hide scrollbar for Internet Explorer and Edge
      }}
    >
      <Table variant="simple">
        <TableCaption>Transaction details</TableCaption>
        <Thead>
          <Tr>
            <Th>Signature</Th>
            <Th>Date</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transaction?.map((val: TransactionT) => (
            <Tr key={val.transactionNo}>
              <Td>{val.signature.slice(0, 30)}...</Td>
              <Td>{val.time.toISOString()}</Td>
              <Td>{val.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    //nothingS
  );
}
