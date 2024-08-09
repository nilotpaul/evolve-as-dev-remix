import { useLogin, useSession } from '~/hooks/useAuth';
import { LoginProvider } from '~/types/auth-types';
import { Navigate } from '@remix-run/react';

import Brand from '~/components/Brand';
import { Button } from '~/components/ui/button';

const Login = () => {
  const providers = [
    {
      provider: 'github',
      text: 'Login with GitHub',
    },
    {
      provider: 'google',
      text: 'Login with Google',
    },
  ] satisfies {
    provider: LoginProvider;
    text: string;
  }[];

  const { session, isLoading } = useSession();
  const login = useLogin();

  if (isLoading) return;
  if (session?.id) return <Navigate to='/' />;

  return (
    <div className='mx-auto flex h-[calc(100vh-2.5rem)] w-full max-w-xs flex-col items-center justify-center'>
      <Brand linkDisabled textClassName='text-2xl sm:text-2xl' />

      <div className='mt-12 flex w-full flex-col items-center justify-center gap-4'>
        {providers.map(({ provider, text }) => (
          <Button
            isLoading={login.variables === provider && login.isPending}
            onClick={() => login.mutate(provider)}
            key={provider}
            className='w-full'
          >
            {text}
          </Button>
        ))}
      </div>

      <p className='mt-20 text-sm'>Terms and Conditions for cookies and more.</p>
    </div>
  );
};

export default Login;
