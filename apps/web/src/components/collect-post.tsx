import { erc20ABI, lenshubFactoryABI, lenshubFactoryAddress } from 'abi';
import { PostEntity } from 'shared-types';
import { LensClient, development } from '@lens-protocol/client';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useToast } from './ui/use-toast';
import {
  createPublicClient,
  encodeAbiParameters,
  http,
  parseEther,
} from 'viem';

import { polygonMumbai } from 'viem/chains';
import { useState } from 'react';
import { WMATIC } from '@/constants';

import { Button } from './ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { HeartIcon, ReloadIcon } from '@radix-ui/react-icons';

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

const lensClient = new LensClient({
  environment: development,
});

const FEE_COLLECT_MODULE = '0xeb4f3EC9d01856Cec2413bA5338bF35CeF932D82';

export function CollectPost({ post }: Props) {
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

  let publisherId = BigInt(35699);
  let postId = BigInt(2);

  if (post.publicationId) {
    const sliced = post.publicationId.split('-');
    publisherId = BigInt(Number(sliced[0]));
    postId = BigInt(Number(sliced[1]));
  }

  const [isApproving, setIsApproving] = useState(false);
  const { write, isLoading, data } = useContractWrite({
    abi: lenshubFactoryABI,
    address: lenshubFactoryAddress,
    functionName: 'collect',
    args: [publisherId, postId, feeCollectModuleInitData],
    onSuccess: async () => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ['collected', post.publicationId],
      });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData([
        'collected',
        post.publicationId,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ['collected', post.publicationId],
        (old: number) => old + 1
      );

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
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

  const { data: collectedCount } = useQuery(
    ['collected', post.publicationId],
    async () => {
      const xyz = await lensClient.publication.allWalletsWhoCollected({
        publicationId: post.publicationId,
      });

      return xyz.items.length;
    },
    {
      enabled: Boolean(post.publicationId),
      refetchOnWindowFocus: true,
      staleTime: Infinity,
    }
  );

  const queryClient = useQueryClient();

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

  const disabled = isLoadingAnything || !account;
  return (
    <Button
      variant="ghost"
      className="p-2"
      onClick={(e) => {
        e.stopPropagation();
        collect();
      }}
    >
      {isLoading ? (
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <HeartIcon className="mr-2 h-4 w-4" />
      )}{' '}
      like ({collectedCount || 0})
    </Button>
  );
}
