export default function SkeletonCard() {
  return (
    <div className='flex h-[158px] w-full animate-pulse gap-4 overflow-hidden rounded-2xl border border-gray-200 p-6'>
      <div className='h-full w-[102px] shrink-0 rounded-sm bg-gray-200' />
      <div className='flex flex-1 flex-col justify-center gap-2'>
        <div className='h-6 w-4/5 rounded bg-gray-200' />
        <div className='h-5.5 w-1/3 rounded bg-gray-200' />
        <div className='h-5.5 w-1/4 rounded bg-gray-200' />
      </div>
    </div>
  );
}
