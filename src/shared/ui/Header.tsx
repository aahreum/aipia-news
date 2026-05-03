import Link from 'next/link';

export default function Header() {
  return (
    <header className='w-full'>
      <h1 className='sticky mx-auto w-full max-w-[1200px] pt-6 pb-4 text-2xl font-bold text-primary'>
        <Link href='/'>AIPIA News</Link>
      </h1>
    </header>
  );
}
