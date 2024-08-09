import { cn } from '~/lib/utils';
import { useEffect, useState, Fragment } from 'react';
import { run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { MDXModule } from 'node_modules/@mdx-js/mdx/lib/evaluate';
import { components } from '~/config/mdx-config';

type MdxProps = {
  showToc?: boolean;
  code: string;
  className?: string;
};

const Mdx = ({ showToc = false, code, className }: MdxProps) => {
  const [mdxModule, setMdxModule] = useState<MDXModule | undefined>(undefined);
  const Content = mdxModule ? mdxModule.default : Fragment;

  useEffect(
    function () {
      (async function () {
        // @ts-expect-error: `runtime` types are currently broken.
        setMdxModule(await run(code, { ...runtime, baseUrl: import.meta.url }));
      })();
    },
    [code]
  );

  return (
    <article
      className={cn(
        'prose prose-base z-50 min-w-full dark:prose-invert prose-a:no-underline prose-pre:scrollbar-none hover:prose-a:underline',
        className
      )}
    >
      {mdxModule ? <Content components={components({ showToc })} /> : <Content />}
    </article>
  );
};

export default Mdx;
