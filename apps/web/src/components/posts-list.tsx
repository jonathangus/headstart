import { PostEntity } from 'shared-types';
import { PostCard } from './post-card';

type Props = {
  items: PostEntity[];
};

export function PostsList({ items }: Props) {
  console.log(items);
  return (
    <div className="grid grid-cols-3 gap-8">
      {items.map((post, i) => (
        <PostCard post={post} key={i} />
      ))}
    </div>
  );
}
