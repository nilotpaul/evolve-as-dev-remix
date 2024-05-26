import { useSession } from '~/hooks/useAuth';

import Icons from '~/config/Icons';
import Brand from '../Brand';
import Container from '../Container';
import ThemeToggle from '../ThemeToggle';
import Links from './Links';
import User from '../User';
import UserLoading from '../loadings/UserLoading';
import { Link } from '@remix-run/react';

const Navbar = () => {
  const { session, isLoading } = useSession();

  return (
    <nav className='sticky left-0 top-0 z-40 flex h-16 w-full items-center justify-center border-b border-slate-300 bg-background dark:border-b-neutral-800'>
      <Container className='flex w-full items-center justify-between'>
        <div className='flex w-full items-center justify-between'>
          <Link to='/'>
            <Brand />
          </Link>
          <Links className='-ml-12 hidden sm:flex' />

          <div className='flex cursor-pointer items-center gap-3'>
            <ThemeToggle />
            {!isLoading ? (
              <>
                {!session?.id ? (
                  <Link to='/login' className='flex items-center text-sm font-medium'>
                    Login
                    <Icons.Login className='ml-2' />
                  </Link>
                ) : (
                  <User session={session} />
                )}
              </>
            ) : (
              <UserLoading />
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
