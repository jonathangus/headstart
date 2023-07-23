import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { PostEntity, UserEntity } from 'shared-types';

import { ClaimModal } from '@/components/claim-modal';
import { PostsList } from '@/components/posts-list';
import { Skeleton } from '@/components/ui/skeleton';
import { WithdrawFunds } from '@/components/withdraw-funds';
import { ProfileContextProvider } from '@/context/profile-context';
import { SafeKitContextProvider } from '@/context/safe-kit-auth-context';
import { getPostsByUser, getProfile } from '@/utils/api';

import { Badge } from '@/components/ui/badge';
import { AvatarIcon } from '@radix-ui/react-icons';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

type Props = {
  user: UserEntity;
  posts: PostEntity[];
};

const Page = (props: Props) => {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div>
        <div className="flex items-center space-x-4 w-full mb-8">
          <Skeleton className="h-24 w-28 rounded-full" />
          <div className="space-y-4 w-full">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
        <div className="flex space-x-8 w-full  mb-8">
          <Skeleton className="h-64 w-64" />
          <Skeleton className="h-64 w-64" />
          <Skeleton className="h-64 w-64" />
        </div>
        <div className="flex space-x-8 w-full mb-8">
          <Skeleton className="h-64 w-64" />
          <Skeleton className="h-64 w-64" />
          <Skeleton className="h-64 w-64" />
        </div>
      </div>
    );
  }

  const { user, posts } = props;

  return (
    <>
      <SafeKitContextProvider>
        <ProfileContextProvider user={user}>
<<<<<<< HEAD
          <div className="flex justify-between w-full mb-16 items-start">
            <div className="flex flex-row gap-4 items-center p-2">
              <div className="gap-2">
                <h1 className="flex flex-row mb-4">
                  <AvatarIcon className="mr-2 h-16 w-16" />
=======
          <Card className="w-full mb-16">
            <CardContent className="flex justify-between p-4 items-start">
              <div className="flex flex-row gap-4 items-center p-2">
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>
                    {user.handle.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="gap-2">
                  <div className="flex flex-row gap-4">
                    <h1 className="text-2xl">{user.handle}.lens</h1>
                  </div>

                  <div className="text-xs mb-3 text-gray-500">
                    {user.accountAddress}
                  </div>
>>>>>>> e4ce6a670014220f7eaa4d3a4a7b5f76c3be64e8
                  <div>
                    <h1 className="text-3xl">{user.handle}.lens</h1>
                    <WithdrawFunds />
                  </div>
<<<<<<< HEAD
                </h1>
                <p className="text-m mb-3">
                  <ClaimModal />
                  <Badge className="mr-3 py-1 gap-2 pr-0 bg-neutral-100">
                    <span className="text-neutral-400">ERC-6551</span>
                    <Badge className="mr-1 p-1" variant="secondary">
                      {user.accountAddress}
=======

                  <p className="text-m mb-3">
                    <ClaimModal />
                    <Badge className="mr-3 py-1 gap-2 pr-0">
                      ERC-6551
                      <Badge className="mr-1 p-1" variant="secondary">
                        {user.accountAddress}
                      </Badge>
>>>>>>> e4ce6a670014220f7eaa4d3a4a7b5f76c3be64e8
                    </Badge>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <PostsList sameHeight items={posts || []} />
        </ProfileContextProvider>
      </SafeKitContextProvider>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const user = await getProfile(params.profile);

  if (!user) {
    return {
      notFound: true,
    };
  }

  const posts = await getPostsByUser(
    '0x' + Number(user.profileId).toString(16)
  );

  return { props: { user, posts }, revalidate: 5 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default Page;
