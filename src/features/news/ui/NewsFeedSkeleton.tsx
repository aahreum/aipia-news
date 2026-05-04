import { PAGE_SIZE } from '@/shared/constants/pageSize';
import SkeletonCard from './SkeletonCard';
import SkeletonTabBar from './SkeletonTabBar';

export default function NewsFeedSkeleton() {
  return (
    <>
      <SkeletonTabBar />
      <ul className='mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <li key={i}>
            <SkeletonCard />
          </li>
        ))}
      </ul>
    </>
  );
}
