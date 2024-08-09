import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilterPost, filterPostSchema } from '~/validations/post.validation';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import axios from '../lib/axiosConfig';
import { FilteredPaginatedPosts, SearchResult } from '~/types/blog-types';
import { useEffect } from 'react';

export type QueryResult =
  | FilteredPaginatedPosts['data']['postsConnection']
  | {
      edges: FilteredPaginatedPosts['data']['postsConnection']['edges'];
      pageInfo?: FilteredPaginatedPosts['data']['postsConnection']['pageInfo'];
    };

const initialFilterState: FilterPost = { category: [], tag: [], title: '' };

export const useFilterPosts = (values: FilterPost, initialData?: SearchResult[]) => {
  const queryClient = useQueryClient();
  const form = useForm<FilterPost>({
    resolver: zodResolver(filterPostSchema),
    defaultValues: initialFilterState,
  });

  const queryResult = useInfiniteQuery<QueryResult>({
    queryKey: ['post-filter-result', values.title || undefined, ...values.category, ...values.tag],
    initialPageParam: undefined,
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    staleTime: 12 * 60 * 1000, // 12 min(s)
    gcTime: 20 * 60 * 1000, // 20 min(s)
    getNextPageParam: (lastPage) =>
      lastPage?.pageInfo?.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
    initialData: {
      pages: [
        {
          edges: initialData?.map((p) => ({ cursor: p.id, node: p })) || [],
        },
      ],
      pageParams: [undefined],
    },
    queryFn: async ({ pageParam = undefined }) => {
      const { data: res, status } = await axios.post<{
        data: QueryResult;
        status: number;
        errMsg?: string;
      }>('/action/filter-posts', { ...values, cursor: pageParam });

      if (![200, 400].includes(status)) {
        throw new Error(res?.errMsg);
      }

      if (res.status === 404) {
        return { edges: [] };
      }

      return res.data ?? [{ edges: [] }];
    },
  });

  const { refetch, isPending } = queryResult;

  useEffect(() => {
    if (
      !isPending &&
      (values.title.length >= 3 || values.category.length !== 0 || values.tag.length !== 0)
    ) {
      refetch({
        cancelRefetch: true,
      });
    }
  }, [refetch, isPending, values]);

  const resetQueryState = () => {
    queryClient.setQueryData(
      ['post-filter-result', values.title || undefined, ...values.category, ...values.tag],
      {
        pages: [
          {
            edges: initialData?.map((p) => ({ cursor: p.id, node: p })) || [],
          },
        ],
        pageParams: [undefined],
      }
    );
  };

  const err = queryResult.isError ? queryResult.error : null;

  if (err) {
    console.error('Error while fetching filtered posts:', err.message);
  }

  return [form, { ...queryResult, resetQueryState }] as const;
};
