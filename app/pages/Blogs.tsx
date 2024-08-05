import { HeadersFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import FeaturedPost from '~/components/FeaturedPost';
import FilteredPosts from '~/components/FilteredPosts';
import TrendingPosts from '~/components/TrendingPosts';
import { cacheHeaders } from '~/config/app';
import { getFeaturedPost, getPosts } from '~/lib/hygraph';

export const headers: HeadersFunction = cacheHeaders();

export const loader = async () => {
  const featuredPostPromise = getFeaturedPost();
  const trendingPostsPromise = getPosts();

  const [featuredPost, trendingPosts] = await Promise.all([
    featuredPostPromise,
    trendingPostsPromise,
  ]);

  return json({
    featuredPost,
    trendingPosts,
  });
};

const Blogs = () => {
  const { featuredPost, trendingPosts } = useLoaderData<typeof loader>();

  if (!featuredPost || !trendingPosts) {
    return (
      <p className='text-destructive'>
        Failed to get the featured posts, might be an error. Please try again after sometime.
      </p>
    );
  }

  return (
    <>
      <section className='grid grid-cols-1 gap-6 md:grid-cols-[2.5fr,1fr]'>
        <FeaturedPost post={featuredPost} />
        <TrendingPosts posts={trendingPosts} />
      </section>

      <section className='mt-16'>
        <FilteredPosts />
      </section>
    </>
  );
};

export default Blogs;
