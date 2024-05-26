import { useTheme } from './ThemeProvider';

import { Skeleton } from './ui/skeleton';
import { cn } from '~/lib/utils';

type BrandProps = {
  className?: string;
  textClassName?: string;
} & JSX.IntrinsicElements['div'];

const Brand = ({ className, textClassName, ...props }: BrandProps) => {
  const { theme } = useTheme();

  return (
    <div {...props} className={cn('xs:text-base flex items-center text-sm font-bold', className)}>
      {theme ? (
        <img
          src={theme === 'light' ? '/logo-light.png' : '/logo-dark.png'}
          alt='EVOLVE AS DEV'
          width={60}
          height={60}
          className='mb-[2px]'
        />
      ) : (
        <Skeleton className='h-10 w-14 bg-transparent pl-3' />
      )}

      <h1
        className={cn(
          'my-0 space-x-[3px] pl-3 text-[0.95rem] uppercase dark:text-zinc-200 sm:text-[0.95rem]',
          textClassName
        )}
      >
        <span>Evolve</span>
        <span className='text-red-500'>AS</span>
        <span>Dev</span>
      </h1>
    </div>
  );
};

export default Brand;
