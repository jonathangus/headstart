import { Service } from 'shared-types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { uploadImageToIpfs, uploadToIpfs } from '../ipfs';
import chalk from 'chalk';
import { getDribbleContent } from './mirror';

const SERVICE = 'dribbble';
const dryRun = false;

export const service: Service = {
  sync: async (args) => {
    if (dryRun) {
      let imageURI =
        'https://ipfs.io/ipfs/QmcfP6PSQFzxMYkCZY88VtR5TZcq58gvQg6PTpL5DvNrk2';

      return {
        user: {
          handle: `${args.name}_${SERVICE}`,
          imageURI,
        },
        posts: [
          {
            contentURI:
              'https://lavender-adequate-dragon-359.mypinata.cloud/ipfs/QmWFfFBZNJ35RAJKZo7qLTpuXe2xH57TRcfUAW76x7ABaL',
          },
          {
            contentURI:
              'https://lavender-adequate-dragon-359.mypinata.cloud/ipfs/QmWFfFBZNJ35RAJKZo7qLTpuXe2xH57TRcfUAW76x7ABaL',
          },
        ],
      };
    }

    const data = await getDribbleContent();
    console.log(data);
    console.log('uploading to ipfs...');
    const postsPromises = data.nodes.map(async (post) => {
      // upload to ipfs
      const body = `view full content on ${post.link}`;
      const name = post.title;

      const data = {
        version: '1.0.0',
        metadata_id: uuidv4(),
        description: `${body}`,
        content: `${body}`,
        name,
        // contentFocus: 'Image',
        locale: 'en',

        attributes: [
          {
            traitType: 'type',
            value: 'post',
          },
        ],
        media: [
          {
            url: post.src,
            mimeType: 'image/png',
          },
        ],
        appId: 'eth cc',
      };

      const contentURI = await uploadToIpfs(data);

      return {
        contentURI,
      };
    });

    const posts = await Promise.all(postsPromises);

    return {
      user: {
        handle: `${args.name}_${SERVICE}`,
        imageURI: data.avatar,
      },
      posts,
    };
  },
};
