import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import NewsFeedSkeleton from '@/features/news/ui/NewsFeedSkeleton';
import NewsList from '@/features/news/ui/NewsList';
import TabBar from '@/features/news/ui/TabBar';
import { storiesQueryOptions } from '@/shared/lib/api';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(storiesQueryOptions('top'));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<NewsFeedSkeleton />}>
        <TabBar />
        <NewsList />
      </Suspense>
    </HydrationBoundary>
  );
}
