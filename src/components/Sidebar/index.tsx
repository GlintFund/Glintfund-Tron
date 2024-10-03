import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../animations/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import {Link,Image} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { cn } from "../..//lib/utils";
import Logo from "../Logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";


export function SidebarDemo({children}) {
  const links = [
    {
      label: "Dashboard",
      href: "/campaign",
      icon: (
        <IconBrandTabler className="text-neutral-200 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="text-neutral-200 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Swap",
      href: "/swap",
      icon: (
        <IconSettings className="text-neutral-200 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Lending/Borrowing",
      href: "/lending",
      icon: (
        <IconArrowLeft className="text-neutral-200 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-customPurple overflow-y-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8  flex flex-col gap-4">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          {/* <div>
          <ConnectButton
            chainStatus="none"
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "avatar",
            }}
          />
          </div> */}
        </SidebarBody>
      </Sidebar>
      <div className="overflow-y-scroll w-full h-screen bg-customPurple">
      {children}
      </div>
      {/* <Dashboard /> */}
    </div>
  );
}

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-neutral-200 py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-primary100 dark:bg-primary100 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};


