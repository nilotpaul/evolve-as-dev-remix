import { NAV_LINKS } from '~/config/site-links';
import { Button } from '../ui/button';
import { NavLink } from '@remix-run/react';
import { cn } from '~/lib/utils';

type LinksProps = {
  className?: string;
};

const Links = ({ className }: LinksProps) => {
  return (
    <ul className={cn('flex items-center gap-8', className)}>
      {NAV_LINKS.map((link) => {
        return (
          <li key={link.path}>
            <Button
              className={cn(
                'px-0 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
              )}
              variant='link'
              size='sm'
            >
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    'text-base text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 sm:text-sm',
                    isActive && 'text-neutral-900 underline dark:text-neutral-200'
                  )
                }
              >
                {link.name}
              </NavLink>
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default Links;
