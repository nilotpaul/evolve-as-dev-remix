import { useCreateComment } from '~/hooks/useComment';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

const PostComment = ({ blogId, userId }: { userId: string; blogId: string }) => {
  const [form, mutation] = useCreateComment(userId, { blogId });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) => mutation.mutate({ blogId, commentText: v.commentText }))}
      >
        <FormField
          control={form.control}
          name='commentText'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Write your comment...'
                  className='min-h-[150px]'
                  {...field}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.commentText?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button isLoading={mutation.isPending} type='submit' className='mt-4'>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PostComment;
