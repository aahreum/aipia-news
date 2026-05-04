'use client';

import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useColumnCount } from './useColumnCount';
import { useNewsList } from './useNewsList';

const CARD_HEIGHT = 182;

export const useNewsVirtualizer = () => {
  const { stories, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useNewsList();
  const columns = useColumnCount();

  const listRef = useRef<HTMLDivElement>(null);
  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    if (!listRef.current) {
      return;
    }
    setScrollMargin(listRef.current.offsetTop ?? 0);
  }, []);

  const rowCount = Math.ceil(stories.length / columns);

  const virtualizer = useWindowVirtualizer({
    count: hasNextPage ? rowCount + 1 : rowCount,
    estimateSize: () => CARD_HEIGHT,
    scrollMargin,
    measureElement: (el) => el.getBoundingClientRect().height,
    overscan: 3,
  });

  const virtualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if (!lastItem) {
      return;
    }
    if (lastItem.index >= rowCount - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [rowCount, virtualItems, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    listRef,
    virtualizer,
    virtualItems,
    scrollMargin,
    rowCount,
    columns,
    stories,
    isPending,
    isFetchingNextPage,
  };
};
