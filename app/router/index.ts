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
  // Eg. -> routes('/action/some-action', 'server/actions/some-action.ts');
};
