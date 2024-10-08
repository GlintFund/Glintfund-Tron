import { cn } from "../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Image, Progress, Tag } from "@chakra-ui/react";
import { useState } from "react";
import { CardContainer, CardItem } from "./3d-card";
import { CampaignT } from "../redux/types";
import { Link } from "react-router-dom";
export const HoverEffect = ({
  items,
  className,
}: {
  items: CampaignT[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          to={`/details/${item.id}`}
          key={item?.id}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-[#2C014D] dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
            <CardContainer className="inter-var">
              <ImageSection
                src={
                  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
              />
            </CardContainer>
            <Progress
              size="sm"
              borderRadius="md"
              value={(item.amountDonated / item.amountRequired) * 100}
            />
            <p className="py-3">${item.amountDonated} raised</p>
            <div className="flex flex-row justify-between gap-y-3">
              <div className=" flex-1 gap-y-3">
                <p className="text-zinc-400 tracking-wide leading-relaxed text-sm">
                  Supported Tokens
                </p>
                <div className="flex-1 gap-x-5">
                  <Tag>BNB</Tag> <Tag>SUN</Tag> <Tag>JPX</Tag>
                </div>
              </div>
              <div>
                <div className=" flex-1 gap-y-3">
                  <p className="text-zinc-400 tracking-wide leading-relaxed text-sm">
                    Funding Type
                  </p>
                  <div className="flex-1 gap-x-5">
                    <Tag>{item?.donationType}</Tag>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-[#2C014D] dark:border-[#2C014D]/[0.2] group-hover:border-[#2C014D] relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-1 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

export const ImageSection = ({
  className,
  src,
}: {
  className?: string;
  src: string;
}) => {
  return (
    <CardItem translateZ="100" className="w-full mt-1">
      <Image
        src={src}
        height="40"
        width="1000"
        className="h-[40px] w-full object-cover rounded-xl group-hover/card:shadow-xl"
        alt="thumbnail"
      />
    </CardItem>
  );
};
