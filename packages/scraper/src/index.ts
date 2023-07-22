import 'dotenv/config';
import { prompt } from 'enquirer';
import { service as dribble } from './platforms/dribble';
import { Service } from 'shared-types';
import axios from 'axios';
import chalk from 'chalk';
import { createPosts, createUser } from './actions';
import fetch from 'cross-fetch';
// @ts-ignore
globalThis.fetch = fetch



const main = async () => {
  const response: any = await prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Name?',
    },
  ]);

  const { platform } = {
    platform: 'dribble',
  };
  const { name } = response;

  const service: Service = dribble;
  console.log(
    'creating user for ' +
      chalk.blue(`${name}`) +
      ` on platform ${chalk.red(platform)}...`
  );

  const { user, posts } = await service.sync({ name });

  let API_ENDPOINT = 'https://ethcc-web.vercel.app/api/convert';
  API_ENDPOINT = 'http://localhost:3000/api/convert';

  console.log(`creating user onchain`);
  const ctx = await createUser(user);
  console.log(`creating user ${chalk.green('done')}`);

  console.log(`creating ${posts.length} posts onchain`);
  await createPosts(posts, ctx);
  console.log(`creating posts ${chalk.green('done')}`);

  console.log(chalk.bgGreen('DONE'));
};

main();
