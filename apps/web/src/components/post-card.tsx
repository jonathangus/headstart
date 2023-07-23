import { HeartIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { PostEntity } from 'shared-types';
import { ExternalLinkIcon } from '@radix-ui/react-icons';

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
export function PostCard({ post, height }: Props) {
  const Wrapper = post.publicationId ? Link : 'div';
  return (
    <Card className="w-full overflow-hidden mb-4">
      <div>
        <CardHeader
          className={`p-0 ${height} justify-center overflow-hidden bg-neutral-100`}
        >
          <img className="h-full object-cover object-center" src={post.image} />
        </CardHeader>
        <CardContent className="p-6 pb-0">
          <CardDescription className="pb-2 text-neutral-400">
            <Link
              className="hover:text-black mb-2 block"
              href={`/profile/${post.handle}`}
            >
              <div>@ {post.handle}</div>
            </Link>
          </CardDescription>
          <CardTitle>{post.title}</CardTitle>
          {post.description && (
            <div className="mt-2 text-xs ">{post.description}</div>
          )}
        </CardContent>
      </div>
      <CardFooter className="gap-0 p-4 text-neutral-400">
        <CollectPost post={post} />
      </CardFooter>
    </Card>
  );
}
