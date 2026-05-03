import { Suspense } from 'react';
import NewsList from '@/features/news/ui/NewsList';
import TabBar from '@/features/news/ui/TabBar';

export default function Home() {
  return (
    <>
      <Suspense>
        <TabBar />
      </Suspense>
      <NewsList />
    </>
  );
}
