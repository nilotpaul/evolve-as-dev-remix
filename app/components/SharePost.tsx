import { Link } from '@remix-run/react';
import Icons from '~/config/Icons';

type SharePostProps = {
  url: string;
  text: string;
};

const SharePost = ({ url, text }: SharePostProps) => {
  return (
    <div className='flex w-full items-center justify-end gap-4'>
      <p className='text-rose mr-2 text-sm'>Share on:</p>

      <Link
        target='_blank'
        referrerPolicy='no-referrer'
        rel='noreferrer'
        to={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}
      >
        <Icons.twitter />
      </Link>
      <Link
        target='_blank'
        referrerPolicy='no-referrer'
        rel='noreferrer'
        to={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
      >
        <Icons.facebook />
      </Link>
      <Link
        target='_blank'
        referrerPolicy='no-referrer'
        rel='noreferrer'
        to={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
      >
        <Icons.linkedin />
      </Link>
      <Link
        target='_blank'
        referrerPolicy='no-referrer'
        rel='noreferrer'
        to={`https://t.me/share/url?url=${url}&text=${text}`}
      >
        <Icons.telegram />
      </Link>
      <Link
        target='_blank'
        referrerPolicy='no-referrer'
        rel='noreferrer'
        to={`https://api.whatsapp.com/send?text=${url}`}
      >
        <Icons.whatsapp />
      </Link>
    </div>
  );
};

export default SharePost;
