import Button from '@/shared/ui/Button';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center py-32 text-center'>
      <p className='text-8xl font-bold text-primary'>404</p>
      <p className='mt-4 text-sm text-gray-500'>페이지를 찾을 수 없습니다.</p>
      <Button as='link' href='/' className='mt-8'>
        메인으로 이동
      </Button>
    </div>
  );
}
