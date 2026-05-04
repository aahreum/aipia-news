'use client';

import { PAGE_SIZE } from '@/shared/constants/pageSize';
import { useNewsList } from '../hooks/useNewsList';
import NewsCard from './NewsCard';
import SkeletonCard from './SkeletonCard';

export default function NewsList() {
  const { stories, isPending, isFetchingNextPage, sentinelRef } = useNewsList();

  return (
    <>
      <ul
        className='mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
        aria-label='뉴스 목록'>
        {stories.map((item) => (
          <li key={item.id}>
            <NewsCard item={item} />
          </li>
        ))}
        {(isPending || isFetchingNextPage) &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <li key={`skeleton-${i}`}>
              <SkeletonCard />
            </li>
          ))}
      </ul>
      <div ref={sentinelRef} className='h-1' />
    </>
  );
}
