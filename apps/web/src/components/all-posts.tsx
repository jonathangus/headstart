import { PostEntity } from 'shared-types';

import { usePostsQuery } from '@/hooks/use-posts-query';

import { PostsList } from './posts-list';

type Props = {
  realPosts: PostEntity[];
};

export function AllPosts({ realPosts }: Props) {
  const { data = [], isLoading } = usePostsQuery();

  const items = [...realPosts, ...data].filter((post) => post.image);
  return (
    <div>
      <PostsList items={items} />
    </div>
  );
}
