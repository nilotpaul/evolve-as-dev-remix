import { LoaderFunctionArgs, json } from '@remix-run/node';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getUser } from '~/hooks/useAuth';
import { env } from '~/validations/env';

export const getUserLoader =
  () =>
  async ({ request }: LoaderFunctionArgs) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: ['session'],
      queryFn: () => getUser(`${env.AUTH_SERVICE_URL}/api/v1`, true, request.headers.get('cookie')),
    });

    return json({
      dehydratedQuery: dehydrate(queryClient),
    });
  };
