import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { format } from 'date-fns';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Separator } from '~/components/ui/separator';
import { getPostBySlug } from '~/lib/hygraph';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const category = params.category as string;
  const slug = params.slug as string;

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

  return json({ post });
};

const Post = () => {
  const { post } = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className='xs:mb-10 xs:text-4xl xs:leading-normal mb-6 text-3xl font-bold leading-normal'>
        {post.title}
      </h1>
      <p className='xs:text-base line-clamp-3 text-sm font-medium leading-relaxed sm:text-base md:leading-relaxed'>
        {post.excerpt.text}
      </p>

      <div className='mt-6 flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center'>
        <p className='xs:text-sm pb-4 pt-2 text-xs font-medium'>
          Published: {format(post.publishDate, 'MMM dd, yyyy')}
        </p>
        author info
      </div>
      <Separator className='mt-1 h-[0.5px] w-full' />

      <AspectRatio ratio={3 / 1.5} className='relative my-6'>
        <img
          src={post.coverImg.url}
          alt={post.title}
          className='h-full w-full rounded-md object-fill shadow-md shadow-zinc-400 dark:shadow-gray-900'
        />
      </AspectRatio>

      <div
        className='prose w-full max-w-full leading-loose dark:prose-invert'
        dangerouslySetInnerHTML={{
          __html: post.content.markdown,
        }}
      />

      <Separator className='mt-8 h-[0.5px] w-full' />

      <div className='mt-2'>share</div>

      <div className='mt-10 space-y-8'>comments postComment</div>
    </>
  );
};

export default Post;
