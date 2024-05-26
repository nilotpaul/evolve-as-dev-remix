import Container from '~/components/Container';
import Footer from '~/components/Footer';
import Landing from '~/components/Landing';
import Navbar from '~/components/nav/Navbar';

const Marketing = () => {
  return (
    <>
      <Navbar />

      <Container className='mt-24'>
        <Landing />
      </Container>

      <Footer className='mt-32' />
    </>
  );
};

export default Marketing;
