import { Suspense } from 'react';
import NewsList from '@/features/news/ui/NewsList';
import TabBar from '@/features/news/ui/TabBar';

export default function Home() {
  return (
    // TODO: 스켈레톤 UI 적용하기
    <Suspense fallback={'불러오는 중'}>
      <TabBar />
      <NewsList />
    </Suspense>
  );
}
