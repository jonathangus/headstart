import { createContext, PropsWithChildren, useContext } from 'react';

type ProfileContext = {
  tokenId: string;
};

export const profileContext = createContext<ProfileContext>(
  {} as ProfileContext
);

type Props = {
  tokenId: string;
};

export const ProfileContextProvider = ({
  children,
  tokenId,
}: PropsWithChildren<Props>) => {
  const value = {
    tokenId,
  };

  return (
    <profileContext.Provider value={value}>{children}</profileContext.Provider>
  );
};

export const useProfileContext = () => useContext(profileContext);
