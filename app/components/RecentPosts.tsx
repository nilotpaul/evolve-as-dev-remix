import { Post } from '~/types/blog-types';
import PostPreview from './PostPreview';
import { Link } from '@remix-run/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { config } from '~/config/app';

const RecentPosts = () => {
  // Mock post data
  const posts: Post[] = [
    {
      title: 'My First Post',
      thumbnail: '/post-thumbnail.png',
      description: 'This is my first post',
      readingTime: 5,
      publishedDate: '2024-05-20T12:00:00.000Z',
    },
    {
      title: 'My Second Post',
      thumbnail: '/post-thumbnail.png',
      description: 'This is my second post',
      readingTime: 3,
      publishedDate: '2024-05-19T12:00:00.000Z',
    },
    {
      title: 'My Third Post',
      thumbnail: '/post-thumbnail.png',
      description: 'This is my third post',
      readingTime: 4,
      publishedDate: '2024-05-18T12:00:00.000Z',
    },
    {
      title: 'My Fourth Post',
      thumbnail: '/post-thumbnail.png',
      description: 'This is my fourth post',
      readingTime: 6,
      publishedDate: '2024-05-17T12:00:00.000Z',
    },
    {
      title: 'My Fourth Post',
      thumbnail: '/post-thumbnail.png',
      description: 'This is my fourth post',
      readingTime: 6,
      publishedDate: '2024-05-17T12:00:00.000Z',
    },
    {
      title: 'My Fourth Post',
      thumbnail: '/post-thumbnail.png',
      description: 'This is my fourth post',
      readingTime: 6,
      publishedDate: '2024-05-17T12:00:00.000Z',
    },
  ];

  const plugin = useRef(
    Autoplay({
      delay: config.carouselDelay,
      playOnInit: true,
      stopOnInteraction: true,
      stopOnFocusIn: true,
    })
  );

  return (
    <>
      <Carousel
        opts={{
          loop: true,
          align: 'center',
          containScroll: 'trimSnaps',
          dragFree: true,
          skipSnaps: true,
        }}
        plugins={[plugin.current]}
        className='mt-16 w-full'
      >
        <CarouselContent>
          {posts.map((post, index) => (
            <CarouselItem
              key={index}
              className='mx-auto flex items-center justify-center sm:basis-1/2 md:basis-1/3 xl:basis-1/3'
            >
              <Link to='#'>
                <PostPreview post={post} />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='hidden lg:inline-flex' />
        <CarouselNext className='hidden lg:inline-flex' />
      </Carousel>
    </>
  );
};

export default RecentPosts;
