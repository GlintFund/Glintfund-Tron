import React, { useEffect } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  Flex,
  Textarea,
  useTimeout,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";
import {
  useAccount,
  useWriteContract,
  BaseError,
  useConnect,
  useReadContract,
} from "wagmi";
import contractAbi from "../../contract/CrowdFunding-abi.json";
import { config } from "../../utils/wagmi";
import { zetachainAthensTestnet } from "viem/chains";
import { injected } from "wagmi/connectors";
import { useGetACampaign } from "../../hooks";
import toast from "react-hot-toast";
import { contractAddress } from "../../hooks/index";

function Onboarding3() {
  const { bio, tags, amount, setBio, initUser } = React.useContext(AppContext);
  const navigate = useNavigate();
  const { address } = useAccount();
  const { data, error, writeContractAsync } = useWriteContract({
    config,
  });
  const { connectAsync } = useConnect();
  const [loading, setLoading] = React.useState(false);

  const { data: camp } = useGetACampaign(1);

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      if (!address) {
        await connectAsync({
          chainId: zetachainAthensTestnet.id,
          connector: injected(),
        });
      }

      const data = await writeContractAsync({
        chainId: zetachainAthensTestnet.id,
        address: contractAddress, // change to receipient address
        functionName: "create",
        abi: contractAbi.abi,
        args: [bio.name, bio.description, Number(amount), tags],
      });

      toast("Account Created Successfully");
      navigate("/profile");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast("Something Went Wrong");
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box>
        <Text fontSize="32px" fontWeight={600}>
          Create an Account
        </Text>
        <Text pt={4} fontSize="16px">
          funding are 100 percent on-chain, secure and tamper-proof on the
          zetachain. You can fund with any of the tokens but primarily with zeta
        </Text>
      </Box>
      {/* put your details */}
      <Flex flexDirection="column" gap={3} pt={4} w={"100%"}>
        <Text my={3}>Title</Text>
        <Input
          value={bio.name}
          onChange={(e) =>
            setBio({
              ...bio,
              name: e.target.value,
            })
          }
          name="name"
          placeholder="what is the title of the campaign"
        />
        <Text my={3}>Description</Text>
        <Textarea
          value={bio.description}
          onChange={(e) =>
            setBio({
              ...bio,
              description: e.target.value,
            })
          }
          placeholder="write a short reason for your zetachain funding"
        />
      </Flex>

      <Flex justify="flex-end" mt={8}>
        <Button
          py={7}
          px={5}
          color="white"
          bgColor="primary.50"
          onClick={handleCreateUser}
          isLoading={loading}
          isDisabled={bio.name.length < 3 && bio.description.length < 3}
        >
          Create
        </Button>
      </Flex>
    </Box>
  );
}

export default Onboarding3;
