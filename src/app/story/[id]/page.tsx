import Link from 'next/link';
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg';
import ExternalLinkIcon from '@/shared/assets/icons/external-link.svg';
import type { HackerNewsItem } from '@/shared/types/hackerNews';
import Button from '@/shared/ui/Button';
import { formatDate, toISODate } from '@/shared/utils/time';

// TODO: api 연동 시 제거
const dummyStory: HackerNewsItem = {
  id: 43900226,
  title:
    'Show HN: I built an open-source AI-powered news aggregator in Next.js',
  by: 'johndoe',
  time: 1746316800,
  score: 342,
  url: 'https://example.com/my-project',
};

export default function DetailStory() {
  const { title, by, time, score, url } = dummyStory;

  return (
    <main className='py-8'>
      <nav aria-label='페이지 탐색' className='mb-8'>
        <Link
          href='/'
          className='inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-primary'>
          <ArrowLeftIcon aria-hidden='true' focusable='false' />
          목록으로 돌아가기
        </Link>
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

        {url && (
          <section aria-label='원문 링크'>
            <Button
              as='link'
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='gap-2'>
              원문 보기
              <ExternalLinkIcon aria-hidden='true' focusable='false' />
              <span className='sr-only'>(새 탭에서 열림)</span>
            </Button>
          </section>
        )}
      </article>
    </main>
  );
}
