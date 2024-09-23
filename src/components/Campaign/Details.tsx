import React, { useEffect, useState } from "react";
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
import { useAppSelector } from "../../redux/hook";
import { TransactionT } from "../../redux/types";
import { IoIosArrowBack } from "react-icons/io";
import SideNav from "../SideNav/HalfSide";
import { contractAddress, useGetACampaign_ } from "../../hooks";
import { useAccount, useConnect, useWriteContract } from "wagmi";
import toast from "react-hot-toast";
import contractAbi from "../../contract/CrowdFunding-abi.json";
import { parseEther } from "viem";
// import { getTokenPrice } from "../../utils/tokenPrice";
import { getTokenConversion } from "../../utils/tokenPrice";
import { zetachainAthensTestnet } from "viem/chains";
import { injected } from "wagmi/connectors";
import { config } from "../../utils/wagmi";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { address } = useAccount();
  const [value, setValue] = useState<number>(0);
  const [dollarVal, setDollarVal] = useState(0);
  const [eqSendingDollar, seteqSendingDollar] = useState(0);
  const format = (val: number) => `Z${val}`;
  const parse = (val: string) => val.replace(/^\Z/, "");
  const { connectAsync } = useConnect();
  const [loading, setLoading] = useState<boolean>(false);
  const { data, error, writeContractAsync } = useWriteContract({
    config,
  });

  const { data: contractData, isLoading } = useGetACampaign_(id);

  const convert = async () => {
    const val = await getTokenConversion(Number(contractData[3]));
    setDollarVal(val);
  };

  useEffect(() => {
    if (contractData) {
      console.log("Campaign data:", contractData);
      convert();
    }
  }, [contractData]);

  const handleDonate = async () => {
    try {
      setLoading(true);
      if (value <= 0) {
        return toast.error("you can't send below 0 Zeta");
      } else if (!address) {
        await connectAsync({
          chainId: zetachainAthensTestnet.id,
          connector: injected(),
        });
      }
      const hash = await writeContractAsync({
        abi: contractAbi.abi,
        address: contractAddress,
        functionName: "donate",
        value: parseEther(`${value}`),
        args: [id],
      });

      console.log(hash);
      setLoading(false);
      toast.success("Donation Successful");
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message);
      return;
    }
  };

  const handleSendVal = (valueString: string) => {
    setValue(+parse(valueString));
  };

  if (!contractData) {
    return (
      <SideNav>
        <Center>
          <Text>Loading...</Text>
        </Center>
      </SideNav>
    );
  }

  return (
    <SideNav>
      <Box mx={6}>
        <Flex my={6} justify="space-between">
          <Box onClick={() => navigate(-1)}>
            <IoIosArrowBack />
          </Box>
          <Text>ZetaFunding for {contractData[2]}</Text>
          <Box />
        </Flex>

        <Box
          color="black"
          py={3}
          mx={8}
          px={8}
          borderRadius={"15px"}
          h={170}
          bgColor="white"
          gap={6}
          transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
          _hover={{
            transform: "scale(1.05)",
            boxShadow: "xl",
          }}
          cursor="pointer"
        >
          <Flex color="#5E5E5E" fontWeight={600} justify="space-between">
            <Text>{contractData[5]}</Text>
            <Text>
              {Math.floor(
                Number(contractData[6]) / 10 ** 18 / Number(contractData[3])
              ) * 100}
              %
            </Text>
          </Flex>
          <Flex color="#353535" mt={1}>
            ${dollarVal}
          </Flex>
          <Flex color="#1935C4" fontWeight={600} mt={3} justify="space-between">
            <Text>Z{Number(contractData[6]) / 10 ** 18}</Text>
            <Text>Z{Number(contractData[3])}</Text>
          </Flex>
          <Progress
            color="#1935C4"
            value={Math.floor(
              (Number(contractData[6]) / 10 ** 18 / Number(contractData[3])) *
                100
            )}
          />
        </Box>

        <Box mx={8}>
          <NumberInput
            defaultValue={format(value)}
            min={0}
            onChange={(valueString) => handleSendVal(valueString)}
          >
            <NumberInputField my={3} placeholder="how much in zeta?" />
          </NumberInput>
          <Button
            onClick={handleDonate}
            w={"full"}
            my={3}
            color="white"
            bgColor="purple"
            isLoading={loading}
          >
            Send
          </Button>
        </Box>
      </Box>
    </SideNav>
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
