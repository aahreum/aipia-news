import { useInfiniteQuery } from '@tanstack/react-query';
import { PAGE_SIZE } from '@/shared/constants/pageSize';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { fetchStory, fetchStoryIds } from '@/shared/lib/api';
import { StoryTab } from '@/shared/types/hackerNews';

export const useStories = (tab: StoryTab) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.stories, tab],
    queryFn: async ({ pageParam }) => {
      const allIds = await fetchStoryIds(tab);
      const pageIds = allIds.slice(
        pageParam * PAGE_SIZE,
        (pageParam + 1) * PAGE_SIZE,
      );
      return Promise.all(pageIds.map(fetchStory));
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    throwOnError: true,
  });
};
