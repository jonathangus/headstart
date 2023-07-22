import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { AllPosts } from '@/components/all-posts';
import { getHomeData, getProfiles } from '@/utils/api';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ profiles, posts }) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <AllPosts realPosts={posts} />
    </main>
  );
}

export const getStaticProps = async () => {
  const { profiles, posts } = await getHomeData();

  return {
    props: { profiles, posts },
  };
};
