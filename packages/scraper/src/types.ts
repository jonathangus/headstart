export type Context = {
  id: string;
};

type UserObject = {};

type PostObject = {
  ipfsMetadata: string;
};

export type Service = {
  getUser: () => Promise<UserObject>;
  getPosts: () => Promise<PostObject[]>;
};
