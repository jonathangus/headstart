import { PostEntity } from 'shared-types';

import { PostCard } from './post-card';

type Props = {
  items: PostEntity[];
  sameHeight?: boolean;
};

export function PostsList({ items, sameHeight }: Props) {
  console.log(items);
  return (
    <div className="columns-2 md:columns-3 lg:columns-4">
      {items.map((post, i) => (
        <PostCard
          post={post}
          key={i}
          height={
            sameHeight ? 'h-[275px]' : i % 3 !== 0 ? 'h-[275px]' : 'h-[200px]'
          }
        />
      ))}
    </div>
  );
}
