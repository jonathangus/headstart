import 'dotenv/config';

import { createWalletClient, createPublicClient, http, parseAbi } from 'viem';
import { polygonMumbai } from 'viem/chains';
import { UserObject, PostObject } from 'shared-types';
import { aaImplementationABI, lenshubFactoryABI, nftABI } from 'abi';
import { privateKeyToAccount } from 'viem/accounts';
import { encodeFunctionData, parseEther } from 'viem';
import chalk from 'chalk';

const transport = http(
  `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
);

const account = privateKeyToAccount(
  ('0x' + process.env.PRIVATE_KEY) as `0x${string}`
);

const client = createWalletClient({
  chain: polygonMumbai,
  transport,
  account,
});

const publicClient = createPublicClient({
  chain: polygonMumbai,
  transport,
});

export const createUser = async (user: UserObject): Promise<void> => {
  const res = await client.writeContract({
    address: '0xaa8AE1a611EbD69A1Ab17C3447d920034227a692',
    abi: nftABI,
    functionName: 'mintProfile',
    args: [
      account.address,
      {
        handle: user.handle,
        imageURI: user.imageURI,
        followModule: '0x0000000000000000000000000000000000000000',
        followModuleInitData: '0x',
        followNFTURI: 'ipfs://QmRQ38pPu99Znd9jjQ1gUeSN6G8w5M2spQA7z2nNSs3rh6',
      },
    ],
  });

  console.log('waiting for transaction to finish ');

  const transaction = await publicClient.waitForTransactionReceipt({
    hash: res,
  });
};

export const createPosts = async (posts: PostObject[]): Promise<void> => {
  // TODO
  const freeCollectModule = '0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c';

  const postsData = posts.map((post) => ({
    profileId: BigInt(35655),
    contentURI: post.contentURI,
    collectModule: freeCollectModule as `0x${string}`,
    collectModuleInitData:
      '0x0000000000000000000000000000000000000000000000000000000000000000' as `0x${string}`,
    referenceModule:
      '0x0000000000000000000000000000000000000000' as `0x${string}`,
    referenceModuleInitData: '0x' as `0x${string}`,
  }));

  const postDataUno = postsData[0];

  const data = encodeFunctionData({
    abi: lenshubFactoryABI,
    functionName: 'post',
    args: [postDataUno],
  });

  console.log('creating posts..');
  console.log(postDataUno);
  const lenshubFactoryAddress = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';

  const res = await client.writeContract({
    address: '0x59D41A756A4Cc3026542F63A1B50668e710A428e',
    abi: aaImplementationABI,
    functionName: 'executeCall',
    args: [lenshubFactoryAddress, BigInt(0), data],
    value: BigInt(0),
  });
  console.log('waiting for transaction to finish ');

  const transaction = await publicClient.waitForTransactionReceipt({
    hash: res,
  });
  console.log('posts created! tx: ' + chalk.yellow(res));
};
