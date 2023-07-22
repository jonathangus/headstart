export type Context = {
  id: string;
};

export type UserObject = {
  handle: string;
  imageURI: string;
};

export type PostObject = {
  contentURI: string;
};

export type Service = {
  sync: (args: any) => Promise<{
    user: UserObject;
    posts: PostObject[];
  }>;
};

export type PostEntity = {
  publicationId: any;
  image: string;
  title: string;
  handle: string;
  postId: string;
  mocked: boolean;
  service: string;
};

export type UserEntity = {
  handle: string;
  imageURI: string;
  address: string;
};
