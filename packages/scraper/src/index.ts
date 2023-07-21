import 'dotenv/config';
import { prompt } from 'enquirer';
import { service as dribble } from './dribble';
import { Service } from 'shared-types';
import axios from 'axios';

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

  const service: Service = dribble;

  const user = await service.getUser({});
  const posts = await service.getPosts({});

  console.log(posts);

  // const API_ENDPOINT = '';
  // await axios.post(API_ENDPOINT, {
  //   user,
  //   posts,
  // });
};

main();
