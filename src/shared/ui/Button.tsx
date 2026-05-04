import Link from 'next/link';
import { cn } from '@/shared/lib/cn';

type ButtonAsButton = {
  as?: 'button';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLink = {
  as: 'link';
} & React.ComponentPropsWithoutRef<typeof Link>;

type ButtonProps = (ButtonAsButton | ButtonAsLink) & {
  children: React.ReactNode;
  className?: string;
};

const baseClass =
  'inline-flex cursor-pointer items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40';

export default function Button({
  children,
  className,
  as,
  ...props
}: ButtonProps) {
  if (as === 'link') {
    return (
      <Link
        className={cn(baseClass, className)}
        {...(props as React.ComponentPropsWithoutRef<typeof Link>)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseClass, className)}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
