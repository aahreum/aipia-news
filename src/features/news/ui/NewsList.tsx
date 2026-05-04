'use client';

import { PAGE_SIZE } from '@/shared/constants/pageSize';
import type { HackerNewsItem } from '@/shared/types/hackerNews';
import { useNewsVirtualizer } from '../hooks/useNewsVirtualizer';
import NewsCard from './NewsCard';
import SkeletonCard from './SkeletonCard';

type RowGridProps = {
  columns: number;
  children: React.ReactNode;
};

function RowGrid({ columns, children }: RowGridProps) {
  return (
    <div
      className='grid gap-6'
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {children}
    </div>
  );
}

type NewsRowProps = {
  rowStories: HackerNewsItem[];
  preload: boolean;
};

function NewsRow({ rowStories, preload }: NewsRowProps) {
  return rowStories.map((item) => (
    <div key={item.id} role='listitem'>
      <NewsCard item={item} preload={preload} />
    </div>
  ));
}

type SkeletonRowProps = {
  columns: number;
};

function SkeletonRow({ columns }: SkeletonRowProps) {
  return Array.from({ length: columns }).map((_, i) => (
    <SkeletonCard key={i} />
  ));
}

export default function NewsList() {
  const {
    listRef,
    virtualizer,
    virtualItems,
    scrollMargin,
    rowCount,
    columns,
    stories,
    isPending,
  } = useNewsVirtualizer();

  if (isPending) {
    const skeletonRowCount = Math.ceil(PAGE_SIZE / columns);
    return (
      <div ref={listRef} className='mt-8 flex flex-col gap-6'>
        {Array.from({ length: skeletonRowCount }).map((_, i) => (
          <RowGrid key={i} columns={columns}>
            <SkeletonRow columns={columns} />
          </RowGrid>
        ))}
      </div>
    );
  }

  return (
    <div ref={listRef} className='mt-8'>
      <div
        role='list'
        aria-label='뉴스 목록'
        className='relative'
        style={{ height: virtualizer.getTotalSize() }}>
        {virtualItems.map((virtualRow) => {
          const isLoaderRow = virtualRow.index > rowCount - 1;
          const rowStories = stories.slice(
            virtualRow.index * columns,
            (virtualRow.index + 1) * columns,
          );

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              className='absolute top-0 left-0 w-full pb-6'
              style={{
                transform: `translateY(${virtualRow.start - scrollMargin}px)`,
              }}>
              <RowGrid columns={columns}>
                {isLoaderRow ? (
                  <SkeletonRow columns={columns} />
                ) : (
                  <NewsRow
                    rowStories={rowStories}
                    preload={virtualRow.index === 0}
                  />
                )}
              </RowGrid>
            </div>
          );
        })}
      </div>
    </div>
  );
}
