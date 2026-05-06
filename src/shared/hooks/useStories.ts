import { useInfiniteQuery } from '@tanstack/react-query';
import { storiesQueryOptions } from '@/shared/lib/api';
import { StoryTab } from '@/shared/types/hackerNews';

export const useStories = (tab: StoryTab) => {
  return useInfiniteQuery({
    ...storiesQueryOptions(tab),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length : undefined,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    throwOnError: true,
  });
};
