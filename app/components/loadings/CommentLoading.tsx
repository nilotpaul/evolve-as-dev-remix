import { Avatar, AvatarFallback } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

const CommentLoading = () => {
  return (
    <div className='mt-6' aria-busy='true' aria-live='polite' aria-describedby='Comments Loading'>
      <>
        <div className='mb-4 flex items-center gap-3'>
          <Avatar className='h-[30px] w-[30px]'>
            <AvatarFallback />
          </Avatar>

          <span className='text-sm font-semibold'>@...</span>
          <Skeleton className='h-2 w-32' />
        </div>
        <Skeleton className='h-2 w-full' />
        <Skeleton className='mt-2 h-2 w-[90%]' />
        <Skeleton className='mt-2 h-2 w-[75%]' />
      </>
    </div>
  );
};

export default CommentLoading;
