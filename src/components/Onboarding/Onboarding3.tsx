import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  Flex,
  Textarea,
  Select,
  Checkbox,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";
import { config } from "../../utils/wagmi";
import { injected } from "wagmi/connectors";
import { useGetACampaign } from "../../hooks";
import toast from "react-hot-toast";

function Onboarding3() {
  const { bio, tags, amount, setBio, getSmartContract } =
    React.useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [endTime, setEndTime] = useState("");
  const [isRefundable, setIsRefundable] = useState(false);
  const [donationType, setDonationType] = useState("");

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const smartContract = await getSmartContract();
    // console.log(bio, tags, amount, isRefundable, donationType, endTime);

    const endTimeBigInt = endTime
      ? BigInt(new Date(endTime).getTime() / 1000)
      : null;

    // Handle form submission logic here
    // console.log("End Time (BigInt):", endTimeBigInt);

    try {
      const result = await smartContract
        .create(
          bio.name,
          bio.description,
          BigInt(amount),
          tags,
          endTimeBigInt,
          isRefundable,
          donationType
        )
        .send({
          from: window.tronWeb.defaultAddress.base58, // Sender's address
          shouldPollResponse: false, // Optional: wait for confirmation
        });

      console.log(result);
      toast("Account Created Successfully");
      navigate("/profile");
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      toast(err);
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
          Funding are 100 percent on-chain, secure and tamper-proof on the Tron.
          You can fund with any of the tokens but primarily with TRX
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
          placeholder="write a short reason for your Tron funding"
        />
        {/* End Time (date) */}
        <FormControl id="endTime" mb="4">
          <FormLabel>End Time</FormLabel>
          <Input
            type="date"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </FormControl>

        {/* Refundable (bool) */}
        <FormControl id="refundable" mb="4">
          <Checkbox
            isChecked={isRefundable}
            onChange={(e) => setIsRefundable(e.target.checked)}
          >
            Refundable
          </Checkbox>
        </FormControl>

        {/* Donation Type (string) */}
        <FormControl id="donationType" mb="4">
          <FormLabel>Donation Type</FormLabel>
          <Select
            placeholder="Select donation type"
            value={donationType}
            onChange={(e) => setDonationType(e.target.value)}
          >
            <option value="fundraising">Fundraising</option>
            <option value="donationLink">Donation Link</option>
            <option value="paymentLink">Payment Link</option>
          </Select>
        </FormControl>
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
