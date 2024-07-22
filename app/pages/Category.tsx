import { HeadersFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';
import PostPreview from '~/components/PostPreview';
import GridWrapper from '~/components/ui/GridWrapper';
import Heading from '~/components/ui/Heading';
import { getPostsByTag } from '~/lib/hygraph';

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'max-age=604800, stale-while-revalidate=86400',
  };
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const category = params.category as string;

  const posts = await getPostsByTag(category);

  return json({ posts });
};

const Category = () => {
  const params = useParams();

  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className='space-y-6'>
      <Heading
        classNames={{
          h1: 'capitalize',
        }}
      >
        Posts for {params.category}
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
