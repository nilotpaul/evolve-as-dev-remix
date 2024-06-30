import { useSession } from '~/hooks/useAuth';

import { Button } from '../ui/button';
import Icons from '~/config/Icons';
import Brand from '../Brand';
import Container from '../Container';
import ThemeToggle from '../ThemeToggle';
import User from '../User';
import UserLoading from '../loadings/UserLoading';
import Links from './Links';

const Navbar = () => {
  const { session, isLoading } = useSession();

  return (
    <Container className='sticky my-6 flex max-w-[95rem] items-center justify-evenly gap-x-4'>
      <Brand className='mr-4' />

      <Links />

      <div className='flex items-center gap-3'>
        <ThemeToggle />
        {!isLoading ? (
          <>
            {session?.id ? (
              <User session={session} />
            ) : (
              <Button className='gap-2 rounded-3xl px-3'>
                <Icons.Login />
                Login
              </Button>
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
