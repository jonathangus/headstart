import PinataClient from '@pinata/sdk';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const pinata = new PinataClient({
  // eslint-disable-next-line
  pinataJWTKey: process.env.PINATA_JWT as string,
});

export const uploadToIpfs = async (content: any): Promise<string> => {
  const res = await pinata.pinJSONToIPFS(content);

  return `https://ipfs.io/ipfs/${res.IpfsHash}`;
};

export const uploadImageToIpfs = async (pathName: string): Promise<string> => {
  const readableStreamForFile = fs.createReadStream(pathName);

  const res = await pinata.pinFileToIPFS(readableStreamForFile, {
    pinataMetadata: {
      name: 'tba',
    },
    pinataOptions: {
      cidVersion: 0,
    },
  });

  return `https://ipfs.io/ipfs/${res.IpfsHash}`;
};
