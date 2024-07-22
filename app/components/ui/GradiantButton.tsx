import { cn } from '~/lib/utils';
import { Button } from './button';

type GradiantButtonProps = {
  children: React.ReactNode;
  classNames?: {
    outerDiv?: string;
    button?: string;
  };
};

const GradiantButton = ({ children, classNames }: GradiantButtonProps) => {
  return (
    <div
      className={cn(
        'mr-auto mt-2 w-[80%] rounded-full bg-gradient-to-tr from-[#fe7587] to-blue-500 p-1',
        classNames?.outerDiv
      )}
    >
      <Button
        variant='outline'
        className={cn(
          'w-full rounded-full text-base font-medium tracking-widest',
          classNames?.button
        )}
      >
        {children}
      </Button>
    </div>
  );
};

export default GradiantButton;
