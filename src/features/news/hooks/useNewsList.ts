import { useSearchParams } from 'next/navigation';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useStories } from '@/shared/hooks/useStories';
import type { StoryTab } from '@/shared/types/hackerNews';

export const useNewsList = () => {
  const searchParams = useSearchParams();
  const tab = (
    searchParams.get('tab') ?? QUERY_KEYS.top
  ).toLowerCase() as StoryTab;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useStories(tab);

  return {
    stories: data?.pages.flat() ?? [],
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
};
