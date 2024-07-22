import { NAV_LINKS } from '~/config/site-links';
import { Button } from '../ui/button';
import { NavLink } from '@remix-run/react';
import { cn } from '~/lib/utils';
import { Input } from '../ui/input';
import Icons from '~/config/Icons';

type LinksProps = {
  className?: string;
};

const Links = ({ className }: LinksProps) => {
  return (
    <div className='flex w-full items-center rounded-3xl bg-[#1d1c20] bg-opacity-50'>
      {NAV_LINKS.map(({ name, path }) => (
        <NavLink
          className={({ isActive }) =>
            cn('rounded-3xl px-7 py-3 text-sm font-medium hover:underline', {
              'bg-muted/70 hover:no-underline': isActive,
            })
          }
          key={`${name}-${path}`}
          to={path}
        >
          {name}
        </NavLink>
      ))}

      <div className='ml-auto mr-1.5 flex items-center gap-1.5'>
        <Input
          type='text'
          placeholder='search...'
          className='h-9 rounded-full bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
        />
        <Button
          aria-label='Search'
          variant='secondary'
          size='icon'
          className='h-9 w-11 rounded-full'
        >
          <Icons.Search className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};

export default Links;
