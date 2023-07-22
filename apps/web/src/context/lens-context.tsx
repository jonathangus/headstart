import { createContext, PropsWithChildren, useContext } from 'react';

type LensContext = {
  profileId?: bigint;
};

export const lensContext = createContext<LensContext>({} as LensContext);

type Props = {};

export const LensContextProvider = ({ children }: PropsWithChildren<Props>) => {
  const value = {
    profileId: BigInt(35690),
  };

  return <lensContext.Provider value={value}>{children}</lensContext.Provider>;
};

export const useLensContext = () => useContext(lensContext);
