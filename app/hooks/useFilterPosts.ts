import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilterPost, filterPostSchema } from '~/validations/post.validation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SearchResult } from '~/types/blog-types';

export const useFilterPosts = (initialData?: SearchResult[]) => {
  const form = useForm<FilterPost>({
    resolver: zodResolver(filterPostSchema),
    defaultValues: {
      category: [],
      tag: [],
    },
  });

  const filters = form.getValues();

  const queryResult = useQuery<SearchResult[]>({
    queryKey: ['post-filter-result', `${filters.category}-${filters.tag}`],
    enabled: false,
    initialData,
    queryFn: async () => {
      const { data, status } = await axios.post<{
        filteredPosts: SearchResult[];
        status: number;
        errMsg?: string;
      }>('/action/filter-posts', filters);

      if (![200, 400].includes(status)) {
        throw new Error(data?.errMsg);
      }

      return data.filteredPosts ?? [];
    },
  });

  const err = queryResult.isError ? queryResult.error : null;

  if (err) {
    console.error('Error while fetching filtered posts:', err.message);
  }

  return [form, queryResult] as const;
};
