import { getInitialThemeScript } from '../scripts/theme';
import { LinksFunction, MetaFunction } from '@remix-run/cloudflare';
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
