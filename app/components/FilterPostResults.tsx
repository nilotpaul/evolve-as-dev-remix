import Heading from './ui/Heading';
import PostPreview from './PostPreview';
import GridWrapper from './ui/GridWrapper';
import { QueryResult } from '~/hooks/useFilterPosts';
import { Link } from '@remix-run/react';
import { createLinkToPost } from '~/lib/utils';
import PostLoading from './loadings/PostLoading';

const FilterPostResults = ({ data, isPending }: { data: QueryResult[]; isPending: boolean }) => {
  const filteredPosts = data.flatMap((p) => p.edges) || [];

  if (!filteredPosts || filteredPosts.length === 0) {
    return <p className='mt-3 text-lg text-gray-200'>No posts found.</p>;
  }

  return (
    <>
      <Heading>Results</Heading>

      <GridWrapper className='xl:grid-cols-3 xl:gap-8'>
        {!isPending ? (
          <>
            {filteredPosts.map(({ node: post }) => (
              <Link key={post.id} to={createLinkToPost(post)}>
                <PostPreview
                  excerpt={post.excerpt.text}
                  image={post.coverImg.url}
                  title={post.title}
                  thumbnail
                />
              </Link>
            ))}
          </>
        ) : (
          <PostLoading thumbnail />
        )}
      </GridWrapper>
    </>
  );
};

export default FilterPostResults;
