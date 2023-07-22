import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  polygonMumbai,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';

import { Toaster } from '@/components/ui/toaster';
import { LensContextProvider } from '@/context/lens-context';

const queryClient = new QueryClient();
const inter = Inter({ subsets: ['latin'] });

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }),
    // publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'hack ethcc',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID as string,
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
          <LensContextProvider>
            <>
              <header className="flex justify-end p-4">
                <ConnectButton />
              </header>
              <main className="w-full p-24 flex flex-col place-content-center">
                <Component {...pageProps} />
              </main>
              <Toaster />
            </>
          </LensContextProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
