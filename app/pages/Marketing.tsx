import { json } from '@remix-run/node';
import Container from '~/components/Container';
import Footer from '~/components/Footer';
import Landing from '~/components/Landing';
import Navbar from '~/components/nav/Navbar';

import { getPostsForLanding } from '~/lib/hygraph';

export const loader = async () => {
  const posts = await getPostsForLanding();

  if (!posts || posts?.length === 0) {
    return json({ posts: [] });
  }
  return json(
    { posts },
    {
      headers: {
        // Cache for 3 hour(s)
        'Cache-Control': 'public, max-age=10800',
      },
    }
  );
};

const Marketing = () => {
  return (
    <>
      <Navbar />

      <Container className='mb-64 mt-40'>
        <Landing />
      </Container>

      <Footer className='mt-20' />
    </>
  );
};

export default Marketing;
