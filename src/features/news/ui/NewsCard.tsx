import Image from 'next/image';
import Link from 'next/link';
import type { HackerNewsItem } from '@/shared/types/hackerNews';
import { formatDate, toISODate } from '@/shared/utils/time';

// TODO: 실제 데이터 연동 시 제거
const DUMMY: HackerNewsItem = {
  id: 42,
  title: 'Example Article Title',
  by: 'author',
  time: 1588291200,
  score: 100,
};

export default function NewsCard() {
  const { id, title, by, time } = DUMMY;

  return (
    <article className='w-full rounded-2xl border border-gray-200'>
      <Link
        href={`/story/${id}`}
        aria-label={`${title}, 작성자 ${by}, ${formatDate(time)}`}
        className='flex gap-4 p-6'>
        <Image
          src={`https://picsum.photos/seed/${id}/300/200`}
          alt={title}
          width={102}
          height={80}
          className='shrink-0 rounded-lg bg-gray-200 object-cover'
        />
        <div className='flex flex-col justify-center gap-2'>
          <h2 className='text-base font-bold text-gray-900'>{title}</h2>
          <p className='mt-1 text-sm text-gray-500'>{by}</p>
          <time dateTime={toISODate(time)} className='text-sm text-gray-500'>
            {formatDate(time)}
          </time>
        </div>
      </Link>
    </article>
  );
}
