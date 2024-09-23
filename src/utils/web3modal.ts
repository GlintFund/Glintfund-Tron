import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  zetachainAthensTestnet, zetachain
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";


const config = getDefaultConfig({
  appName: 'ZetaFund',
  projectId: 'YOUR_PROJECT_ID',
  chains: [zetachainAthensTestnet, zetachain],
  // ssr: true, // If your dApp uses server side rendering (SSR)
});