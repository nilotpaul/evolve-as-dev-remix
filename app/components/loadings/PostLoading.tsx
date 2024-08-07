import { AspectRatio } from '../ui/aspect-ratio';
import { Skeleton } from '../ui/skeleton';

const PostLoading = ({ thumbnail = false }: { thumbnail?: boolean }) => {
  return (
    <article
      role='status'
      aria-live='polite'
      aria-busy='true'
      className='group flex cursor-pointer flex-col transition duration-300 hover:scale-[1.02]'
    >
      {thumbnail && (
        <AspectRatio ratio={3 / 1.5} className='relative'>
          <Skeleton className='h-full w-full' />
        </AspectRatio>
      )}

      <div className='mt-5 space-y-3'>
        <Skeleton className='h-2.5 w-full' />
        <Skeleton className='h-1.5 w-[75%]' />
      </div>
    </article>
  );
};

export default PostLoading;
