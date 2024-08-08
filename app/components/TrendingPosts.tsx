import { Link } from '@remix-run/react';
import { Separator } from './ui/separator';
import { FeaturedPost } from '~/types/blog-types';
import { createLinkToPost } from '~/lib/utils';

type TrendingPostsProps = {
  posts: FeaturedPost[];
};

const TrendingPosts = ({ posts }: TrendingPostsProps) => {
  return (
    <div className='space-y-2 md:space-y-0'>
      <span className='text-xs font-medium uppercase dark:text-zinc-400'>The Top</span>
      <h1 className='my-0 mt-1 text-xl font-semibold'>Trending Posts</h1>

      <div className='grid gap-x-4 sm:grid-cols-2 md:grid-cols-1'>
        {posts.slice(0, 4).map((post, index) => (
          <Link key={post.id} to={createLinkToPost(post)}>
            <article className='relative mt-4 flex cursor-pointer items-start gap-2 rounded-sm p-1 px-1.5 transition-colors hover:bg-zinc-300 dark:hover:bg-gray-900 sm:space-x-3'>
              <img
                src={post.coverImg.url}
                alt={post.title}
                height={65}
                width={60}
                className='h-[65px] w-[110px] rounded-sm object-cover shadow-lg shadow-zinc-400 dark:shadow-gray-900'
              />

              <div className='flex flex-col justify-between gap-2.5'>
                <span className='xs:text-sm text-xs font-medium uppercase text-violet-600 sm:text-xs'>
                  {post.category}
                </span>
                <h2 className='xs:text-[0.95rem] line-clamp-2 text-sm font-medium sm:text-sm'>
                  {post.title}
                </h2>

                {index !== 3 && <Separator className='hidden h-[0.5px] md:flex' />}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingPosts;
