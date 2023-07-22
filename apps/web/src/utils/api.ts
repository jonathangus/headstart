import { request, gql } from 'graphql-request';
import { LensPost, PostEntity, UserEntity } from 'shared-types';

const postsQuery = gql`
  query GetPosts($profileIds: [ProfileId!]) {
    publications(
      request: { profileIds: $profileIds, publicationTypes: [POST], limit: 50 }
    ) {
      items {
        __typename
        ... on Post {
          id
          metadata {
            name
            description
            content
            image
            animatedUrl
          }
          profile {
            id
            name
            bio
            followNftAddress
            metadata
            handle
            ownedBy

            picture {
              ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
              }
              ... on MediaSet {
                original {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

const profilesQuery = gql`
  {
    profiles(first: 100) {
      id
      accountAddress
      ownedBy
      tokenId
      handle
      profileId
    }
  }
`;

export const getPosts = async (ids: string[]): Promise<PostEntity[]> => {
  const profileIds = ids.map((id) => '0x' + Number(id).toString(16));
  const data = await request('https://api-mumbai.lens.dev/', postsQuery, {
    profileIds,
  });

  return data.publications.items.map((item: LensPost) => {
    return {
      publicationId: item.id,
      image: item.metadata.image,
      title: item.metadata.content,
      handle: item.profile.handle,
      mocked: false,
      service: 'Dribbble',
    };
  });
};

export const getProfiles = async () => {
  const data = await request(
    'https://api.thegraph.com/subgraphs/name/0xpilou/ethcc-headstart',
    profilesQuery
  );

  return data.profiles;
};

export const getHomeData = async () => {
  const profiles = await getProfiles();
  const profileIds = profiles.map((profile) => profile.profileId);
  const posts = await getPosts(profileIds);

  return {
    profiles,
    posts,
  };
};

export const getProfile = async (handle: string): Promise<UserEntity> => {
  const query = gql`
    query Profile($handle: String!) {
      profiles(where: { handle: $handle }) {
        id
        accountAddress
        ownedBy
        tokenId
        handle
        profileId
      }
    }
  `;

  const data = await request(
    'https://api.thegraph.com/subgraphs/name/0xpilou/ethcc-headstart',
    query,
    { handle }
  );

  return data.profiles[0];
};

export const getPostsByUser = async (profileId: string): Promise<any> => {
  const query = gql`
    query GetPostsByUser($profileId: ProfileId!) {
      publications(
        request: { profileId: $profileId, publicationTypes: [POST], limit: 50 }
      ) {
        items {
          __typename
          ... on Post {
            id
            metadata {
              name
              description
              content
              image
              animatedUrl
            }
            profile {
              id
              name
              bio
              followNftAddress
              metadata
              handle
              ownedBy

              picture {
                ... on NftImage {
                  contractAddress
                  tokenId
                  uri
                  verified
                }
                ... on MediaSet {
                  original {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await request('https://api-mumbai.lens.dev/', query, {
    profileId,
  });

  return data.publications.items.map((item: LensPost) => {
    return {
      publicationId: item.id,
      image: item.metadata.image,
      title: item.metadata.content,
      handle: item.profile.handle,
      mocked: false,
      service: 'Dribbble',
    };
  });
};
