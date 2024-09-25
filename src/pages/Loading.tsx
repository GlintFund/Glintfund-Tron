import { Box, Spinner, Center } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box h="100vh">
      <Center>
        <Spinner />
      </Center>
    </Box>
  );
};

export default Loading;
