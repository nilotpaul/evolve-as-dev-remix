import { Outlet } from '@remix-run/react';
import Container from '~/components/Container';
import Footer from '~/components/Footer';
import Navbar from '~/components/nav/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />

      <Container className='mt-16'>
        <Outlet />
      </Container>

      <Footer className='mt-32' />
    </>
  );
};

export default Home;
