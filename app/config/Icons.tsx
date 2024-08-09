import { Check, LoaderCircle, LucideProps, Search, SquarePen, Sun, Trash2, X } from 'lucide-react';
import { EnterIcon, MoonIcon, CalendarIcon, ClockIcon, CaretLeftIcon } from '@radix-ui/react-icons';
import { cn } from '~/lib/utils';
import { ComponentProps } from 'react';

import {
  siFacebook,
  siLinkedin,
  siX,
  siWhatsapp,
  siGmail,
  siGithub,
  siTelegram,
} from 'simple-icons';

const defaultClassName = 'h-5 w-5 cursor-pointer';

const Icons = {
  Sun: Sun,
  Moon: MoonIcon,
  Login: ({ className, ...props }: ComponentProps<typeof EnterIcon>) => (
    <EnterIcon className={cn(defaultClassName, className)} {...props} />
  ),
  Spinner: ({ className, ...props }: LucideProps) => (
    <LoaderCircle className={cn('animate-spin', defaultClassName, className)} {...props} />
  ),
  Calender: CalendarIcon,
  Clock: ClockIcon,
  leftArrow: CaretLeftIcon,
  Search: Search,
  Trash: Trash2,
  Edit: SquarePen,
  Cross: X,
  Check,

  facebook: ({ className, ...props }: JSX.IntrinsicElements['svg']) => (
    <svg
      role='img'
      viewBox='0 0 24 24'
      className={cn('h-4 w-4 cursor-pointer transition-opacity hover:opacity-90', className)}
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d={siFacebook.path} />
    </svg>
  ),
  linkedin: ({ className, ...props }: JSX.IntrinsicElements['svg']) => (
    <svg
      role='img'
      viewBox='0 0 24 24'
      className={cn('h-4 w-4 cursor-pointer transition-opacity hover:opacity-90', className)}
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d={siLinkedin.path} />
    </svg>
  ),
  twitter: ({ className, ...props }: JSX.IntrinsicElements['svg']) => (
    <svg
      role='img'
      viewBox='0 0 24 24'
      className={cn('h-4 w-4 cursor-pointer transition-opacity hover:opacity-90', className)}
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d={siX.path} />
    </svg>
  ),
  whatsapp: ({ className, ...props }: JSX.IntrinsicElements['svg']) => (
    <svg
      role='img'
      viewBox='0 0 24 24'
      className={cn('h-4 w-4 cursor-pointer transition-opacity hover:opacity-90', className)}
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d={siWhatsapp.path} />
    </svg>
  ),
  gamil: ({ className, ...props }: JSX.IntrinsicElements['svg']) => (
    <svg
      role='img'
      viewBox='0 0 24 24'
      className={cn('h-4 w-4 cursor-pointer transition-opacity hover:opacity-90', className)}
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d={siGmail.path} />
    </svg>
  ),
  github: ({ className, ...props }: JSX.IntrinsicElements['svg']) => (
    <svg
      role='img'
      viewBox='0 0 24 24'
      className={cn('h-4 w-4 cursor-pointer transition-opacity hover:opacity-90', className)}
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d={siGithub.path} />
    </svg>
  ),
  telegram: ({ className, ...props }: JSX.IntrinsicElements['svg']) => (
    <svg
      role='img'
      viewBox='0 0 24 24'
      className={cn('h-4 w-4 cursor-pointer transition-opacity hover:opacity-90', className)}
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d={siTelegram.path} />
    </svg>
  ),
};

export default Icons;
