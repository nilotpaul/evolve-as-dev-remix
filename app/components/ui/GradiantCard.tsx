import { Card, CardContent, CardHeader, CardTitle } from './card';

type GradiantCardProps = {
  HeaderIcon: React.ComponentType<any>;
  title: string;
  children: React.ReactNode;
};

const GradiantCard = ({ HeaderIcon, children, title }: GradiantCardProps) => {
  return (
    <div className='rounded-xl rounded-t-sm bg-gradient-to-l from-[#fe7587] to-blue-500 pt-1'>
      <Card className='min-h-[285px] rounded-t-none bg-[#1b1724] p-1.5 py-3'>
        <CardHeader>
          <CardTitle className='flex flex-col gap-y-6 text-xl'>
            <HeaderIcon />
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className='-mt-2 font-light leading-loose text-neutral-300'>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default GradiantCard;
