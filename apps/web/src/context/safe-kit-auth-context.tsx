import { Web3AuthModalPack } from '@safe-global/auth-kit';
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  UserInfo,
  WALLET_ADAPTERS,
} from '@web3auth/base';
import { Web3AuthOptions } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { createContext, PropsWithChildren, useContext } from 'react';
import { useEffect, useState } from 'react';

import { useToast } from '@/components/ui/use-toast';

const LOGIN_MODAL_EVENTS = {
  INIT_EXTERNAL_WALLETS: 'INIT_EXTERNAL_WALLETS',
  LOGIN: 'LOGIN',
  DISCONNECT: 'DISCONNECT',
  MODAL_VISIBILITY: 'MODAL_VISIBILITY',
};

type SafeKitContext = {
  isLoggingIn: boolean;
  signIn: () => void;
  safeAuthSignInResponse: any;
};

export const safeKitContext = createContext<SafeKitContext>(
  {} as SafeKitContext
);

type Props = {};

export const SafeKitContextProvider = ({
  children,
}: PropsWithChildren<Props>) => {
  const { toast } = useToast();

  const [web3AuthModalPack, setWeb3AuthModalPack] = useState<any>();
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<
    any | null
  >(null);
  const [userInfo, setUserInfo] = useState<Partial<UserInfo>>();
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    (async () => {
      const options: Web3AuthOptions = {
        clientId: process.env.NEXT_PUBLIC_VITE_WEB3AUTH_CLIENT_ID || '',
        web3AuthNetwork: 'testnet',
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: '0x13881',
          rpcTarget: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
        },
        uiConfig: {
          theme: 'dark',
          loginMethodsOrder: ['twitter', 'google'],
        },
      };

      const modalConfig = {
        [WALLET_ADAPTERS.TORUS_EVM]: {
          label: 'torus',
          showOnModal: false,
        },
        [WALLET_ADAPTERS.METAMASK]: {
          label: 'metamask',
          showOnDesktop: true,
          showOnMobile: false,
        },
      };

      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: 'none',
        },
        adapterSettings: {
          uxMode: 'popup',
          whiteLabel: {
            name: 'headstart',
          },
        },
      });

      const web3AuthModalPack = new Web3AuthModalPack({
        txServiceUrl: 'https://safe-transaction-goerli.safe.global',
      });

      await web3AuthModalPack.init({
        options,
        adapters: [openloginAdapter],
        modalConfig,
      });

      const connectedHandler: Web3AuthEventListener = (data) => {
        console.log('connected');
        setIsLoggingIn(false);
      };

      const disconnectedHandler: Web3AuthEventListener = (data) => {
        console.log('disconnected');
        setIsLoggingIn(false);
      };

      const closeHandler: Web3AuthEventListener = (data) => {
        setIsLoggingIn(false);
      };

      const visibiltyHandler = (open: boolean) => {
        if (!open) {
          setIsLoggingIn(false);
        }
      };

      web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);
      web3AuthModalPack.subscribe(ADAPTER_EVENTS.ERRORED, closeHandler);
      web3AuthModalPack.subscribe(
        LOGIN_MODAL_EVENTS.MODAL_VISIBILITY,
        visibiltyHandler
      );

      web3AuthModalPack.subscribe(
        ADAPTER_EVENTS.DISCONNECTED,
        disconnectedHandler
      );

      setWeb3AuthModalPack(web3AuthModalPack);
      return () => {
        web3AuthModalPack.unsubscribe(
          ADAPTER_EVENTS.CONNECTED,
          connectedHandler
        );
        web3AuthModalPack.unsubscribe(
          ADAPTER_EVENTS.DISCONNECTED,
          disconnectedHandler
        );
        web3AuthModalPack.unsubscribe(
          LOGIN_MODAL_EVENTS.MODAL_VISIBILITY,
          visibiltyHandler
        );
      };
    })();
  }, []);

  const login = async () => {
    console.log('trying to login', {
      web3AuthModalPack,
      safeAuthSignInResponse,
    });
    if (!web3AuthModalPack) return;

    if (safeAuthSignInResponse) {
      return;
    }
    setIsLoggingIn(true);
    try {
      const signInInfo = await web3AuthModalPack.signIn();
      const userInfo = await web3AuthModalPack.getUserInfo();

      setSafeAuthSignInResponse(signInInfo);
      setUserInfo(userInfo || undefined);
      setProvider(web3AuthModalPack.getProvider() as SafeEventEmitterProvider);

      window.localStorage.setItem('safe', 'true');
    } catch (e: any) {
      console.log(e);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: e.message,
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const value = {
    login,
    safeAuthSignInResponse,
    userInfo,
    isLoggingIn,
    provider,
  };

  return (
    <safeKitContext.Provider value={value}>{children}</safeKitContext.Provider>
  );
};

export const useSafeKitContext = () => useContext(safeKitContext);
