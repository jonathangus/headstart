import type { NextApiRequest, NextApiResponse } from 'next';
import { createPublicClient, http } from 'viem';
import { polygonMumbai } from 'viem/chains';
import { UserObject, PostObject } from 'shared-types';

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

  // await contract.createUser()
  const userData = {
    handle: user.handle,
    imageURI: user.imageURI,
    followModule: '0x...',
    followModuleInitData: '0x',
    followNFTURI: '',
  };

  const postsData = posts.map((post) => ({
    contentURI: post.contentURI,
    collectModule: '0x00',
    collectModuleInitData: '0x',
    referenceModule: '0x00',
    referenceModuleInitData: '0x',
  }));

  const blockNumber = await client.getBlockNumber();

  res.status(200).json({ name: 'John Doe', br: Number(blockNumber) });
}
