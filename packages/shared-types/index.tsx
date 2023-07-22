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
  getUser: (args: any) => Promise<UserObject>;
  getPosts: (args: any) => Promise<PostObject[]>;
};

export type PostEntity = {
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
