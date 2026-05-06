import { PAGE_SIZE } from '@/shared/constants/pageSize';
import SkeletonCard from './SkeletonCard';

export default function SkeletonGrid() {
  return (
    <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: PAGE_SIZE }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
