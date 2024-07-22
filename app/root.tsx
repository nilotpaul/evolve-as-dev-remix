import { getInitialThemeScript } from '../scripts/theme';
import { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { getUserLoader } from './server/actions/auth.action';
import { HydrationBoundary } from '@tanstack/react-query';
import { useTheme } from './components/ThemeProvider';

import Providers from './components/Providers';
import { Toaster } from 'sonner';
import { cn } from './lib/utils';

import styles from '~/globals.css?url';
import DottedBackground from './components/ui/dotted-background';

export const meta: MetaFunction = ({ error }) => {
  if (isRouteErrorResponse(error) && error.status === 400) {
    return [
      {
        title: 'Not Found',
      },
      {
        name: 'description',
        content: 'This page does not exists.',
      },
    ];
  }

  return [
    {
      title: 'Evolve As Dev',
    },
    {
      name: 'description',
      content: 'some desc',
    },
  ];
};

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const loader = getUserLoader();

function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: getInitialThemeScript() }} />
      </head>
      <body>
        <Toaster
          cn={cn}
          closeButton
          duration={2000}
          richColors
          position='bottom-right'
          theme={theme === 'dark' ? 'dark' : 'light'}
        />
        <DottedBackground />
        <div
          className='xs:opacity-90 absolute inset-x-0 -top-40 -z-10 mt-24 overflow-hidden opacity-80 blur-3xl sm:opacity-40'
          aria-hidden='true'
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-rose-600 to-violet-400 opacity-40 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
          />
        </div>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { dehydratedQuery } = useLoaderData<typeof loader>();

  return (
    <Providers>
      <RootLayout>
        <HydrationBoundary state={dehydratedQuery}>
          <Outlet />
        </HydrationBoundary>
      </RootLayout>
    </Providers>
  );
}

export function ErrorBoundary() {
  const err = useRouteError();

  console.log('root error:', err);

  return <pre>{JSON.stringify(err)}</pre>;
}
