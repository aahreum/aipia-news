import { cn } from '@/shared/lib/cn';

export default function SkeletonBox({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded bg-gray-200', className)} />;
}
