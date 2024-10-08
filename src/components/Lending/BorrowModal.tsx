import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

function ConfirmBorrowingModal({ onToggle, isOpen, borrowerDetails }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onToggle} size={{ base: "sm", md: "lg" }}>
        <ModalOverlay />
        <ModalContent bgColor={"#2D2A32"} borderRadius="lg">
          <ModalHeader>Confirm Lending Offer</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Borrower: {borrowerDetails.name}
            </Text>
            <Text fontSize="md" mb={2}>
              Request Amount: {borrowerDetails.requestedAmount} USD
            </Text>
            <Text fontSize="md" mb={2}>
              Collateral Range: {borrowerDetails.collateralRange}
            </Text>
            <Text fontSize="md" mb={4}>
              Maturity Date: {borrowerDetails.maturityDate}
            </Text>

            <FormControl>
              <FormLabel>Amount You Want to Lend</FormLabel>
              <Input placeholder="Enter amount" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Collateral to Provide</FormLabel>
              <Input placeholder="Enter collateral amount" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Set Maturity Date</FormLabel>
              <Input type="date" placeholder="Choose maturity date" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onToggle}>
              Confirm Lending
            </Button>
            <Button variant="outline" onClick={onToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfirmBorrowingModal;
