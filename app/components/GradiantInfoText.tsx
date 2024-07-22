import { Link } from '@remix-run/react';

const GradiantInfoText = () => {
  return (
    <div className='mx-auto flex h-52 items-center justify-between gap-8'>
      <div
        aria-disabled='true'
        className='h-full w-3 rounded-full bg-gradient-to-tr from-red-500 to-blue-500'
      />

      <div className='flex h-full flex-col justify-between py-3'>
        <span className='text-lg font-medium text-violet-500'>THE ENTERPRET ADVANTAGE</span>
        <p className='text-xl font-medium leading-relaxed'>
          Enterpret automatically unifies your customer feedback across all data types and builds
          adaptive AI models tailored to your feedback architecture, delivering precise and granular
          insights.
        </p>
        <Link to='#' className='text-xl font-semibold text-blue-500'>
          <span className='mr-1 hover:underline'>Get Started </span>
          {'->'}
        </Link>
      </div>
    </div>
  );
};

export default GradiantInfoText;
