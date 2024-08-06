import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilterPost, filterPostSchema } from '~/validations/post.validation';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FilteredPaginatedPosts, SearchResult } from '~/types/blog-types';

export type QueryResult =
  | FilteredPaginatedPosts['data']['postsConnection']
  | {
      edges: FilteredPaginatedPosts['data']['postsConnection']['edges'];
      pageInfo?: FilteredPaginatedPosts['data']['postsConnection']['pageInfo'];
    };

export const useFilterPosts = (initialData?: SearchResult[]) => {
  const form = useForm<FilterPost>({
    resolver: zodResolver(filterPostSchema),
    defaultValues: {
      category: [],
      tag: [],
    },
  });

  const filters = form.getValues();

  const filterQueryKey =
    (filters.category || filters.tag).length !== 0
      ? `${filters.category}-${filters.tag}`
      : undefined;

  const queryResult = useInfiniteQuery<QueryResult>({
    queryKey: ['post-filter-result', filterQueryKey],
    enabled: Boolean(filterQueryKey),
    initialPageParam: undefined,
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
      }>('/action/filter-posts', { ...filters, cursor: pageParam });

      if (![200, 400].includes(status)) {
        throw new Error(res?.errMsg);
      }

      if (res.status === 404) {
        return { edges: [] };
      }

      return res.data ?? [{ edges: [] }];
    },
  });

  const err = queryResult.isError ? queryResult.error : null;

  if (err) {
    console.error('Error while fetching filtered posts:', err.message);
  }

  return [form, queryResult] as const;
};
