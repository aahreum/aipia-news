import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
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

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return {
    stories: data?.pages.flat() ?? [],
    isPending,
    isFetchingNextPage,
    sentinelRef,
  };
};
