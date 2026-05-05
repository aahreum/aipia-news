import type { Metadata } from 'next';
import QueryProvider from '@/shared/providers/QueryProvider';
import './globals.css';
import Header from '@/shared/ui/Header';

export const metadata: Metadata = {
  title: 'AIPIA News',
  description: 'Hacker News의 Top, New, Best 스토리를 한눈에',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className='h-full antialiased'>
      <body className='flex min-h-full flex-col overflow-x-hidden px-4'>
        <Header />
        <div className='mx-auto w-full max-w-[1200px]'>
          <QueryProvider>{children}</QueryProvider>
        </div>
      </body>
    </html>
  );
}
