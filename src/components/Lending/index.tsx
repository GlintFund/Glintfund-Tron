import React from "react";
import {
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import { SidebarDemo } from "../Sidebar";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import cn from "classnames";
import LendModal from "./LendModal";
import Filter from "./Filter";
import ConfirmBorrowingModal from "./BorrowModal";

function Lending() {
  const [lendOption, setLendOption] = React.useState(true);
  const [onFilterChange, setOnFilterChange] = React.useState("");

  const handleSelectOption = () => {
    setLendOption((prev) => !prev);
  };

  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: BorrowIsOpen, onToggle: BorrowOnToggle } = useDisclosure();

  const borrowerDetails = {
    requestedAmount: "$30,000",
    collateralRange: "$3000,0000",
    maturityDate: "20-4-2024",
  };
  return (
    <>
      <SidebarDemo>
        <div className="mx-4">
          {/* navigation */}
          <div className="flex flex-row">
            <h1 className="flex justify-center my-8 font-light">
              Lending and Borrowing
            </h1>
          </div>
          <div className="flex flex-row justify-evenly my-3">
            <div
              onClick={() => handleSelectOption()}
              className={cn(
                "flex gap-x-3 w-[50%] justify-center cursor-pointer items-center",
                {
                  "border border-gray-400 rounded-xl py-2 px-6 transition duration-300 ease-in-out transform hover:scale-105":
                    lendOption,
                  "": !lendOption,
                }
              )}
            >
              <FaArrowUp /> <h3>Lending</h3>
            </div>
            <div
              onClick={() => handleSelectOption()}
              className={cn(
                "flex gap-x-3 w-[50%] justify-center cursor-pointer items-center",
                {
                  "border border-gray-400 rounded-xl py-2 px-6 transition duration-300 ease-in-out transform hover:scale-105":
                    !lendOption,
                  "": lendOption,
                }
              )}
            >
              <FaArrowDown /> <h3>Borrowing</h3>
            </div>
          </div>
          <hr className="border-t border-gray-200 opacity-30" />
        </div>
        <div className="flex flex-row">
          {/* body */}
          <div className="bg-custom-gradient h-screen mt-6 w-full md:w-[70%] border border-transparent rounded-lg py-6 px-6 overflow-y-scroll ">
            <div className="flex justify-end">
              <Filter onFilterChange={onFilterChange} />
            </div>
            {lendOption ? (
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>User</Th>
                      <Th>Collateral</Th>
                      <Th isNumeric>Price</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr
                      onClick={() => {
                        onToggle();
                      }}
                      className="transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                    >
                      <Td>
                        <div>
                          <Avatar size="sm" />
                          <div className=" flex text-sm items-center space-y-1">
                            <p className="opacity-30 hidden md:block">
                              Limits&nbsp;
                            </p>
                            <p className="text-xs">450 - 1222,555 USD</p>
                          </div>
                        </div>
                      </Td>
                      <Td>300 BNB</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <div>
                          <Avatar size="sm" />
                          <div className=" flex text-sm items-center space-y-1">
                            <p className="opacity-30 hidden md:block">
                              Limits&nbsp;
                            </p>
                            <p className="text-xs">450 - 1222,555 USD</p>
                          </div>
                        </div>
                      </Td>
                      <Td>100 (USDT)</Td>
                      <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <div>
                          <Avatar size="sm" />
                          <div className=" flex text-sm items-center space-y-1">
                            <p className="opacity-30 hidden md:block">
                              Limits&nbsp;
                            </p>
                            <p className="text-xs">450 - 1222,555 USD</p>
                          </div>
                        </div>
                      </Td>
                      <Td>Pockmon (NFT)</Td>
                      <Td isNumeric>0.91444</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>User</Th>
                      <Th>Amount</Th>
                      <Th isNumeric>Price</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr
                      onClick={() => {
                        BorrowOnToggle();
                      }}
                      className="transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                    >
                      <Td>
                        <div>
                          <Avatar size="sm" />
                          <div className=" flex text-sm items-center space-y-1">
                            <p className="opacity-30 hidden md:block">
                              Limits&nbsp;
                            </p>
                            <p className="text-xs">450 - 1222,555 USD</p>
                          </div>
                        </div>
                      </Td>
                      <Td>300 BNB</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <div>
                          <Avatar size="sm" />
                          <div className=" flex text-sm items-center space-y-1">
                            <p className="opacity-30 hidden md:block">
                              Limits&nbsp;
                            </p>
                            <p className="text-xs">450 - 1222,555 USD</p>
                          </div>
                        </div>
                      </Td>
                      <Td>100 (USDT)</Td>
                      <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <div>
                          <Avatar size="sm" />
                          <div className=" flex text-sm items-center space-y-1">
                            <p className="opacity-30 hidden md:block">
                              Limits&nbsp;
                            </p>
                            <p className="text-xs">450 - 1222,555 USD</p>
                          </div>
                        </div>
                      </Td>
                      <Td>Pockmon (NFT)</Td>
                      <Td isNumeric>0.91444</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </div>
          <div className="w-1 h-screen" />
          {/* History */}
          <div className="bg-custom-gradient h-screen mt-6 border border-transparent rounded-lg py-6 px-6 hidden sm:block w-[30%] ">
            <h1 className="font-bold flex justify-center items-center mb-8">
              {lendOption ? "Lending" : "Borrowing"} History
            </h1>
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
          </div>
        </div>
        <LendModal isOpen={isOpen} onToggle={onToggle} />
        <ConfirmBorrowingModal
          isOpen={BorrowIsOpen}
          onToggle={BorrowOnToggle}
          borrowerDetails={borrowerDetails}
        />
      </SidebarDemo>
    </>
  );
}

export default Lending;

function HistoryCard() {
  return (
    <div className="border bg-customPurple bg-b border-transparent rounded-xl flex flex-col justify-start items-start px-3 py-2 my-3 transition duration-300 ease-in-out transform hover:scale-105">
      <h1 className="font-bold">Hyau Yaugh</h1>
      <p className="text-xs -gray-200 opacity-30">
        you borrowed 40BNB from 0X23233y34343...
      </p>
    </div>
  );
}
