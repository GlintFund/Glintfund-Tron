export type RecipientT = {
  name: string;
  publicKey: any;
  amountDonated: number;
  amountRequired: number;
  description: string;
  donationComplete: boolean;
};

export type CampaignT = {
  address: string;
  title: string;
  amountDonated: number;
  amountRequired: number;
  description: string;
  donationComplete: boolean;
  id: number;
  endTime: number;
  donationType: string;
};

export type TransactionT = {
  transactionNo: number;
  time: Date;
  status: string;
  signature: string;
};

export type PriceT = {
  usd: string;
  zeta: number;
};

export type TronDataSliceT = {
  walletAddress: string | null;
};
