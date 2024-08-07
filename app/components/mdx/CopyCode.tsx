import { useState } from 'react';
import { Button } from '../ui/button';
import { cn } from '~/lib/utils';

type CopyCodeProps = {
  rawCode: string;
};

const CopyCode = ({ rawCode }: CopyCodeProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(rawCode);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const isSingelLine = rawCode.split('\n').length <= 2;

  return (
    <Button
      className={cn('absolute right-2 top-2 h-fit px-1', {
        'top-1/2 -translate-y-1/2': isSingelLine,
      })}
      size='sm'
      variant='ghost'
      disabled={isCopied}
      onClick={onCopy}
    >
      {isCopied ? 'Copied' : 'Copy'}
    </Button>
  );
};

export default CopyCode;
