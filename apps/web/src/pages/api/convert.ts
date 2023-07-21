import type { NextApiRequest, NextApiResponse } from 'next';
import { createPublicClient, http } from 'viem';
import { polygonMumbai } from 'viem/chains';
import { UserObject, PostObject } from 'shared-types';
import chalk from 'chalk';

const transport = http(
  `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
);

const client = createPublicClient({
  chain: polygonMumbai,
  transport,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { user, posts } = req.body as {
    posts: PostObject[];
    user: UserObject;
  };

  console.log({ user, posts });

  const userData = {
    handle: user.handle,
    imageURI: user.imageURI,
    followModule: '0x0000000000000000000000000000000000000000',
    followModuleInitData: '0x',
    followNFTURI: 'ipfs://QmRQ38pPu99Znd9jjQ1gUeSN6G8w5M2spQA7z2nNSs3rh6',
  };

  const postsData = posts.map((post) => ({
    contentURI: post.contentURI,
    collectModule: '0x00',
    collectModuleInitData: '0x',
    referenceModule: '0x00',
    referenceModuleInitData: '0x',
  }));

  // await contract.createUser()

  const blockNumber = await client.getBlockNumber();

  res.status(200).json({ name: 'John Doe', br: Number(blockNumber) });
}
