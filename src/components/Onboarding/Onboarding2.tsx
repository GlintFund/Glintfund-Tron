import React from "react";
import {
  Box,
  Text,
  Input,
  Button,
  Flex,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { AppContext } from "../../Context";
import { getTokenConversion } from "../../utils/tokenPrice";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { addPrice } from "../../redux/slice/PriceSlice";

function Onboarding2() {
  const { setStep, amount, setAmount } = React.useContext(AppContext);
  console.log(amount);
  const format = (val: number) => `Z` + val;
  const parse = (val: string) => val.replace(/^\Z/, "");
  const [converstion, setConverstion] = React.useState(0);
  const price = useAppSelector((state) => state.price);
  const dispatch = useAppDispatch();

  const handleChangeAmount = async (value: string) => {
    setAmount(+parse(value));
  };

  React.useEffect(() => {
    const cc = async () => {
      const val = await getTokenConversion(amount);
      setConverstion(val);
    };

    cc();
  }, [amount]);

  return (
    <Box>
      <Box>
        <Text fontSize="32px" fontWeight={600}>
          How much would you like to raise?
        </Text>
        <Text pt={4} fontSize="16px">
          funding are 100 percent on-chain, secure and tamper-proof on the
          zetachain blockchain. You can fund with any tokens supported on
          Zetachain but primarily with Zeta
        </Text>
      </Box>
      {/* pick funding type */}
      <Flex pt={4}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="primary.50"
            fontSize="1.2em"
          >
            Z
          </InputLeftElement>
          <NumberInput
            value={format(amount)}
            onChange={(value: string) => handleChangeAmount(value)}
            defaultValue={0}
            clampValueOnBlur={false}
          >
            <NumberInputField />
          </NumberInput>
        </InputGroup>
        <Input
          placeholder="equivalent zeta presently"
          size="lg"
          readOnly
          isDisabled
          value={"$ " + converstion}
        />
      </Flex>
      {/* funding sector */}

      <Flex justify="flex-end" mt={8}>
        <Button
          py={7}
          px={5}
          color="white"
          bgColor="primary.50"
          onClick={() => {
            setStep(3);
          }}
          isDisabled={amount < 1}
        >
          Next Step
        </Button>
      </Flex>
    </Box>
  );
}

export default Onboarding2;
