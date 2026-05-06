'use client';

import { PAGE_SIZE } from '@/shared/constants/pageSize';
import { useColumnCount } from '../hooks/useColumnCount';
import SkeletonCard from './SkeletonCard';

function RowGrid({
  columns,
  children,
}: {
  columns: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className='grid gap-6'
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {children}
    </div>
  );
}

export default function SkeletonGrid() {
  const columns = useColumnCount();
  const rowCount = Math.ceil(PAGE_SIZE / columns);

  return (
    <div className='mt-8 flex flex-col gap-6'>
      {Array.from({ length: rowCount }).map((_, i) => (
        <RowGrid key={i} columns={columns}>
          {Array.from({ length: columns }).map((_, j) => (
            <SkeletonCard key={j} />
          ))}
        </RowGrid>
      ))}
    </div>
  );
}
