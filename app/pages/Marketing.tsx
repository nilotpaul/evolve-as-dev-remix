import Container from '~/components/Container';
import Footer from '~/components/Footer';
import Landing from '~/components/Landing';
import Navbar from '~/components/nav/Navbar';

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
