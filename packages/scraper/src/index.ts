import 'dotenv/config';
import { prompt } from 'enquirer';
import { service as dribble } from './dribble';
import { Service } from 'shared-types';
import axios from 'axios';
import chalk from 'chalk';

const main = async () => {
  //   const response = await prompt([
  //     {
  //       type: 'input',
  //       name: 'name',
  //       message: 'What is your name?',
  //     },
  //     {
  //       type: 'input',
  //       name: 'username',
  //       message: 'What is your username?',
  //     },
  //   ]);

  const { name, platform } = {
    platform: 'dribble',
    name: 'eriko',
  };

  const service: Service = dribble;
  console.log(
    'creating user for ' +
      chalk.blue(`${name}`) +
      ` on platform ${chalk.red(platform)}...`
  );

  const user = await service.getUser({});
  const posts = await service.getPosts({});

  let API_ENDPOINT = 'https://ethcc-web.vercel.app/api/convert';
  API_ENDPOINT = 'http://localhost:3000/api/convert';

  console.log('uploading to api...');
  await axios.post(API_ENDPOINT, {
    user,
    posts,
  });
  console.log(chalk.bgGreen('succesfully created user onchain'));
};

main();
