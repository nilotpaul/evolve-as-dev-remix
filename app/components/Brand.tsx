import { Link } from '@remix-run/react';
import { useTheme } from './ThemeProvider';
import { ComponentProps } from 'react';

import { Skeleton } from './ui/skeleton';
import { cn } from '~/lib/utils';

type BrandProps = {
  className?: string;
  textClassName?: string;
  linkDisabled?: boolean;
} & Omit<ComponentProps<typeof Link>, 'to'>;

const Brand = ({ className, textClassName, linkDisabled = false, ...props }: BrandProps) => {
  const { theme } = useTheme();

  if (linkDisabled) {
    return (
      <div
        className={cn('xs:text-base flex items-center justify-center text-sm font-bold', className)}
      >
        {theme ? (
          <img
            src={theme === 'dark' ? '/logo-dark.png' : '/logo-light.png'}
            alt='Evolve As Dev'
            width={45}
            height={45}
            className='-mt-[2px] mr-1.5'
          />
        ) : (
          <Skeleton aria-label='Evolve As Dev' className='h-10 w-14 bg-transparent pl-3' />
        )}

        <h1
          className={cn(
            'font_roboto my-0 mr-3 space-x-1 pl-1.5 uppercase dark:text-zinc-200 sm:text-[0.95rem]',
            textClassName
          )}
        >
          <span>E</span>
          <span className='bg-gradient-to-tr from-red-500 to-blue-500 bg-clip-text text-transparent'>
            Dev
          </span>
        </h1>
      </div>
    );
  }

  return (
    <Link
      {...props}
      to='/'
      className={cn('xs:text-base flex items-center justify-center text-sm font-bold', className)}
    >
      {theme ? (
        <img
          src={theme === 'dark' ? '/logo-dark.png' : '/logo-light.png'}
          alt='Evolve As Dev'
          width={45}
          height={45}
          className='-mt-[2px] mr-1.5'
        />
      ) : (
        <Skeleton aria-label='Evolve As Dev' className='h-10 w-14 bg-transparent pl-3' />
      )}

      <h1
        className={cn(
          'font_roboto my-0 mr-3 space-x-1 pl-1.5 uppercase dark:text-zinc-200 sm:text-[0.95rem]',
          textClassName
        )}
      >
        <span>E</span>
        <span className='bg-gradient-to-tr from-red-500 to-blue-500 bg-clip-text text-transparent'>
          Dev
        </span>
      </h1>
    </Link>
  );
};

export default Brand;
