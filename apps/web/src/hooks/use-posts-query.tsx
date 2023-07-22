import { useQuery } from '@tanstack/react-query';

import { mockedItems } from '../mocked/mocked-items';

export const usePostsQuery = () => {
  return useQuery(['posts'], async () => {
    // fetch("..")

    return mockedItems;
  });
};
