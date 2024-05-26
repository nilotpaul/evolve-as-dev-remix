import { handleErrors } from '~/lib/utils';
import { LoginProvider, Session } from '~/types/auth-types';
import {
  LoginWithProviderResponse,
  loginWithProviderResponseSchema,
} from '~/validations/auth.validation';
import { useNavigate } from '@remix-run/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export const useLogin = () => {
  const navigate = useNavigate();

  const mutationResult = useMutation({
    mutationKey: ['login'],
    mutationFn: async (provider: LoginProvider) => {
      const { data } = await axios.post<LoginWithProviderResponse>(
        `/auth-service/auth/login/${provider}`
      );

      const { url } = loginWithProviderResponseSchema.parse(data);

      return url;
    },

    onSuccess: (url) => (window.location.href = url),

    onError: (err, provider) => {
      console.error('login error: ', provider, err);

      return handleErrors(navigate, err);
    },
  });

  return mutationResult;
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await axios.post('/auth-service/auth/logout');
    },

    onSuccess: () => {
      toast.success('logged out successfully.');

      queryClient.invalidateQueries({ queryKey: ['session'] });
      queryClient.clear();

      return navigate('/');
    },

    onError: (err) => {
      console.error('logout error: ', err);

      return handleErrors(navigate, err);
    },
  });

  return mutationResult;
};

export const getUser = async (url: string, isServer: boolean, cookie: string | null) => {
  const { data } = await axios.get<Session | null>(`${url}/auth/user`, {
    withCredentials: true,
    ...(isServer && {
      headers: {
        'Content-Type': 'application/json',
        cookie,
      },
    }),
  });

  return data;
};

export const useSession = () => {
  const queryResult = useQuery({
    queryKey: ['session'],
    queryFn: () => getUser('/auth-service', false, null),
    refetchOnMount: false,
    retryOnMount: false,
    retry: false,
    staleTime: 10 * 60 * 1000, // Session will be valid for 10 mins.
    gcTime: 15 * 60 * 1000, // Session will be cached for 15 mins.
  });

  return {
    session: queryResult.data ?? null,
    isLoading: queryResult.isLoading || queryResult.isFetching || queryResult.isPending,
    isError: queryResult.isError,
  };
};
