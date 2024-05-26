import { vitePlugin as remix, cloudflareDevProxyVitePlugin } from '@remix-run/dev';
import { getLoadContext } from './load-context';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { routesConfig } from './app/router';
import { serverEnv } from './app/validations/env.server';

export default () => {
  const isProd = process.env.NODE_ENV === 'production';

  return defineConfig({
    server: {
      port: 5174,
      proxy: {
        '/auth-service': {
          target: `${serverEnv.AUTH_SERVICE_URL}/api/v1`,
          changeOrigin: true,
          secure: isProd,
          rewrite: (path) => path.replace(/^\/auth-service/, ''),
        },
        '/comment-service': {
          target: `${serverEnv.COMMENT_SERVICE_URL}/api/v1`,
          changeOrigin: true,
          secure: isProd,
          rewrite: (path) => path.replace(/^\/comment-service/, ''),
        },
        '/vote-service': {
          target: `${serverEnv.VOTE_SERVICE_URL}/api/v1`,
          changeOrigin: true,
          secure: isProd,
          rewrite: (path) => path.replace(/^\/vote-service/, ''),
        },
      },
    },
    plugins: [
      cloudflareDevProxyVitePlugin({ getLoadContext }),
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
        },
        ssr: true,
        routes: (defineRoutes) => defineRoutes(routesConfig),
      }),
      tsconfigPaths(),
    ],
  });
};
