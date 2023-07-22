import { PostsList } from '@/components/posts-list';
import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { PostEntity, UserEntity } from 'shared-types';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DownloadIcon } from '@radix-ui/react-icons';
import { AvatarIcon } from '@radix-ui/react-icons';
import { ClaimModal } from '@/components/claim-modal';
import { WithdrawFunds } from '@/components/withdraw-funds';
import { getPostsByUser, getProfile } from '@/utils/api';
import { ProfileContextProvider } from '@/context/profile-context';

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
      <ProfileContextProvider user={user}>
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
                <WithdrawFunds />
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <ClaimModal />
              {/* <Button variant="outline">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Withdraw earnings
            </Button> */}
            </div>
          </CardContent>
        </Card>

        <PostsList items={posts || []} />
      </ProfileContextProvider>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const user = await getProfile(params.profile);
  const posts = await getPostsByUser(
    '0x' + Number(user.profileId).toString(16)
  );

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
