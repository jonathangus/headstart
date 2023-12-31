import 'dotenv/config';

import {
  createWalletClient,
  createPublicClient,
  http,
  parseAbi,
  decodeEventLog,
  encodeAbiParameters,
} from 'viem';
import { polygonMumbai } from 'viem/chains';
import { UserObject, PostObject } from 'shared-types';
import {
  aaImplementationABI,
  headstartPointer,
  lenshubFactoryABI,
  lenshubFactoryAddress,
  nftABI,
} from 'abi';
import { privateKeyToAccount } from 'viem/accounts';
import { encodeFunctionData, parseEther } from 'viem';
import chalk from 'chalk';

const transport = http(
  `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
);

const HEADSTART_ADDRESS = headstartPointer;

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

type Context = {
  accountsPerTokenId: `0x${string}`;
  profileIdPerTokenId: bigint;
};

export const createUser = async (user: UserObject): Promise<Context> => {
  console.log('MINTING NFT TO ', account.address);
  const res = await client.writeContract({
    address: HEADSTART_ADDRESS,
    abi: nftABI,
    functionName: 'mintProfile',
    args: [
      account.address,
      {
        handle: user.handle + Math.random().toFixed(2),
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

  const tokenid = BigInt(transaction.logs[0].topics[3] as string);
  console.log(tokenid);

  const [accountsPerTokenId, profileIdPerTokenId] = await Promise.all([
    publicClient.readContract({
      address: HEADSTART_ADDRESS,
      abi: nftABI,
      functionName: 'accountsPerTokenId',
      args: [tokenid as bigint],
    }),
    publicClient.readContract({
      address: HEADSTART_ADDRESS,
      abi: nftABI,
      functionName: 'profileIdPerTokenId',
      args: [tokenid as bigint],
    }),
  ]);

  console.log(`minted token with id ${chalk.green(tokenid)}`);
  console.log(
    `created new token bound account ${chalk.green(accountsPerTokenId)}`
  );
  console.log(`
    lens handle created at ${chalk.green(
      user.handle + '.test.lens'
    )} and profile id ${chalk.green(profileIdPerTokenId)}
  `);

  return {
    accountsPerTokenId,
    profileIdPerTokenId,
  };
};

export const createPosts = async (
  posts: PostObject[],
  ctx: Context
): Promise<void> => {
  const feeCollectModule = '0xeb4f3EC9d01856Cec2413bA5338bF35CeF932D82';
  const mumbaiWMATIC = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889';

  const feeCollectModuleInitData = encodeAbiParameters(
    [
      { name: 'amount', type: 'uint256' },
      { name: 'currency', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'referralFee', type: 'uint16' },
      { name: 'followerOnly', type: 'bool' },
    ],
    [parseEther('0.001'), mumbaiWMATIC, ctx.accountsPerTokenId, 0, false]
  );

  const postsData = posts.map((post) => ({
    profileId: ctx.profileIdPerTokenId,
    contentURI: post.contentURI,
    collectModule: feeCollectModule as `0x${string}`,
    collectModuleInitData: feeCollectModuleInitData as `0x${string}`,
    referenceModule:
      '0x0000000000000000000000000000000000000000' as `0x${string}`,
    referenceModuleInitData: '0x' as `0x${string}`,
  }));

  console.log('waiting for creating posts on lens');

  for (let post of postsData) {
    const data = encodeFunctionData({
      abi: lenshubFactoryABI,
      functionName: 'post',
      args: [post],
    });
    const res = await client.writeContract({
      address: ctx.accountsPerTokenId,
      abi: aaImplementationABI,
      functionName: 'executeCall',
      args: [lenshubFactoryAddress, BigInt(0), data],
      value: BigInt(0),
    });
    await publicClient.waitForTransactionReceipt({
      hash: res,
    });
    console.log('post created! tx: ' + chalk.yellow(res));
  }
};
