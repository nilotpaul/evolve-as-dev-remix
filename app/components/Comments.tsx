import { formatDistance } from 'date-fns';
import { useGetComments } from '~/hooks/useComment';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { formatUsername } from '~/lib/utils';
import { Button } from './ui/button';
import { Fragment, useState } from 'react';
import CommentLoading from './loadings/CommentLoading';
import MutateComment from './MutateComment';
import EditComment from './EditComment';

const Comments = ({ blogId, userId }: { userId?: string; blogId: string }) => {
  const [isEditing, setIsEditing] = useState<{ id: string; state: boolean }>({
    id: '',
    state: false,
  });

  const query = useGetComments({ blogId });
  const now = new Date();

  if (query.isError) {
    return (
      <p className='text-sm font-medium text-destructive'>
        Some error happend while loading comments. Report this issue or try again later.
      </p>
    );
  }

  return (
    <div className='w-full'>
      <h2 className='text-2xl font-bold underline'>Comments</h2>
      {!query.data || query.data?.length === 0 || query.isPending ? (
        <p className='mt-4 text-gray-200'>
          No Comments yet 😔. But you can comment now to make me{' '}
          <span className='font-medium text-pink-600'>happy!</span>
        </p>
      ) : (
        <div className='mt-6 space-y-6'>
          {query.data?.map((comment) => (
            <Fragment key={String(comment._id)}>
              <div className='flex items-center gap-3'>
                <Avatar className='h-[30px] w-[30px]'>
                  <AvatarImage
                    height={30}
                    width={30}
                    className='h-full w-full rounded-full object-cover'
                    src={comment?.userImage}
                    alt={`@${comment.userName}`}
                  />
                  <AvatarFallback className='text-sm uppercase'>
                    {formatUsername(comment.userName)}
                  </AvatarFallback>
                </Avatar>

                <span className='text-sm font-semibold'>@{comment.userName}</span>
                <time className='ml-2 text-xs font-medium text-gray-300'>
                  {formatDistance(comment.createdAt, now, {
                    addSuffix: true,
                    includeSeconds: true,
                  })}
                </time>
                {comment.userId === userId && (
                  <MutateComment
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    commentId={comment._id}
                    blogId={blogId}
                    userId={userId}
                  />
                )}
              </div>
              {isEditing.id === comment._id && isEditing.state && comment.userId === userId ? (
                <EditComment
                  initialComment={comment.commentText}
                  blogId={blogId}
                  commentId={comment._id}
                  userId={userId}
                  setIsEditing={setIsEditing}
                />
              ) : (
                <p className='prose mt-3 text-[0.925rem] dark:prose-invert'>
                  {comment.commentText}
                </p>
              )}
            </Fragment>
          ))}
          <Button
            aria-label='Load More Comments'
            size='sm'
            className='text-[0.825rem] font-medium'
            variant='secondary'
          >
            Load More
          </Button>
        </div>
      )}
      {query.isPending &&
        Array(2)
          .fill(0)
          .map((_, idx) => <CommentLoading key={idx} />)}
    </div>
  );
};

export default Comments;
