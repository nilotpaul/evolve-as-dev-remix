import Icons from '~/config/Icons';
import { cn } from '~/lib/utils';
import { format } from 'date-fns';
import { Post } from '~/types/blog-types';

type PostPreviewProps = {
  post: Post; // Change this to the actual post type later if required.
  className?: string;
  imageClassName?: string;
  postTitleClassName?: string;
  postDetailsClassName?: string;
  format?: 'default' | 'center';
  image?: {
    h?: number | string;
    w?: number | string;
  };
};

const PostPreview = ({
  post,
  className,
  imageClassName,
  postDetailsClassName,
  postTitleClassName,
  format: postFormat = 'default',
  image = {
    h: 200,
    w: 400,
  },
}: PostPreviewProps) => {
  return (
    <article
      className={cn(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.015]',
        className
      )}
    >
      <div className='relative'>
        <img
          src={post.thumbnail}
          alt={post.title}
          height={image.h}
          width={image.w}
          className={cn(
            'transition-filter h-[250px] min-w-full object-cover blur-[0.25px] brightness-[0.65] filter duration-300 group-hover:brightness-50',
            imageClassName
          )}
        />
        <div
          className={cn(
            'absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent p-4 transition-opacity duration-300',
            { 'gap-2 p-10': postFormat === 'center' }
          )}
        >
          <h2 className={cn('text-xl font-bold text-white', postTitleClassName)}>{post.title}</h2>
          <p
            className={cn(
              'inline-flex gap-x-1.5 py-2 text-xs font-medium text-gray-400',
              postDetailsClassName
            )}
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
        </div>
      </div>
    </article>
  );
};

export default PostPreview;
