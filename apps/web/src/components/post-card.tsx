import { PostEntity } from 'shared-types';

type Props = {
  post: PostEntity;
};
export function PostCard({ post }: Props) {
  return (
    <div>
      <img src={post.image} />
      <h2>{post.title}</h2>
      <div className="flex">
        <div>358 collects</div>
        <div>by: {post.handle}</div>
        <div>original account: eriko</div>
      </div>
    </div>
  );
}
