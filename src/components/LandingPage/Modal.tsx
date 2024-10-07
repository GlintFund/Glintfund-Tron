import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function OptionModal({ onToggle, isOpen }) {
  const navigate = useNavigate();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onToggle} size={{ base: "sm", md: "lg" }}>
        <ModalOverlay />
        <ModalContent
          color="white"
          bgColor={"#2D2A32"}
          borderRadius="15px"
          boxShadow="0 8px 16px rgba(0, 0, 0, 0.3)"
          p={6}
          alignItems="center"
          zIndex={30}
        >
          <ModalHeader fontSize="2xl" fontWeight="bold" textAlign="center">
            🎉 Get Started with GlintFund!
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Box textAlign="center" mb={5}>
              <Text fontSize="lg" fontWeight="semibold" mb={2}>
                How would you like to proceed?
              </Text>
              <Text fontSize="md" mb={4}>
                You can either create a campaign to raise funds or explore our
                other exciting features.
              </Text>
              <UnorderedList
                styleType="none"
                spacing={2}
                fontSize="lg"
                fontWeight="medium"
                color="cyan.400"
              >
                <ListItem>✔️ Create a Campaign</ListItem>
                <ListItem>
                  ✔️ Revieve Payment with our multi-token feature
                </ListItem>
                <ListItem>✔️ Donate to existing campaigns</ListItem>
                <ListItem>✔️ Participate in P2P lending</ListItem>
                <ListItem>✔️ Swap tokens effortlessly</ListItem>
              </UnorderedList>
            </Box>
          </ModalBody>

          <ModalFooter
            justifyContent="center"
            display="flex"
            flexDirection="column"
            gap={3}
          >
            <Button
              variant="outline"
              borderColor="cyan.400"
              color="cyan.400"
              _hover={{
                bg: "cyan.400",
                color: "white",
                borderColor: "cyan.400",
              }}
              px={8}
              py={3}
              borderRadius="full"
              fontSize="sm"
              fontWeight="medium"
              onClick={() => navigate("/campaign")}
            >
              💡 Explore Other Features
            </Button>
            <Button
              colorScheme="purple"
              bgGradient="linear(to-r, purple.400, cyan.500)"
              _hover={{ bgGradient: "linear(to-r, purple.500, cyan.600)" }}
              mr={3}
              px={8}
              py={3}
              borderRadius="full"
              fontSize="sm"
              fontWeight="medium"
              onClick={() => navigate("/onboarding")}
            >
              🚀 Create a Campaign
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default OptionModal;
