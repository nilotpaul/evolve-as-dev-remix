import { type FeaturedPost } from '~/types/blog-types';
import { Card, CardFooter } from './ui/card';
import { Link } from '@remix-run/react';
import { createLinkToPost } from '~/lib/utils';

type FeaturedPostProps = {
  post: FeaturedPost;
};

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  return (
    <Link to={createLinkToPost(post)}>
      <Card className='shadow-purple_color/35 hover:shadow-purple_color relative flex min-h-[25rem] cursor-pointer flex-col justify-between border-0 shadow-xl transition-all duration-300 hover:scale-[0.99] sm:h-full'>
        <img
          className='absolute z-0 h-full w-full rounded-md object-cover shadow-md shadow-gray-400 dark:shadow-gray-900 dark:brightness-50'
          src={post.coverImg.url}
          alt={post.title}
        />

        <div aria-disabled='true' />

        <CardFooter className='relative z-10 flex flex-col items-start gap-6 sm:gap-0'>
          <h1 className='text-3xl font-bold leading-snug text-white shadow-2xl sm:w-3/4 sm:text-4xl'>
            {post.title}
          </h1>
          <p className='mt-4 line-clamp-3 w-2/3 text-sm leading-relaxed text-zinc-200'>
            {post.excerpt.text}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default FeaturedPost;
