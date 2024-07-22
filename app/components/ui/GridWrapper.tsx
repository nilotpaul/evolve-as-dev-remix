import { cn } from '~/lib/utils';

type GridWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const GridWrapper = ({ children, className }: GridWrapperProps) => {
  return (
    <div className={cn('grid gap-8 sm:grid-cols-2 md:gap-x-16 md:gap-y-10', className)}>
      {children}
    </div>
  );
};

export default GridWrapper;
