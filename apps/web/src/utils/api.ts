import { request, gql } from 'graphql-request';
import { LensPost, PostEntity } from 'shared-types';

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
  console.log(profileIds);
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
  console.log({ profiles });
  const profileIds = profiles.map((profile) => profile.profileId);
  const posts = await getPosts(profileIds);

  return {
    profiles,
    posts,
  };
};
