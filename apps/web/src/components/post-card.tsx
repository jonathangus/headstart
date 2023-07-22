import { HeartIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { PostEntity } from 'shared-types';

import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { CollectPost } from './collect-post';

type Props = {
  post: PostEntity;
};
export function PostCard({ post }: Props) {
  return (
    <Link href={`/profile/${post.handle}`}>
      <Card className="w-full overflow-hidden">
        <CardHeader className="p-0 max-h-[225px] justify-center overflow-hidden bg-neutral-100">
          <img src={post.image} />
        </CardHeader>
        <CardContent className="p-6 pb-0">
          <CardDescription className="pb-2 text-neutral-400">
            {post.handle}
          </CardDescription>
          <CardTitle>{post.title}</CardTitle>
        </CardContent>
        <CardFooter className="gap-0 p-4 text-neutral-400">
          <Button variant="ghost" className="p-2">
            <HeartIcon className="mr-2 h-4 w-4" /> like
          </Button>
          <Button variant="ghost" className="p-2">
            {/* <MagicWandIcon className="mr-2 h-4 w-4" /> tip */}
          </Button>
          <CollectPost post={post} />
        </CardFooter>
      </Card>
    </Link>
  );
}
