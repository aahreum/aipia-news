'use client';

import Button from '@/shared/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className='flex flex-col items-center justify-center py-32 text-center'>
      <p className='text-4xl font-bold text-primary'>오류가 발생했어요</p>
      <p className='mt-4 text-sm text-gray-500'>{error.message}</p>
      <Button onClick={reset} className='mt-8'>
        다시 시도
      </Button>
    </div>
  );
}
