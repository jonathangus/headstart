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
  getUser: () => Promise<UserObject>;
  getPosts: () => Promise<PostObject[]>;
};
