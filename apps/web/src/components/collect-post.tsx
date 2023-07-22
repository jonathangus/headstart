import { useLensContext } from '@/context/lens-context';
import { erc20ABI, lenshubFactoryABI, lenshubFactoryAddress } from 'abi';
import { PostEntity } from 'shared-types';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import {
  createPublicClient,
  encodeAbiParameters,
  http,
  parseEther,
} from 'viem';
import { polygonMumbai } from 'viem/chains';
import { useState } from 'react';

type Props = {
  post: PostEntity;
};

const transport = http(
  `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
);

const publicClient = createPublicClient({
  chain: polygonMumbai,
  transport,
});

const WMATIC = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889';
const FEE_COLLECT_MODULE = '0xeb4f3EC9d01856Cec2413bA5338bF35CeF932D82';

export function CollectPost({ post }: Props) {
  const { profileId } = useLensContext();
  const { toast } = useToast();
  const { address: account } = useAccount();

  const { data: allowance } = useContractRead({
    abi: erc20ABI,
    address: WMATIC,
    functionName: 'allowance',
    args: [account as `0x${string}`, FEE_COLLECT_MODULE],
    watch: true,
  });

  const { writeAsync: approve } = useContractWrite({
    abi: erc20ABI,
    address: WMATIC,
    functionName: 'approve',
    args: [FEE_COLLECT_MODULE, BigInt(1000000000000000)],
  });

  const feeCollectModuleInitData = encodeAbiParameters(
    [
      { name: 'currency', type: 'address' },
      { name: 'price', type: 'uint256' },
    ],
    [WMATIC, parseEther('0.001')]
  );

  const [isApproving, setIsApproving] = useState(false);
  const { write, isLoading, data } = useContractWrite({
    abi: lenshubFactoryABI,
    address: lenshubFactoryAddress,
    functionName: 'collect',
    args: [BigInt(35699), BigInt(2), feeCollectModuleInitData],
    onError: (e) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: e.message,
      });
    },
  });

  const { isLoading: isLoadingTx } = useWaitForTransaction({
    hash: data?.hash,
  });

  console.log('from:', account);
  console.log('TO:', lenshubFactoryAddress);
  console.log([BigInt(35699), BigInt(2), feeCollectModuleInitData]);
  const isLoadingAnything = isLoading || isLoadingTx || isApproving;
  const collect = async () => {
    try {
      if (allowance === BigInt(0)) {
        setIsApproving(true);
        const tx = await approve();

        await publicClient.waitForTransactionReceipt({
          hash: tx.hash,
        });
        setIsApproving(false);
      }
      write();
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: e.message,
      });
      setIsApproving(false);
    }
  };

  return (
    <div>
      <Button disabled={isLoadingAnything} onClick={() => collect()}>
        collect post
      </Button>
    </div>
  );
}
