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
  tokenId: string;
  id: string;
  accountAddress: string;
  ownedBy: string;
  profileId: string;
};

export type LensPost = {
  id: string;
  metadata: {
    name: string;
    description: string;
    content: string;
    image: string;
    animatedUrl?: string;
  };

  profile: {
    id: string;
    name: string;
    bio: string;
    followNftAddress: string;
    metadata: string;
    handle: string;
    ownedBy: string;
    picture: {
      original: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
};
