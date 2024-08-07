import { cn } from '~/lib/utils';

type MdxImageProps = {
  alt?: string;
} & JSX.IntrinsicElements['img'];

const MdxImage = ({ src, alt, className, ...props }: MdxImageProps) => {
  return (
    <img
      src={src}
      alt={alt || 'Post Image'}
      className={cn(
        'mx-auto my-8 rounded-md object-fill shadow-lg shadow-zinc-400 dark:shadow-zinc-900',
        className
      )}
      {...props}
    />
  );
};

export default MdxImage;
