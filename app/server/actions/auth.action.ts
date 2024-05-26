import { LoaderFunctionArgs, json } from '@remix-run/cloudflare';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getUser } from '~/hooks/useAuth';
import { cloudflareEnv } from '~/validations/env.server';

export const getUserLoader =
  () =>
  async ({ context, request }: LoaderFunctionArgs) => {
    const { AUTH_SERVICE_URL } = cloudflareEnv(context.cloudflare.env);
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: ['session'],
      queryFn: () => getUser(`${AUTH_SERVICE_URL}/api/v1`, true, request.headers.get('cookie')),
    });

    return json({ dehydratedQuery: dehydrate(queryClient) });
  };
