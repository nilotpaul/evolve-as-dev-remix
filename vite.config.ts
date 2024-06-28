import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { routesConfig } from './app/router';
import { env } from './app/validations/env';

export default () => {
  return defineConfig({
    server: {
      port: 5174,
      proxy: {
        '/auth-service': {
          target: `${env.AUTH_SERVICE_URL}/api/v1`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/auth-service/, ''),
        },
        '/comment-service': {
          target: `${env.COMMENT_SERVICE_URL}/api/v1`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/comment-service/, ''),
        },
        '/vote-service': {
          target: `${env.VOTE_SERVICE_URL}/api/v1`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/vote-service/, ''),
        },
      },
    },
    plugins: [
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
