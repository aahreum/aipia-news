import SkeletonGrid from './SkeletonGrid';
import SkeletonTabBar from './SkeletonTabBar';

export default function NewsFeedSkeleton() {
  return (
    <>
      <SkeletonTabBar />
      <SkeletonGrid />
    </>
  );
}
