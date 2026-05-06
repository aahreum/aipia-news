'use client';

import { useEffect, useState } from 'react';
import ArrowUpIcon from '@/shared/assets/icons/arrow-up.svg';
import Button from './Button';

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label='맨 위로 이동'
      className='fixed right-6 bottom-6 z-50 h-11 w-11 rounded-full p-0 shadow-lg'>
      <ArrowUpIcon aria-hidden='true' focusable='false' />
    </Button>
  );
}
