import React, { useState, useContext } from 'react'
import {
  Box,
  Text,
  Flex,
  Input,
  Button,
  Image,
  VStack,
  Progress,
  keyframes,
  useClipboard,
  Heading,
  Show,
  Hide,
  Center,
} from '@chakra-ui/react'
import { AppContext } from '../../Context'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { motion } from 'framer-motion'
import { useWriteContract } from 'wagmi'
import QRCode from 'qrcode'
import contractAbi from '../../contract/CrowdFunding-abi.json'
import toast from 'react-hot-toast'
import MobileNavBar from '../Navbar/MobileNavbar'
import { getTokenConversion } from '../../utils/tokenPrice'
// import { Transactions } from "../Campaign/Details";
import SideNav from '../SideNav'

import { useAccount } from 'wagmi'
import { useAppSelector } from '../../redux/hook'
import { contractAddress } from '../../hooks'
import { SidebarDemo } from '../Sidebar'
import { DownloadIcon, CopyIcon } from '@chakra-ui/icons'
import { useGetAllCampaigns } from '../functions'

const AnimatedCopyIcon = motion(CopyIcon)

const bounce = keyframes`
  0%, 50% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`

function Index() {
  const location = useLocation()
  const { getAllCampaigns } = useGetAllCampaigns()
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [converstion, setConverstion] = React.useState(0)
  const campaigns = useAppSelector((state) => state.campaign)
  const address = useAppSelector((state) => state.tronData.walletAddress)
  const data = campaigns?.filter((camp) => camp.address === address)
  const donationLink = window.location.origin + '/details/' + data[0]?.id
  const [isLoading, setIsLoading] = useState(false)
  const { hasCopied, onCopy } = useClipboard(donationLink)
  const { getSmartContract } = useContext(AppContext)

  const navigate = useNavigate()

  const handleClaim = async () => {
    try {
      setIsLoading(true)
      const contract = await getSmartContract()
      const value = await contract
        ?.finalizeCampaign(BigInt(data[0].id), 'skjsjsj')
        .send({
          from: window.tronWeb.defaultAddress.base58,
          shouldPollResponse: false,
        })

      if (value) {
        toast.success('claim Successful')
        setIsLoading(false)
        return
      }
    } catch (err: any) {
      toast.error(err.message)
      setIsLoading(false)
      console.log('[Error message from handleClaim -]', err.message)
      return
    }
  }

  React.useEffect(() => {
    const cc = async () => {
      const val = await getTokenConversion(data[0]?.amountRequired)
      setConverstion(val)
    }
    if (data) {
      cc()
    }
  }, [data])

  React.useEffect(() => {
    const call = async () => {
      await getAllCampaigns(getSmartContract)
    }
    call()
  }, [])

  // With async/await
  // const generateQR = async () => {
  //   try {
  //     const url = await QRCode.toDataURL(donationLink);
  //     setQrCodeUrl(url);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleDownloadQR = () => {
    const link = document.createElement('a')
    link.href = qrCodeUrl
    link.setAttribute('download', 'Qr Code') // Set the download attribute with the desired file name
    document.body.appendChild(link)
    link.click()
    link.remove() // Clean up after the download is triggered
  }

  return (
    <SidebarDemo>
      {/*Selection */}
      <Flex
        mt={8}
        gap={8}
        overflowX={'scroll'}
        justify={'center'}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none', // Hide scrollbar for Chrome, Safari, and Opera
          },
          scrollbarWidth: 'none', // Hide scrollbar for Firefox
          msOverflowStyle: 'none', // Hide scrollbar for Internet Explorer and Edge
        }}
      >
        <Hide below="md">
          <OptionCard
            title={'Lending'}
            description="This feature is coming soon"
          />
          <OptionCard
            title={'Crowdfunding'}
            description="easily raise funds under 10 seconds"
          />
          <OptionCard
            title={'Borrowing'}
            description="This feature is coming soon"
          />
        </Hide>
        <Show below="md">
          <Flex justify="center" mx="auto">
            <OptionCard_
              title={'Crowdfunding'}
              description="easily raise funds under 10 seconds"
            />
          </Flex>
        </Show>
      </Flex>

      <Text my={4} mx={3} fontWeight={600}>
        Active funds
      </Text>
      {data.length > 0 ? (
        <Box
          color="white"
          py={3}
          mx={8}
          px={8}
          borderRadius={'15px'}
          bgColor="transparent"
          gap={6}
          transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
          _hover={{
            transform: 'scale(1.05)',
            boxShadow: 'xl',
          }}
          cursor="pointer"
        >
          <Flex color="#5E5E5E" fontWeight={600} justify="space-between">
            <Text>{data[0]?.description}</Text>
            <Text>
              {Math.floor(
                (Number(data[0]?.amountDonated) /
                  Number(data[0]?.amountRequired)) *
                  100
              )}
              %
            </Text>
          </Flex>
          <Flex color="white" mt={1}>
            ${converstion}
          </Flex>

          <Flex color="white" fontWeight={600} mt={3} justify="space-between">
            <Text>T{Number(data[0]?.amountDonated.toLocaleString())}</Text>
            <Text>T{Number(data[0]?.amountRequired.toLocaleString())}</Text>
          </Flex>
          <Progress
            color="#1935C4"
            value={Math.floor(
              (Number(data[0]?.amountDonated) /
                Number(data[0]?.amountRequired)) *
                100
            )}
          />
          {/* Donation Link */}
          <Box
            bg="primary.50"
            borderRadius="lg"
            p={8}
            boxShadow="lg"
            mx="auto"
            mt={3}
            textAlign="center"
          >
            <Heading as="h2" size="lg" mb={6}>
              Share Your Donation
            </Heading>
            <Text fontSize="lg" mb={4}>
              You can share your donation with others using the link or QR code
              below.
            </Text>

            <Flex flexDirection={{ base: 'column', md: 'row' }} gap={8} mb={8}>
              {/* QR Code Section */}
              <Box>
                <Image
                  src={qrCodeUrl}
                  alt="Donation QR Code"
                  borderRadius="md"
                  mb={4}
                  boxSize="200px"
                  mx="auto"
                />
                <Button
                  leftIcon={<DownloadIcon />}
                  colorScheme="purple"
                  onClick={handleDownloadQR}
                >
                  Download QR Code
                </Button>
              </Box>

              {/* Donation Link Section */}
              <Flex
                align="center"
                justifyContent="center"
                borderRadius="md"
                // w="full"
                bg="gray.100"
                h={16}
                p={3}
              >
                <Input
                  value={donationLink}
                  isReadOnly
                  variant="unstyled"
                  fontWeight="bold"
                  color="purple.600"
                />
                <Button
                  onClick={onCopy}
                  ml={2}
                  px={6}
                  colorScheme="purple"
                  leftIcon={<CopyIcon />}
                >
                  {hasCopied ? 'Copied' : 'Copy Link'}
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Box>
      ) : (
        <Center>
          <Button onClick={() => navigate('/onboarding')}>
            Create a Campaign
          </Button>
        </Center>
      )}
      <Button
        onClick={handleClaim}
        my={6}
        color="white"
        bgColor="purple"
        mx={8}
        px={8}
        isDisabled={!data[0]?.donationComplete}
        isLoading={isLoading}
      >
        Claim Donation
      </Button>
    </SidebarDemo>
  )
}

export default Index

interface OptionType {
  title: string
  description: string
}

const OptionCard: React.FC<OptionType> = ({ title, description }) => {
  return (
    <Box
      maxW={'346px'}
      maxH={'208px'}
      borderRadius={'15px'}
      overflow="hidden"
      transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
      _hover={{
        transform: 'scale(1.05)',
        boxShadow: 'xl',
      }}
      position={'relative'}
    >
      <Image
        src="crowd-funding.png"
        alt="Placeholder Image"
        w={'346px'}
        h={'208px'}
      />
      {/* <Text mt="2" color="white" position="absolute">
        crowdfunding
      </Text> */}

      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="rgba(0, 0, 0, 0.5)"
        color="white"
        opacity="0"
        transition="opacity 0.2s ease-in-out"
        _hover={{ opacity: 1 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        px="4"
        cursor={'pointer'}
      >
        <VStack>
          <Text fontWeight="bold" fontSize="xl" opacity={1}>
            {title}
          </Text>
          <Text>{description}</Text>
        </VStack>
      </Box>
    </Box>
    // </Box>
  )
}
const OptionCard_: React.FC<OptionType> = ({ title, description }) => {
  return (
    <Box
      maxW={'346px'}
      maxH={'155px'}
      borderRadius={'15px'}
      overflow="hidden"
      transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
      _hover={{
        transform: 'scale(1.05)',
        boxShadow: 'xl',
      }}
      position={'relative'}
    >
      <Image
        src="crowd-funding.png"
        alt="Placeholder Image"
        w={'346px'}
        h={'208px'}
      />
      {/* <Text mt="2" color="white" position="absolute">
        crowdfunding
      </Text> */}

      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="rgba(0, 0, 0, 0.5)"
        color="white"
        opacity="0"
        transition="opacity 0.2s ease-in-out"
        _hover={{ opacity: 1 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        px="4"
        cursor={'pointer'}
      >
        <VStack>
          <Text fontWeight="bold" fontSize="xl" opacity={1}>
            {title}
          </Text>
          <Text>{description}</Text>
        </VStack>
      </Box>
    </Box>
    // </Box>
  )
}
