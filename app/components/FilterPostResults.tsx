import { SearchResult } from '~/types/blog-types';
import Heading from './ui/Heading';
import PostPreview from './PostPreview';
import { Fragment } from 'react';
import GridWrapper from './ui/GridWrapper';

const FilterPostResults = ({ filteredPosts }: { filteredPosts?: SearchResult[] }) => {
  if (!filteredPosts || filteredPosts.length === 0) {
    return <p className='mt-3 text-lg text-gray-200'>No posts found.</p>;
  }

  return (
    <>
      <Heading>Results</Heading>

      <GridWrapper className='xl:grid-cols-3 xl:gap-8'>
        {filteredPosts.map((post) => (
          <Fragment key={post.id}>
            <PostPreview
              excerpt={post.excerpt.text}
              image={post.coverImg.url}
              title={post.title}
              thumbnail
            />
          </Fragment>
        ))}
      </GridWrapper>
    </>
  );
};

export default FilterPostResults;
