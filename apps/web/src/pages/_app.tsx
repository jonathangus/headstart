import "./globals.css";
import type { AppProps } from "next/app";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import { Inter } from "next/font/google";

<<<<<<< HEAD
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
=======
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
>>>>>>> refs/remotes/origin/main
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
  polygonMumbai,
<<<<<<< HEAD
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Toaster } from "@/components/ui/toaster";
=======
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { Toaster } from '@/components/ui/toaster';
import { LensContextProvider } from '@/context/lens-context';
>>>>>>> refs/remotes/origin/main

const queryClient = new QueryClient();
const inter = Inter({ subsets: ["latin"] });

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }),
    // publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
<<<<<<< HEAD
  appName: "hack ethcc",
  projectId: "YOUR_PROJECT_ID",
=======
  appName: 'hack ethcc',
  projectId: '.....' as any,
>>>>>>> refs/remotes/origin/main
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
<<<<<<< HEAD
          <main
            className={`w-full flex min-h-screen flex-col items-center p-24 ${inter.className}`}
          >
            <Component {...pageProps} />
          </main>
          <Toaster />
=======
          <LensContextProvider>
            <>
              <header>
                <ConnectButton />
              </header>
              <Component {...pageProps} />
              <Toaster />
            </>
          </LensContextProvider>
>>>>>>> refs/remotes/origin/main
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
