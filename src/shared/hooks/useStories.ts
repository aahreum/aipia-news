import { useInfiniteQuery } from '@tanstack/react-query';
import { PAGE_SIZE } from '@/shared/constants/pageSize';
import { storiesQueryOptions } from '@/shared/lib/api';
import { StoryTab } from '@/shared/types/hackerNews';

export const useStories = (tab: StoryTab) => {
  return useInfiniteQuery({
    ...storiesQueryOptions(tab),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    throwOnError: true,
  });
};
