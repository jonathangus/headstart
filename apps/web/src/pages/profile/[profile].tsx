import { ClaimModal } from '@/components/claim-modal';
import { PostsList } from '@/components/posts-list';
import { WithdrawFunds } from '@/components/withdraw-funds';
import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { PostEntity, UserEntity } from 'shared-types';

type Props = {
  user: UserEntity;
  posts: PostEntity[];
};

const Page = (props: Props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>loading...</div>;
  }

  const { user, posts } = props;

  return (
    <div>
      <div>{user.handle}</div>
      <div>3 eth earned</div>
      <ClaimModal />
      <WithdrawFunds />

      <div>
        <PostsList items={posts} />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const user: UserEntity = {
    address: '0x7c66a8d8249D5544BeD506fEc44aE6643e6fF196',
    handle: 'asdioio_dribble.test.lens',
    imageURI: '',
  };
  const posts: PostEntity[] = [
    {
      image: 'https://cdn.anotherblock.io/logo.png',
      title:
        'brand identity lorem brand identity lorem brand identity lorem brand identity',
      handle: 'mock_dribble.test.lens',
      mocked: true,
      postId: 'asd',
      service: 'dribbble',
    },
    {
      image: 'https://cdn.anotherblock.io/logo.png',
      title:
        'brand identity lorem brand identity lorem brand identity lorem brand identity',
      handle: 'mock_dribble.test.lens',
      mocked: true,
      postId: 'asd',
      service: 'dribbble',
    },
  ];

  return { props: { user, posts } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          profile: 'asdioio_dribble',
        },
      },
    ],
    fallback: true, // false or "blocking"
  };
};

export default Page;
