import { cn } from '~/lib/utils';
import { MoveRight } from 'lucide-react';
import { HoverBorderGradient } from './ui/hover-border-gradiant';
import { FlipWords } from './ui/flip-words';
import PostShowcase from './PostShowcase';
import InfoCards from './InfoCards';
import PostShowcaseReverse from './PostShowcaseReverse';

const Landing = () => {
  const words = ['Boost', 'Your', 'Development'];

  return (
    <div className='space-y-44'>
      <section className='mx-auto max-w-6xl text-center tracking-tight'>
        <h1 className='xs:mt-24 font_lato mt-24 text-4xl font-bold sm:mt-28 sm:text-5xl lg:text-6xl lg:leading-tight'>
          Transform your coding path with advanced solutions and{' '}
          <span className='bg-gradient-to-tr from-red-500 to-blue-500 bg-clip-text text-transparent'>
            Support that&apos;ll
          </span>{' '}
          <br />
          <FlipWords duration={800} words={words} />
        </h1>

        <p
          className={cn(
            'dark:text-foreground-700 xs:mt-8 mx-auto mt-8 w-full max-w-3xl text-lg font-medium text-gray-300'
          )}
        >
          Experience rapid growth with Evolve As Dev, where we enhance and expedite your development
          journey with cutting-edge tools and guidance.
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

      <section className='space-y-64'>
        {/* <RecentPosts /> */}
        <PostShowcase />
        <PostShowcaseReverse />
      </section>

      <InfoCards />

      {/* 
      <ServiceShowcase />
      <DevRooms />
      <ContactForm /> */}
    </div>
  );
};

export default Landing;
