import ContactForm from './ContactForm';
import DevRooms from './DevRooms';
import ServiceShowcase from './ServiceShowcase';
import { Button } from './ui/button';
import RecentPosts from './RecentPosts';

const Landing = () => {
  return (
    <>
      <div className='grid md:grid-cols-[minmax(300px,1.75fr)_minmax(350px,1.25fr)] sm:gap-x-8 md:gap-x-12'>
        <section className='prose dark:prose-invert max-w-2xl'>
          <h1>Landing Page</h1>
          <p className='font-semibold'>Some lorem paragraph bullshit</p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis expedita, voluptas,
            ea, aut distinctio laboriosam alias nemo sint facilis porro illo atque maiores
            voluptates dolorum a quisquam dicta iusto maxime.
          </p>

          <div className='flex items-center mt-12 gap-5'>
            <Button className='rounded-full font-semibold'>Get Started</Button>
            <Button variant='outline' className='rounded-full border-2'>
              See More
            </Button>
          </div>
        </section>

        <section className='justify-center hidden md:flex w-full'>
          <img
            src='/illustration-2.png'
            alt='Landing Illustration'
            className='object-contain max-w-full h-auto -mt-16'
          />
        </section>
      </div>

      <ServiceShowcase />
      <DevRooms />
      <RecentPosts />
      <ContactForm />
    </>
  );
};

export default Landing;
