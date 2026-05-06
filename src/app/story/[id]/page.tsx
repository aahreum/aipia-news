import { notFound } from 'next/navigation';
import BackToList from '@/features/news/ui/BackToList';
import ExternalLinkIcon from '@/shared/assets/icons/external-link.svg';
import { fetchStory } from '@/shared/lib/api';
import Button from '@/shared/ui/Button';
import { formatDate, toISODate } from '@/shared/utils/time';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = await fetchStory(Number(id));
  return { title: story ? `${story.title} | AIPIA News` : 'AIPIA News' };
}

export default async function DetailStory({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { id } = await params;
  const { tab } = await searchParams;
  const story = await fetchStory(Number(id));

  if (!story) {
    notFound();
  }

  const { id: storyId, title, by, time, score, url } = story;
  const linkUrl = url ?? `https://news.ycombinator.com/item?id=${storyId}`;
  const linkLabel = url ? '원문 보기' : 'HN에서 보기';

  return (
    <main className='py-8'>
      <nav aria-label='페이지 탐색' className='mb-8'>
        <BackToList tab={tab} />
      </nav>

      <article aria-labelledby='story-title'>
        <header className='mb-8 border-b border-gray-200 pb-8'>
          <h2
            id='story-title'
            className='mb-6 text-2xl leading-tight font-bold text-gray-900'>
            {title}
          </h2>

          <dl className='flex flex-col gap-3'>
            <div className='flex items-center gap-3'>
              <dt className='w-14 shrink-0 text-sm font-semibold text-gray-500'>
                작성자
              </dt>
              <dd className='text-sm text-gray-900'>{by}</dd>
            </div>

            <div className='flex items-center gap-3'>
              <dt className='w-14 shrink-0 text-sm font-semibold text-gray-500'>
                점수
              </dt>
              <dd
                className='inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-semibold text-primary'
                aria-label={`${score}점`}>
                {score}
              </dd>
            </div>

            <div className='flex items-center gap-3'>
              <dt className='w-14 shrink-0 text-sm font-semibold text-gray-500'>
                작성일
              </dt>
              <dd>
                <time
                  dateTime={toISODate(time)}
                  className='text-sm text-gray-900'>
                  {formatDate(time)}
                </time>
              </dd>
            </div>
          </dl>
        </header>

        <section aria-label='원문 링크'>
          <Button
            as='link'
            href={linkUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='gap-2'>
            {linkLabel}
            <ExternalLinkIcon aria-hidden='true' focusable='false' />
            <span className='sr-only'>(새 탭에서 열림)</span>
          </Button>
        </section>
      </article>
    </main>
  );
}
