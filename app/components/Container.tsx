import { cn } from '~/lib/utils';

type ContainerProps = {
  children: React.ReactNode;
} & JSX.IntrinsicElements['div'];

const Container = ({ className, children, ...props }: ContainerProps) => {
  return (
    <div {...props} className={cn('mx-auto max-w-7xl px-4 xl:px-0', className)}>
      {children}
    </div>
  );
};

export default Container;
