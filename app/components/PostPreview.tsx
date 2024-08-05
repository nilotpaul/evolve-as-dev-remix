import { format } from 'date-fns';

import { CalendarIcon } from '@radix-ui/react-icons';
import { AspectRatio } from './ui/aspect-ratio';

type PostPreviewProps = {
  excerpt: string;
  title: string;
  image: string;
  thumbnail?: boolean;
};

const PostPreview = ({ thumbnail = true, ...post }: PostPreviewProps) => {
  return (
    <article className='group flex cursor-pointer flex-col transition duration-300 hover:scale-[1.02]'>
      {thumbnail && (
        <AspectRatio ratio={3 / 1.5} className='relative'>
          <img
            src={post.image}
            alt={post.title}
            className='h-full w-full rounded-md object-fill shadow-lg shadow-zinc-400 dark:shadow-gray-900'
          />
        </AspectRatio>
      )}

      <h2 className='xs:text-2xl mt-3 text-xl font-bold transition-colors group-hover:text-rose-500 sm:text-xl'>
        {post.title}
      </h2>
      <p
        className='inline-flex gap-x-1.5 py-2 text-xs font-medium
        text-zinc-700 dark:text-zinc-400'
      >
        <CalendarIcon />
        <span>{format(new Date(), 'MMM, dd, yyyy')}</span>
      </p>

      <p className='mt-4 line-clamp-3 text-sm text-zinc-700 dark:text-zinc-400'>{post.excerpt}</p>
    </article>
  );
};

export default PostPreview;
