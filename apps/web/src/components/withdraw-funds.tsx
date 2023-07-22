import { aaImplementationABI, erc20ABI } from 'abi';
import { encodeFunctionData } from 'viem';
import {
  useAccount,
  useBalance,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';

import { WMATIC } from '@/constants';
import { useProfileContext } from '@/context/profile-context';

import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

export function WithdrawFunds() {
  const { user, ownerOfToken } = useProfileContext();
  const balance = useBalance({
    address: user.accountAddress as `0x${string}`,
    watch: true,
    token: WMATIC,
    chainId: polygonMumbai.id,
  });
  const { address: account } = useAccount();

  const amount = <div>{balance?.data?.formatted || 0} WMATIC collected</div>;
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

  return (
    <div
      onClick={() => {
        withdrawfunds();
      }}
    >
      asdasd
    </div>
  );
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
      args: [WMATIC, BigInt(0), data],
    });
  };

  return (
    <div className="flex align-center justify-center items-center">
      {amount}

      {/* Shouldn't be visible if the user has no funds */}
      <Button
        className="ml-3"
        disabled={isLoading || txLoading}
        onClick={withdraw}
      >
        withdraw WMATIC
      </Button>
    </div>
  );
}
