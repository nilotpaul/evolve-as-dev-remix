import { format } from 'date-fns';
import GradiantButton from './ui/GradiantButton';
import { cn } from '~/lib/utils';
import { LandingPost } from '~/types/blog-types';

type PostShowcaseProps = {
  type?: 'default' | 'reverse';
  shadowClassName?: string;
  outerDivClassName?: string;
  backgroundImage: string;
  post: LandingPost;
};

const PostShowcase = ({
  type = 'default',
  shadowClassName,
  outerDivClassName,
  backgroundImage,
  post,
}: PostShowcaseProps) => {
  return (
    <article className='mt-12 grid grid-cols-[50%,40%] place-content-between'>
      <div
        className={cn(
          'relative h-[550px] w-[500px] rounded-xl bg-gradient-to-b from-[#fe7587] to-blue-500 pl-8 pt-12',
          { 'order-2': type === 'reverse' },
          outerDivClassName
        )}
      >
        <img
          src={backgroundImage}
          alt={post.title}
          height={550}
          width={500}
          className='h-full w-full rounded-br-lg rounded-tl-lg object-cover shadow-2xl shadow-black brightness-75'
        />
        <img
          src={post.coverImg.url}
          alt={post.title}
          className={cn(
            'absolute -bottom-20 -right-20 h-[200px] w-[400px] rounded-lg object-cover shadow-xl shadow-black brightness-95',
            {
              '-left-20': type === 'reverse',
            }
          )}
        />

        <div
          aria-disabled='true'
          className={cn(
            'absolute -right-12 top-1/2 -z-50 mt-12 h-80 w-32 -translate-y-1/2 rounded-r-full bg-[#fe7587] opacity-90 blur-3xl brightness-[.75]',
            {
              '-left-8': type === 'reverse',
            },
            shadowClassName
          )}
        />
      </div>

      <div
        className={cn('mt-32 flex h-full max-w-[500px] flex-col gap-7', {
          'order-1': type === 'reverse',
        })}
      >
        <span className='font-semibold tracking-widest text-blue-500'>
          {format(post.publishDate, 'mo MMM, yy')}
        </span>
        <h2 className='text-4xl font-bold'>{post.title}</h2>
        <p className='text-lg'>&quot;{post.excerpt.text}&quot;</p>

        <div className='flex items-center gap-3'>
          {/* <img
            src={post.author}
            alt={post.author}
            className='rounded-full'
            height={65}
            width={65}
          /> */}
          <div className='capitalize'>
            <span>{post.author}</span>
            <p>Global VP of Customer Experience</p>
          </div>
        </div>

        <GradiantButton>Read this article</GradiantButton>
      </div>
    </article>
  );
};

export default PostShowcase;
