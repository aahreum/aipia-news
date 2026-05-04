import SkeletonBox from '@/shared/ui/SkeletonBox';

export default function DetailStoryLoading() {
  return (
    <main className='py-8'>
      <nav aria-label='페이지 탐색' className='mb-8'>
        <SkeletonBox className='h-5 w-32' />
      </nav>

      <article>
        <header className='mb-8 border-b border-gray-200 pb-8'>
          <SkeletonBox className='mb-6 h-[30px] w-full' />

          <dl className='flex flex-col gap-3'>
            <div className='flex items-center gap-3'>
              <dt className='w-14 shrink-0 text-sm font-semibold text-gray-500'>
                작성자
              </dt>
              <dd>
                <SkeletonBox className='h-6 w-24' />
              </dd>
            </div>
            <div className='flex items-center gap-3'>
              <dt className='w-14 shrink-0 text-sm font-semibold text-gray-500'>
                점수
              </dt>
              <dd>
                <SkeletonBox className='h-5 w-12 rounded-full' />
              </dd>
            </div>
            <div className='flex items-center gap-3'>
              <dt className='w-14 shrink-0 text-sm font-semibold text-gray-500'>
                작성일
              </dt>
              <dd>
                <SkeletonBox className='h-6 w-32' />
              </dd>
            </div>
          </dl>
        </header>

        <section>
          <SkeletonBox className='h-10 w-30 rounded-lg' />
        </section>
      </article>
    </main>
  );
}
