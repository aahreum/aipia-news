'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg';

interface BackToListProps {
  tab?: string;
}

export default function BackToList({ tab }: BackToListProps) {
  const router = useRouter();
  const fromListRef = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem('fromList')) {
      fromListRef.current = true;
      sessionStorage.removeItem('fromList');
    }
  }, []);

  const handleClick = () => {
    if (fromListRef.current) {
      router.back();
    } else {
      router.push(tab ? `/?tab=${tab}` : '/');
    }
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className='inline-flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-primary'>
      <ArrowLeftIcon aria-hidden='true' focusable='false' />
      목록으로 돌아가기
    </button>
  );
}
