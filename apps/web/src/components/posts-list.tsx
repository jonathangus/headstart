import { PostEntity } from 'shared-types';
import { PostCard } from './post-card';

type Props = {
  items: PostEntity[];
};

export function PostsList({ items }: Props) {
  return (
    <div>
      {items.map((post, i) => (
        <PostCard post={post} key={i} />
      ))}
    </div>
  );
}
