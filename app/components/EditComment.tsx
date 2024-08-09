import { useEditComment } from '~/hooks/useComment';
import { Textarea } from './ui/textarea';
import Icons from '~/config/Icons';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';

type EditCommentProps = {
  initialComment: string;
  userId: string;
  blogId: string;
  commentId: string;
  setIsEditing: React.Dispatch<
    React.SetStateAction<{
      id: string;
      state: boolean;
    }>
  >;
};

const EditComment = ({ initialComment, userId, setIsEditing, ...rest }: EditCommentProps) => {
  const [form, mutation] = useEditComment(userId, rest);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) =>
          mutation.mutate(v, {
            onSuccess: () => setIsEditing((prev) => ({ ...prev, state: false })),
          })
        )}
        className='flex w-full flex-col'
      >
        <FormField
          control={form.control}
          name='commentText'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='sr-only'>Edit Comment</FormLabel>
              <FormControl>
                <Textarea autoFocus placeholder='Edit your comment...' {...field}>
                  {initialComment}
                </Textarea>
              </FormControl>
              <FormMessage>{form.formState.errors.commentText?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button
          isLoading={mutation.isPending}
          type='submit'
          size='icon'
          variant='secondary'
          className='ml-auto mt-2 h-6 w-6'
        >
          {!mutation.isPending && <Icons.Check className='h-4 w-4 cursor-pointer text-white' />}
        </Button>
      </form>
    </Form>
  );
};

export default EditComment;
