import type { NextApiRequest, NextApiResponse } from 'next';
import { createWalletClient, http, createPublicClient } from 'viem';
import { polygonMumbai } from 'viem/chains';
import { UserObject, PostObject } from 'shared-types';
import { privateKeyToAccount } from 'viem/accounts';
import { nftABI, headstartPointer } from 'abi';

const transport = http(
  `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
);

const publicClient = createPublicClient({
  chain: polygonMumbai,
  transport,
});

const account = privateKeyToAccount(
  ('0x' + process.env.PRIVATE_KEY) as `0x${string}`
);

const client = createWalletClient({
  chain: polygonMumbai,
  transport,
  account,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { receiver, tokenId } = req.body;

    const hash = await client.writeContract({
      address: headstartPointer,
      abi: nftABI,
      functionName: 'transferFrom',
      args: [account.address, receiver, tokenId],
    });

    await publicClient.waitForTransactionReceipt({
      hash: hash,
    });

    res.status(200).json({ hash });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
}
