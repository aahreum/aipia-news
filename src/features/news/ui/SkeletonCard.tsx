import SkeletonBox from '@/shared/ui/SkeletonBox';

export default function SkeletonCard() {
  return (
    <div className='flex h-[158px] w-full gap-4 overflow-hidden rounded-2xl border border-gray-200 p-6'>
      <SkeletonBox className='h-full w-[102px] shrink-0 rounded-lg' />
      <div className='flex flex-1 flex-col justify-center gap-2'>
        <SkeletonBox className='h-6 w-4/5' />
        <SkeletonBox className='h-4 w-1/3' />
        <SkeletonBox className='h-4 w-1/4' />
      </div>
    </div>
  );
}
