import { PostEntity } from 'shared-types';

import { PostCard } from './post-card';

type Props = {
  items: PostEntity[];
  sameHeight?: boolean;
};

export function PostsList({ items, sameHeight }: Props) {
  const getHeight = (i) => {
    if (sameHeight) {
      return 'h-[275px]';
    }

    if (i % 4 === 0) {
      return 'h-[200px]';
    } else if (i % 3 === 0) {
      return 'h-[320px]';
    }

    return 'h-[275px]';
  };

  return (
    <div className="columns-2 md:columns-3 lg:columns-4">
      {items.map((post, i) => (
        <PostCard post={post} key={i} height={getHeight(i)} />
      ))}
    </div>
  );
}
