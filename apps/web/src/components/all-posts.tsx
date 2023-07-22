import { usePostsQuery } from '@/hooks/use-posts-query';
import { PostsList } from './posts-list';
import { LensPost, PostEntity } from 'shared-types';

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
