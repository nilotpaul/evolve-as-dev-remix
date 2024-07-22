import { format } from 'date-fns';
import GradiantButton from './ui/GradiantButton';

const PostShowcase = () => {
  const post = {
    title: 'Surface the insights that matter',
    thumbnail: '/post-thumbnail.png',
    description:
      'Enterpret helps us have a holistic view. We can actually understand: “What are the broader sentiments? What are our users saying?',
    readingTime: 5,
    publishedDate: '2024-05-20T12:00:00.000Z',
    author: {
      image: 'https://avatars.githubusercontent.com/u/71167911?v=4',
      name: 'Dexter',
    },
  };

  return (
    <article className='mt-12 grid grid-cols-[50%,40%] place-content-between'>
      <div className='relative h-[550px] w-[500px] rounded-xl bg-gradient-to-b from-[#fe7587] to-blue-500 pl-8 pt-12'>
        <img
          src={post.thumbnail}
          alt={post.title}
          height={550}
          width={500}
          className='h-full w-full rounded-br-lg rounded-tl-lg object-cover shadow-2xl shadow-black brightness-75'
        />
        <img
          src={'/main.png'}
          alt={'test'}
          className='absolute -bottom-20 -right-20 h-[200px] w-[400px] rounded-lg object-cover shadow-xl shadow-black brightness-95'
        />

        <div
          aria-disabled='true'
          className='absolute -right-12 top-1/2 -z-50 mt-12 h-80 w-32 -translate-y-1/2 rounded-r-full bg-[#fe7587] opacity-90 blur-3xl brightness-[.75]'
        />
      </div>

      <div className='mt-32 flex h-full flex-col gap-7'>
        <span className='font-semibold tracking-widest text-blue-500'>
          {format(post.publishedDate, 'mo MMM, yy')}
        </span>
        <h2 className='text-4xl font-bold'>{post.title}</h2>
        <p className='text-lg'>&quot;{post.description}&quot;</p>

        <div className='flex items-center gap-3'>
          <img
            src={post.author.image}
            alt={post.author.name}
            className='rounded-full'
            height={65}
            width={65}
          />
          <div>
            <span>{post.author.name}</span>
            <p>Global VP of Customer Experience</p>
          </div>
        </div>

        <GradiantButton>Read this article</GradiantButton>
      </div>
    </article>
  );
};

export default PostShowcase;
