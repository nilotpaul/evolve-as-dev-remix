import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '../lib/axiosConfig';
import { COMMENT_SERVICE } from '~/config/api-utils';
import { type Comment } from '~/types/comment-types';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import {
  CreateComment,
  createCommentSchema,
  UpdateComment,
  updateCommentSchema,
} from '~/validations/post.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { GenericErrorMsg } from '~/lib/utils';

export const useGetComments = ({ blogId }: { blogId: string }) => {
  const queryKey = ['blog-comments', blogId];

  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const { data } = await axios.get<Comment[] | undefined>(
          `${COMMENT_SERVICE}/comments/${blogId}`
        );

        return data;
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 404) {
          return [];
        }

        throw err;
      }
    },
    retry: (_, err) => err instanceof AxiosError && err.response?.status === 404,
    refetchOnMount: false,
  });

  if (queryResult.isError) {
    console.error(queryResult.error);
  }

  return queryResult;
};

export const useCreateComment = (userId: string, { blogId }: { blogId: string }) => {
  const queryClient = useQueryClient();

  const mutationKey = [blogId, userId];

  const form = useForm<CreateComment>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      blogId,
      commentText: '',
    },
  });

  const mutationResult = useMutation({
    mutationKey,
    mutationFn: async (payload: CreateComment) => {
      const { data } = await axios.post<Comment | undefined>(`${COMMENT_SERVICE}/create`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success('Comment added');
      form.reset();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        return toast.error(err.response?.data?.errorMsg || GenericErrorMsg);
      }
    },
    onSettled: (data, err) => {
      if (!err) {
        queryClient.setQueryData<Comment[]>(['blog-comments', blogId], (prev) => {
          if (prev && data) {
            return [...prev, data];
          }
          return [];
        });
      }
    },
  });

  return [form, mutationResult] as const;
};

export const useDeleteComment = (
  userId: string,
  { blogId, commentId }: { blogId: string; commentId: string }
) => {
  const queryClient = useQueryClient();

  const mutationKey = [blogId, commentId, userId];

  const mutationResult = useMutation({
    mutationKey,
    mutationFn: async () => {
      const { data } = await axios.delete<Comment | undefined>(
        `${COMMENT_SERVICE}/delete/${commentId}/${blogId}`
      );
      return data;
    },
    onSuccess: () => {
      toast.success('Comment Deleted');
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        return toast.error(err.response?.data?.errorMsg || GenericErrorMsg);
      }
    },
    onSettled: (data, err) => {
      if (!err) {
        queryClient.setQueryData<Comment[]>(['blog-comments', blogId], (prev) => {
          if (prev && data) {
            return prev.filter((v) => !(v._id === data._id && v.blogId === blogId));
          }
          return [];
        });
      }
    },
  });

  return mutationResult;
};

export const useEditComment = (
  userId: string,
  { blogId, commentId }: { blogId: string; commentId: string }
) => {
  const queryClient = useQueryClient();

  const mutationKey = [blogId, commentId, userId];

  const form = useForm<UpdateComment>({
    resolver: zodResolver(updateCommentSchema),
    defaultValues: {
      blogId,
      commentId,
      commentText: '',
    },
  });

  const mutationResult = useMutation({
    mutationKey,
    mutationFn: async (payload: { commentId: string; commentText: string }) => {
      const { data } = await axios.put<Comment | undefined>(`${COMMENT_SERVICE}/update`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success('Comment Updated');
      form.reset();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        return toast.error(err.response?.data?.errorMsg || GenericErrorMsg);
      }
    },
    onSettled: (data, err) => {
      if (!err) {
        queryClient.setQueryData<Comment[]>(['blog-comments', blogId], (prev) => {
          if (prev && data) {
            return [...prev.filter((v) => !(v._id === data._id && v.blogId === blogId)), data];
          }
          return [];
        });
      }
    },
  });

  return [form, mutationResult] as const;
};
