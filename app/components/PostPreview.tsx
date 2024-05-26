import Icons from '~/config/Icons';
import { cn } from '~/lib/utils';
import { format } from 'date-fns';
import { Post } from '~/types/blog-types';

type PostPreviewProps = {
  post: Post; // Change this to the actual post type later if required.
  thumbnail?: boolean;
};

const PostPreview = ({ post, thumbnail = true }: PostPreviewProps) => {
  const tags = [
    {
      name: 'tag1',
      path: '/tag1',
    },
    {
      name: 'tag2',
      path: '/tag2',
    },
    {
      name: 'tag3',
      path: '/tag3',
    },
  ];

  return (
    <article
      className={cn(
        'group flex cursor-pointer flex-col transition duration-300 hover:scale-[1.015]'
      )}
    >
      {thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          height={200}
          width={330}
          className='h-[200px] min-w-full rounded-md object-cover'
        />
      )}

      <h2
        className={cn(
          'group-hover:text-rose xs:text-2xl my-2 mt-4 text-xl font-bold transition-colors sm:text-xl'
        )}
      >
        {post.title}
      </h2>
      <p
        className='inline-flex gap-x-1.5 py-2 text-xs font-medium
        text-zinc-700 dark:text-zinc-400'
      >
        <Icons.Calender />
        <span className='flex space-x-2'>
          <span>{format(post.publishedDate, 'MMM dd, yyyy')}</span>
          <span>|</span>
          <span className='flex gap-x-1.5'>
            <Icons.Clock /> {post.readingTime} min read
          </span>
        </span>
      </p>

      <div className='my-3 mb-4 space-x-3'>
        {tags?.map((tag) => (
          <span
            key={tag.path}
            className='rounded-full bg-zinc-400 px-2.5 py-1 text-xs dark:bg-zinc-900'
          >
            {tag.name}
          </span>
        ))}
      </div>

      <p
        className={cn('line-clamp-2 text-sm text-zinc-700 dark:text-zinc-400', {
          'line-clamp-4 leading-normal': !thumbnail,
        })}
      >
        {post.description}
      </p>
    </article>
  );
};

export default PostPreview;
