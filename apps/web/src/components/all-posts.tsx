<<<<<<< HEAD
import { usePostsQuery } from '@/hooks/use-posts-query';
import { PostsList } from './posts-list';
import { LensPost, PostEntity } from 'shared-types';
=======
import { usePostsQuery } from "@/hooks/use-posts-query";
import { PostsList } from "./posts-list";
>>>>>>> 7fae713f5fd7ae3809f5d5e27a743184f7817e5a

type Props = {
  realPosts: PostEntity[];
};

<<<<<<< HEAD
export function AllPosts({ realPosts }: Props) {
  const { data = [], isLoading } = usePostsQuery();

  const items = [...realPosts, ...data];
=======
  if (isLoading) {
    return <div>loading...</div>;
  }

>>>>>>> 7fae713f5fd7ae3809f5d5e27a743184f7817e5a
  return (
    <div>
      <PostsList items={items} />
    </div>
  );
}
