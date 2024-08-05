import { HeadersFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import PostPreview from '~/components/PostPreview';
import GridWrapper from '~/components/ui/GridWrapper';
import Heading from '~/components/ui/Heading';
import { cacheHeaders } from '~/config/app';
import { getPostsByCategory } from '~/lib/hygraph';

// Cache control headers for this category page.
export const headers: HeadersFunction = cacheHeaders();

// This loader will get all posts by category on the server.
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const category = params.category as string;

  const posts = await getPostsByCategory(category);
  if (!posts || posts.length === 0) {
    throw new Response(null, {
      status: 404,
      statusText: "This category doesn't exist",
    });
  }

  return json({ posts });
};

const Category = () => {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className='space-y-8'>
      <Heading
        classNames={{
          h1: 'capitalize',
        }}
      >
        Posts for {posts[0].category}
      </Heading>

      <GridWrapper>
        {posts.map((post) => (
          <Link key={post.id} to={`/categories/${post.category[0]}/${post.slug}`}>
            <PostPreview post={post} />
          </Link>
        ))}
      </GridWrapper>
    </div>
  );
};

export default Category;
