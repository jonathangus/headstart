import { usePostsQuery } from '@/hooks/use-posts-query';
import { PostsList } from './posts-list';

export function AllPosts() {
  const { data, isLoading } = usePostsQuery();

  return (
    <div>
      <PostsList items={data || []} />
    </div>
  );
}
