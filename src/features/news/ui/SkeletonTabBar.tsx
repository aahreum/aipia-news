import SkeletonBox from '@/shared/ui/SkeletonBox';

const TAB_COUNT = 3;

export default function SkeletonTabBar() {
  return (
    <div className='sticky top-18 z-10 flex w-full border-b border-gray-200 bg-white'>
      {Array.from({ length: TAB_COUNT }).map((_, i) => (
        <div key={i} className='flex flex-1 justify-center py-3'>
          <SkeletonBox className='h-4 w-8' />
        </div>
      ))}
    </div>
  );
}
