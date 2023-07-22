import { headstartPointer, nftABI } from 'abi';
import { createContext, PropsWithChildren, useContext } from 'react';
import { UserEntity } from 'shared-types';
import { useContractRead } from 'wagmi';

type ProfileContext = {
  user: UserEntity;
  isClaimed: boolean;
  ownerOfToken: `0x${string}`;
};

export const profileContext = createContext<ProfileContext>(
  {} as ProfileContext
);

type Props = {
  user: UserEntity;
};

const DEFAULT_OWNER = '0xAffE759de243684736E8326F52C5177eB702F1b9';

export const ProfileContextProvider = ({
  children,
  user,
}: PropsWithChildren<Props>) => {
  const { data: owner = '' } = useContractRead({
    address: headstartPointer,
    abi: nftABI,
    functionName: 'ownerOf',
    args: [BigInt(Number(user.tokenId))],
    watch: true,
  });

  const isClaimed = owner.toLowerCase() !== DEFAULT_OWNER.toLowerCase();

  const value = {
    user,
    owner,
    isClaimed,
    ownerOfToken: owner || user.ownedBy,
  };

  return (
    <profileContext.Provider value={value}>{children}</profileContext.Provider>
  );
};

export const useProfileContext = () => useContext(profileContext);
