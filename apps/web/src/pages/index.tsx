import { Inter } from 'next/font/google';

import { AllPosts } from '@/components/all-posts';
import { getHomeData } from '@/utils/api';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ profiles, posts }) {
  return <AllPosts realPosts={posts} />;
}

export const getStaticProps = async () => {
  const { profiles, posts } = await getHomeData();

  return {
    props: { profiles, posts },
    revalidate: 5,
  };
};
