import { useWriteContract, useReadContract } from "wagmi";
import React, { useEffect, useState } from "react";
import contractAbi from "../contract/CrowdFunding-abi.json";
import type { Address } from "viem";
import { config } from "../utils/wagmi";

export const contractAddress = "0x8F890851A4a789F273C3dCE9505B1A1B2ddCCDD7";

type ReturnType = {
  isLoading: boolean;
  data: any;
  error: any;
  refetch?: any;
};

/* 

export const useGetACampaign = (id: any, enabled?: boolean): ReturnType => {
  const { data, error } = useReadContract({
    abi: contractAbi.abi,
    address: contractAddress,
    functionName: "campaigns",
    args: [id],
    query: { enabled },
  });

  return {
    isLoading: !data && !error,
    data,
    error,
  };
};

*/

export const useGetACampaign_ = (id: any) => {
  const [campaignData, setCampaignData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  // Only fetch the data if it hasn't been fetched already
  const { data, error: fetchError } = useReadContract({
    abi: contractAbi.abi,
    address: contractAddress,
    functionName: "campaigns",
    args: [id],
    query: { enabled: !campaignData && !!id }, // Only fetch if no campaignData yet and id is valid
  });

  useEffect(() => {
    if (data && !campaignData) {
      setCampaignData(data); // Store fetched data in state
      setLoading(false); // Stop loading once data is fetched
    } else if (fetchError) {
      setError(fetchError);
      setLoading(false); // Stop loading on error
    }
  }, [data, fetchError, campaignData]);

  return {
    isLoading: loading,
    data: campaignData,
    error,
  };
};

export const useGetACampaign = (id: any) => {
  console.log("--calling--");

  const shouldFetch = React.useMemo(() => !!id, [id]); // Only allow fetching if id exists

  const { data, error } = useReadContract({
    abi: contractAbi.abi,
    address: contractAddress,
    functionName: "campaigns",
    args: [id],
    query: { enabled: shouldFetch }, // Prevent fetching if id is invalid
  });

  return {
    isLoading: !data && !error,
    data,
    error,
  };
};
export const useGetAllCampaigns = (): ReturnType => {
  const { data, error, refetch } = useReadContract({
    abi: contractAbi.abi,
    address: contractAddress,
    functionName: "getAllCampaigns",
  });

  return {
    isLoading: !data && !error,
    data,
    error,
    refetch,
  };
};

export const useGetUserProfile = (address: Address | undefined): ReturnType => {
  const { error, data } = useReadContract({
    abi: contractAbi.abi,
    address: contractAddress,
    functionName: "getUserProfile",
    args: [address],
  });

  return {
    isLoading: !data && !error,
    data,
    error,
  };
};

export const useGetAllUsers = (): ReturnType => {
  const { data, error } = useReadContract({
    abi: contractAbi.abi,
    address: contractAddress,
    functionName: "getAllUsers",
  });

  return {
    isLoading: !data && !error,
    data,
    error,
  };
};
