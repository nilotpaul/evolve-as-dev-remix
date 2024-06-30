import { cn } from '~/lib/utils';
import { MoveRight } from 'lucide-react';
import { HoverBorderGradient } from './ui/hover-border-gradiant';
import { FlipWords } from './ui/flip-words';
import RecentPosts from './RecentPosts';
import Heading from './ui/Heading';

const Landing = () => {
  const words = ['World', 'of', 'Stories'];

  return (
    <div className='space-y-44'>
      <section className='mx-auto max-w-6xl text-center tracking-tight'>
        <div className='xs:mt-24 mt-24 text-4xl font-extrabold sm:mt-28 sm:text-5xl lg:text-6xl lg:leading-[1.2]'>
          Welcome to{' '}
          <span>
            Evolve <span className='text-green-600/70'>As</span> Dev
          </span>
          <span>, Discover a</span> <br /> <FlipWords duration={500} words={words} />
        </div>

        <p
          className={cn(
            'dark:text-foreground-700 xs:mt-8 mx-auto mt-8 w-full max-w-3xl text-lg font-medium text-[#e9e7e7]'
          )}
        >
          Explore captivating books, from thrilling adventures to heartwarming tales, in our diverse
          library of boundless imagination crafted by talented authors.
        </p>

        <div className={cn('mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row')}>
          <HoverBorderGradient
            containerClassName='rounded-full'
            as='button'
            className='flex items-center space-x-2.5 bg-white py-3 text-black dark:bg-black dark:text-white'
          >
            <span>Start Exploring</span> <MoveRight className='h-5 w-5' />
          </HoverBorderGradient>
        </div>
      </section>

      <section>
        <Heading>Recent Articles</Heading>
        <RecentPosts />
      </section>

      {/* 
      <ServiceShowcase />
      <DevRooms />
      <ContactForm /> */}
    </div>
  );
};

export default Landing;
