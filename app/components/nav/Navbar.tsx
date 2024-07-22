import { useSession } from '~/hooks/useAuth';

import { Button } from '../ui/button';
import Icons from '~/config/Icons';
import Brand from '../Brand';
import Container from '../Container';
import ThemeToggle from '../ThemeToggle';
import User from '../User';
import UserLoading from '../loadings/UserLoading';
import Links from './Links';
import { Link } from '@remix-run/react';

const Navbar = () => {
  const { session, isLoading } = useSession();

  return (
    <Container className='sticky my-6 mt-4 flex items-center justify-evenly gap-x-4'>
      <Brand className='ml-1.5 mr-2' />

      <Links />

      <div className='flex items-center gap-3'>
        <ThemeToggle />
        {!isLoading ? (
          <>
            {session?.id ? (
              <User session={session} />
            ) : (
              <Link to='/login'>
                <Button className='gap-2 rounded-3xl px-3'>
                  <Icons.Login />
                  Login
                </Button>
              </Link>
            )}
          </>
        ) : (
          <UserLoading />
        )}
      </div>
    </Container>
  );
};

export default Navbar;
