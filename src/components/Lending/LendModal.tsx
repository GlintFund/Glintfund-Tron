import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  FormControl,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { AppContext } from "../../Context";
import toast from "react-hot-toast";

function LendModal({ onToggle, isOpen }) {
  const { getSmartContract } = React.useContext(AppContext);
  const [donateLoading, setDonateLoading] = React.useState<boolean>(false);

  const handleDonate = async () => {
    try {
      setDonateLoading(true);
      const contract = await getSmartContract();
      var theId = 2;
      const donate = await contract
        .donate(BigInt(theId))
        .send({
          callValue: window?.tronWeb.toSun(50),
          from: window.tronWeb.defaultAddress.base58,
          shouldPollResponse: false,
        });
      console.log(donate);
      if (donate) {
        setDonateLoading(false);
        toast.success("Offer created Successful");
      }
    } catch (err: any) {
      setDonateLoading(false);
      toast.error(err.message);
      console.log(err);
      return;
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onToggle} size={{ base: "sm", md: "lg" }}>
        <ModalOverlay />
        <ModalContent bgColor={"#2D2A32"} color={"white"}>
          <ModalHeader fontSize={"xl"} fontWeight={"bold"}>
            Make Your Offer
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* Amount to Lend */}
            <FormControl isRequired>
              <FormLabel>Amount to Lend</FormLabel>
              <NumberInput min={0} precision={2} step={1}>
                <NumberInputField
                  borderColor="primary.50"
                  placeholder="Enter amount"
                />
              </NumberInput>
            </FormControl>

            {/* Collateral */}
            <FormControl mt={4} isRequired>
              <FormLabel>Collateral Amount</FormLabel>
              <NumberInput min={0} precision={2} step={1} b>
                <NumberInputField
                  borderColor="primary.50"
                  placeholder="Enter collateral amount"
                />
              </NumberInput>
            </FormControl>

            {/* Collateral Type */}
            <FormControl mt={4} isRequired>
              <FormLabel>Collateral Type</FormLabel>
              <Select
                placeholder="Select collateral type"
                variant="Flushed"
                bgColor="transparent"
              >
                <option value="crypto">Cryptocurrency</option>
                <option value="nft">NFT</option>
                <option value="real-estate">Real Estate</option>
              </Select>
            </FormControl>

            {/* Maturity Date */}
            <FormControl mt={4} isRequired>
              <FormLabel>Maturity Date</FormLabel>
              <Input borderColor="primary.50" type="date" />
            </FormControl>

            {/* Additional Info (Optional) */}
            <FormControl mt={4}>
              <FormLabel>Additional Information</FormLabel>
              <Textarea
                borderColor="primary.50"
                placeholder="Any additional terms or notes?"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={donateLoading}
              colorScheme="blue"
              mr={3}
              onClick={handleDonate}
            >
              Submit Offer
            </Button>
            <Button onClick={onToggle} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LendModal;
