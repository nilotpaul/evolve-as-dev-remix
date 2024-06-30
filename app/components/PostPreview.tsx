import Icons from '~/config/Icons';
import { cn } from '~/lib/utils';
import { format } from 'date-fns';
import { Post } from '~/types/blog-types';

type PostPreviewProps = {
  post: Post; // Change this to the actual post type later if required.
};

const PostPreview = ({ post }: PostPreviewProps) => {
  return (
    <article
      className={cn(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.015]'
      )}
    >
      <div className='relative'>
        <img
          src={post.thumbnail}
          alt={post.title}
          height={200}
          width={330}
          className='transition-filter h-[200px] min-w-full object-cover blur-[0.25px] brightness-[0.65] filter duration-300 group-hover:brightness-50'
        />
        <div className='absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent p-4 transition-opacity duration-300'>
          <h2 className='text-xl font-bold text-white'>{post.title}</h2>
          <p className='inline-flex gap-x-1.5 py-2 text-xs font-medium text-gray-400'>
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
