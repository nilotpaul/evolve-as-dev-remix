import { DefineRouteFunction } from '@remix-run/dev/dist/config/routes';

export const routesConfig = (routes: DefineRouteFunction) => {
  // '/' -> route will only render the marketing page.
  routes('/', 'pages/Marketing.tsx', { index: true });

  // Default HomePage for all routes after '/*'
  routes('/', 'pages/Home.tsx', () => {
    // All nested routes will inherit the layout of the parent route i.e. Home
    routes('/test', 'pages/Test.tsx');
  });

  // Independent routes i.e. no parent layout (eg - Login Page).
  routes('/login', 'pages/Login.tsx');

  // action routes will register here (which will run on the server) ->>
  // Eg. -> routes('/action/some-action', 'server/actions/some.action.ts');
  // It doesn't matter what the id is, its just for differentiating between
  // multiple routes that uses the same file.
  routes('/auth-service/*', 'server/actions/proxy-action.ts', { id: 'auth' });
  routes('/vote-service/*', 'server/actions/proxy-action.ts', { id: 'vote' });
  routes('/comment-service/*', 'server/actions/proxy-action.ts', { id: 'comment' });

  // Catch all routes that doesn't exists and show a 404 page.
  routes('*', 'pages/NotFound.tsx', { id: '404' });
};
