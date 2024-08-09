import Icons from '~/config/Icons';
import { useDeleteComment } from '~/hooks/useComment';
import { Button } from './ui/button';

type DeleteCommentProps = {
  userId: string;
  blogId: string;
  commentId: string;
  isEditing: {
    id: string;
    state: boolean;
  };
  setIsEditing: React.Dispatch<
    React.SetStateAction<{
      id: string;
      state: boolean;
    }>
  >;
};

const DeleteComment = ({ userId, setIsEditing, isEditing, ...rest }: DeleteCommentProps) => {
  const mutation = useDeleteComment(userId, rest);

  const isCommentEditing = isEditing.id === rest.commentId && isEditing.state === true;

  return (
    <div className='ml-auto flex items-center gap-2'>
      {!isCommentEditing ? (
        <Button
          onClick={() => setIsEditing({ id: rest.commentId, state: true })}
          size='icon'
          variant='ghost'
          className='h-4 w-4'
        >
          <Icons.Edit className='ml-auto h-4 w-4 cursor-pointer' />
        </Button>
      ) : (
        <Button
          onClick={() => setIsEditing((prev) => ({ ...prev, state: false }))}
          size='icon'
          variant='ghost'
          className='h-4 w-4'
        >
          <Icons.Cross className='ml-auto h-4 w-4 cursor-pointer' />
        </Button>
      )}

      {!mutation.isPending ? (
        <Button disabled={mutation.isPending} size='icon' variant='ghost' className='h-4 w-4'>
          <Icons.Trash
            onClick={() => mutation.mutate()}
            className='ml-auto h-4 w-4 cursor-pointer text-red-600/90'
          />
        </Button>
      ) : (
        <Icons.Spinner className='h-4 w-4' />
      )}
    </div>
  );
};

export default DeleteComment;
