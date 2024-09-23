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
  name: string;
  amountDonated: number;
  amountRequired: number;
  description: string;
  donationComplete: boolean;
  id: number;
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
