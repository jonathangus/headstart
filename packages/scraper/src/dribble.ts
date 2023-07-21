import { Service } from 'shared-types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { uploadImageToIpfs, uploadToIpfs } from './ipfs';
import chalk from 'chalk';

const tmpPath = path.resolve(__dirname, '../tmp');

const SERVICE = 'dribble';

export const service: Service = {
  getUser: async (args) => {
    const user = {
      handle: '123',
    };
    let imageURI =
      'https://ipfs.io/ipfs/QmcfP6PSQFzxMYkCZY88VtR5TZcq58gvQg6PTpL5DvNrk2';

    console.log('uploading user image to ' + chalk.green('ipfs'));
    // const fileName = path.join(tmpPath, uuidv4() + '.png');
    // const response = await axios({
    //   method: 'get',
    //   url: 'https://cdn.anotherblock.io/logo.png',
    //   responseType: 'stream',
    // });

    // await new Promise((res) => {
    //   response.data.pipe(
    //     fs.createWriteStream(fileName).on('finish', () => {
    //       res(true);
    //     })
    //   );
    // });

    // const imageURI = await uploadImageToIpfs(fileName);
    // fs.unlink

    console.log('user image URI is ', chalk.yellow(imageURI));
    return {
      handle: `${args.name}.${SERVICE}`,
      imageURI,
    };
  },

  getPosts: async () => {
    console.log(`fetching content from ${chalk.red(service)}`);

    const data = [
      {
        title: 'my input thing',
        image: 'https://cdn.anotherblock.io/logo.png',
      },
    ];

    console.log(
      `uploading ${chalk.cyan(data.length)}  items to ${chalk.blueBright(
        'ipfs'
      )}`
    );

    const postsPromises = data.map(async (post) => {
      // upload to ipfs
      const body = '...';
      const name = post.title;

      const data = {
        version: '1.0.0',
        metadata_id: uuidv4(),
        description: `${body}`,
        content: `${body}`,
        name,
        attributes: [
          {
            traitType: 'type',
            value: 'post',
          },
        ],
        media: [],
        appId: 'demo demo',
      };

      const contentURI =
        'https://ipfs.io/ipfs/QmSsmQc3tUG2PceNUWYPw5bv4PEWfwsoim4ChL1HGKeUmu' ||
        (await uploadToIpfs(data));

      return {
        contentURI,
      };
    });

    const posts = await Promise.all(postsPromises);
    return posts;
  },
};
