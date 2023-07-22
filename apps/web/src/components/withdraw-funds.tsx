import {
  useAccount,
  useBalance,
  useContractWrite,
  useTransaction,
  useWaitForTransaction,
} from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { Button } from './ui/button';
import { encodeFunctionData } from 'viem';
import { aaImplementationABI, erc20ABI } from 'abi';
import { useToast } from './ui/use-toast';
import { WMATIC } from '@/constants';
import { useProfileContext } from '@/context/profile-context';

export function WithdrawFunds() {
  const tokenId = 1;
  const { user, ownerOfToken } = useProfileContext();
  const balance = useBalance({
    address: user.accountAddress as `0x${string}`,
    watch: true,
    token: WMATIC,
    chainId: polygonMumbai.id,
  });
  const { address: account } = useAccount();

  console.log(balance?.data);
  const amount = <div>{balance?.data?.formatted} WMATIC collected</div>;
  const { toast } = useToast();

  const {
    write: executeCall,
    isLoading,
    data,
  } = useContractWrite({
    abi: aaImplementationABI,
    address: user.accountAddress as `0x${string}`,
    functionName: 'executeCall',
    value: BigInt(0),
  });

  const { isLoading: txLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      toast({
        title: 'Withdraw success! ',
        description: 'USDC claimed for TBA to EOA.',
      });
    },
  });

  if (!account) {
    return amount;
  }

  if (ownerOfToken.toLowerCase() !== account.toLowerCase()) {
    return amount;
  }

  if (balance.data?.value === BigInt(0)) {
    return amount;
  }

  const withdraw = () => {
    const data = encodeFunctionData({
      abi: erc20ABI,
      functionName: 'transfer',
      args: [account, balance.data?.value || BigInt(0)],
    });

    executeCall({
      args: [usdcAddress, BigInt(0), data],
    });
  };

  return (
    <div>
      {amount}

      {/* Shouldn't be visible if the user has no funds */}
      <Button disabled={isLoading || txLoading} onClick={withdraw}>
        withdraw USDC
      </Button>
    </div>
  );
}
