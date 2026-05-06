import Image from 'next/image';
import Link from 'next/link';
import type { HackerNewsItem } from '@/shared/types/hackerNews';
import { formatDate, toISODate } from '@/shared/utils/time';

interface NewsCardProps {
  item: HackerNewsItem;
  preload?: boolean;
}

export default function NewsCard({ item, preload = false }: NewsCardProps) {
  const { id, title, by, time } = item;

  return (
    <article className='h-[158px] w-full rounded-2xl border border-gray-200'>
      <Link
        href={`/story/${id}`}
        aria-label={`${title}, 작성자 ${by}, ${formatDate(time)}`}
        className='flex h-full gap-4 p-6'>
        <div className='relative h-full w-[102px] shrink-0'>
          <Image
            src={`https://picsum.photos/seed/${id}/300/200`}
            alt={title}
            fill
            quality={60}
            sizes='102px'
            preload={preload}
            placeholder='blur'
            blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
            className='rounded-lg object-cover'
          />
        </div>
        <div className='flex flex-col justify-center gap-2'>
          <h2 className='line-clamp-2 text-base font-bold text-gray-900'>
            {title}
          </h2>
          <p className='mt-1 text-sm text-gray-500'>{by}</p>
          <time dateTime={toISODate(time)} className='text-sm text-gray-500'>
            {formatDate(time)}
          </time>
        </div>
      </Link>
    </article>
  );
}
