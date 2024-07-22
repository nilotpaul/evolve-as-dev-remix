import { Separator } from './separator';
import { cn } from '~/lib/utils';

type HeadingProps = {
  classNames?: {
    h1?: string;
    separator?: string;
  };
} & Omit<JSX.IntrinsicElements['h1'], 'className'>;

const Heading = ({ classNames, children, ...props }: HeadingProps) => {
  return (
    <h1 {...props} className={cn('xs:text-4xl w-fit text-3xl font-bold', classNames?.h1)}>
      {children}
      <Separator className={cn('dark:bg-rose mt-1.5 h-px', classNames?.separator)} />
    </h1>
  );
};

export default Heading;
