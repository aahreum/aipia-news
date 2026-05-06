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
import { isStoryTab } from '@/shared/types/hackerNews';
import type { StoryTab } from '@/shared/types/hackerNews';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab: StoryTab = isStoryTab(tab) ? tab : 'top';

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(storiesQueryOptions(activeTab));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<NewsFeedSkeleton />}>
        <TabBar />
        <NewsList />
      </Suspense>
    </HydrationBoundary>
  );
}
