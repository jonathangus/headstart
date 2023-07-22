import { PostsList } from "@/components/posts-list";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { PostEntity, UserEntity } from "shared-types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DownloadIcon } from "@radix-ui/react-icons";
import { AvatarIcon } from "@radix-ui/react-icons";
import { ClaimModal } from "@/components/claim-modal";

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
    <>
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
                <h1 className="text-2xl">{user.handle}</h1>
              </div>
              <h2 className="text-l">8.2 ETH earned</h2>
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
    </>
  );
};

export const getStaticProps = async () => {
  const user: UserEntity = {
    address: "0x7c66a8d8249D5544BeD506fEc44aE6643e6fF196",
    handle: "asdioio_dribble.test.lens",
    imageURI: "",
  };
  const posts: PostEntity[] = [
    {
      image: "https://cdn.anotherblock.io/logo.png",
      title:
        "brand identity lorem brand identity lorem brand identity lorem brand identity",
      handle: "mock_dribble.test.lens",
      mocked: true,
      postId: "asd",
      service: "dribbble",
    },
    {
      image: "https://cdn.anotherblock.io/logo.png",
      title:
        "brand identity lorem brand identity lorem brand identity lorem brand identity",
      handle: "mock_dribble.test.lens",
      mocked: true,
      postId: "asd",
      service: "dribbble",
    },
    {
      image: "https://cdn.anotherblock.io/logo.png",
      title:
        "brand identity lorem brand identity lorem brand identity lorem brand identity",
      handle: "mock_dribble.test.lens",
      mocked: true,
      postId: "asd",
      service: "dribbble",
    },
  ];

  return { props: { user, posts } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          profile: "asdioio_dribble",
        },
      },
    ],
    fallback: true, // false or "blocking"
  };
};

export default Page;
