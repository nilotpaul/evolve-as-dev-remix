import { MoveRight } from 'lucide-react';
import { HoverBorderGradient } from './ui/hover-border-gradiant';
import { FlipWords } from './ui/flip-words';
import PostShowcase from './PostShowcase';
import InfoCards from './InfoCards';
import GradiantInfoText from './GradiantInfoText';
import { Separator } from './ui/separator';

import { LandingPost } from '~/types/blog-types';
import { useLoaderData } from '@remix-run/react';

const backgroundImages = [
  './landing-post-background-1.png',
  './landing-post-background-2.png',
  './landing-post-background-3.png',
];

const Landing = () => {
  const words = ['Boost', 'Your', 'Development'];
  const { posts } = useLoaderData<{ posts: LandingPost[] }>();

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

        <p className='dark:text-foreground-700 xs:mt-8 mx-auto mt-8 w-full max-w-3xl text-lg font-medium text-gray-300'>
          Experience rapid growth with Evolve As Dev, where we enhance and expedite your development
          journey with cutting-edge tools and guidance.
        </p>

        <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
          <HoverBorderGradient
            containerClassName='rounded-full'
            as='button'
            className='flex items-center space-x-2.5 bg-white py-3 text-black dark:bg-black dark:text-white'
          >
            <span>Start Exploring</span> <MoveRight className='h-5 w-5' />
          </HoverBorderGradient>
        </div>
      </section>

      <section className='mx-auto max-w-4xl'>
        <Separator className='mb-16 h-[2.5px]' />
        <GradiantInfoText />
        <Separator className='mt-16 h-[2.5px]' />
      </section>

      <h3 className='mx-auto max-w-4xl text-center text-4xl font-bold leading-snug'>
        Leading customer feedback intelligence for product development teams
      </h3>
      <section className='space-y-64'>
        {/* <RecentPosts /> */}
        <PostShowcase
          backgroundImage={backgroundImages[0]}
          post={posts[0]}
          outerDivClassName='from-[#BF8858] to-[#007F76]'
        />
        <PostShowcase
          type='reverse'
          shadowClassName='bg-violet-500/80'
          backgroundImage={backgroundImages[1]}
          post={posts[1]}
          outerDivClassName='from-[#BFBFBF] to-[#44A9AC]'
        />
        <PostShowcase
          backgroundImage={backgroundImages[2]}
          post={posts[2]}
          outerDivClassName='from-[#BCBCBB] to-[#00BF80]'
        />
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
