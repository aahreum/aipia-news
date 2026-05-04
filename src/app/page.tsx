import { Suspense } from 'react';
import NewsFeedSkeleton from '@/features/news/ui/NewsFeedSkeleton';
import NewsList from '@/features/news/ui/NewsList';
import TabBar from '@/features/news/ui/TabBar';

export default function Home() {
  return (
    <Suspense fallback={<NewsFeedSkeleton />}>
      <TabBar />
      <NewsList />
    </Suspense>
  );
}
