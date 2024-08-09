import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { format } from 'date-fns';
import Author from '~/components/Author';
import Mdx from '~/components/mdx/Mdx';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Separator } from '~/components/ui/separator';
import { getPostBySlug } from '~/lib/hygraph';
import { type Post } from '~/types/blog-types';
import { parseMarkdown } from '~/lib/markdown';
import SharePost from '~/components/SharePost';
import getUrl from '~/lib/utils';
import { useMounted } from '~/hooks/useMounted';
import Comments from '~/components/Comments';
import PostComment from '~/components/PostComment';
import { useSession } from '~/hooks/useAuth';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const category = params.category as string;
  const slug = params.slug as string;

  try {
    const post = await getPostBySlug({
      category,
      slug,
    });

    if (!post) {
      throw new Response(null, {
        status: 404,
        statusText: "This Post doesn't exist",
      });
    }

    const code = await parseMarkdown(post.content);
    return json({ post, code: String(code) });
  } catch (err) {
    if (err instanceof Response) {
      throw err;
    }

    console.error('error while fetching post', err);
    return json({ post: null as Post | null, code: '' });
  }
};

const Post = () => {
  const { post, code } = useLoaderData<typeof loader>();
  const { session } = useSession();

  const isMounted = useMounted();

  if (!post || !code) {
    return (
      <p className='text-lg text-destructive'>
        Something went wrong. Please report this issue or try again later.
      </p>
    );
  }

  return (
    <>
      <h1 className='xs:mb-10 xs:text-4xl xs:leading-normal mb-6 text-3xl font-bold leading-normal'>
        {post.title}
      </h1>
      <p className='xs:text-base line-clamp-3 text-sm font-medium leading-relaxed sm:text-base md:leading-relaxed'>
        {post.excerpt.text}
      </p>

      <div className='mt-6 flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center'>
        <p className='pb-4 pt-2 text-sm font-medium'>
          Published: {format(post.publishDate, 'MMM dd, yyyy')}
        </p>

        <Author
          name={post.author}
          image='/favicon.ico'
          date={new Date(post.publishDate)}
          classNames={{
            name: 'text-black dark:text-white',
            date: 'text-zinc-600 dark:text-zinc-400',
          }}
        />
      </div>
      <Separator className='mt-1 h-[0.5px] w-full' />

      <AspectRatio ratio={16 / 9} className='mt-6'>
        <img
          className='rounded-md object-cover shadow-md shadow-zinc-400 dark:shadow-gray-900'
          src={post.coverImg.url}
          alt={post.title}
        />
      </AspectRatio>

      <Mdx className='mt-12 font-medium dark:font-normal' code={code} showToc />

      <Separator className='mt-8 h-[0.5px] w-full' />

      {isMounted && (
        <div className='mt-2'>
          <SharePost
            text='Hey check out this post.'
            url={getUrl(`/categories/${post.category[0]}/${post.slug}`)}
          />
        </div>
      )}

      <div className='mt-10 max-w-2xl space-y-8'>
        <Comments blogId={post.id} userId={session?.id} />
        {session && <PostComment blogId={post.id} userId={session.id} />}
      </div>
    </>
  );
};

export default Post;
