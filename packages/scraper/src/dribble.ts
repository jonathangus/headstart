import { Service } from 'shared-types';
import axios from 'axios';

export const service: Service = {
  getUser: async () => {
    const user = {
      id: '123',
    };
    return user;
  },

  getPosts: async () => {
    const data = [
      {
        title: 'my input thing',
        image: 'https://cdn.anotherblock.io/logo.png',
      },
    ];

    const postsPromises = data.map(async (post) => {
      // upload to ipfs

      return {
        contentURI: '...',
      };
    });

    const posts = await Promise.all(postsPromises);
    return posts;
  },
};
