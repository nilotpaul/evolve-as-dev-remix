import { MessageCircleMoreIcon } from 'lucide-react';
import GradiantCard from './ui/GradiantCard';

const InfoCards = () => {
  return (
    <div className='grid grid-cols-3 gap-6'>
      {Array(6)
        .fill(0)
        .map((_, idx) => (
          <GradiantCard
            key={idx}
            title='Source of truth'
            HeaderIcon={() => <MessageCircleMoreIcon className='h-10 w-10' />}
          >
            Unify all feedback from all sources in a matter of few minutes to get the most
            comprehensive voice of your customer.
          </GradiantCard>
        ))}
    </div>
  );
};

export default InfoCards;
