import { Link } from '@remix-run/react';
import { MDXComponents } from 'node_modules/@mdx-js/react/lib';
import CopyCode from '~/components/mdx/CopyCode';
import MdxImage from '~/components/mdx/MdxImage';
import Toc from '~/components/mdx/Toc';
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
} from '~/components/ui/table';
import { cn } from '~/lib/utils';

export const components = ({ showToc }: { showToc: boolean }): MDXComponents => ({
  Image: ({ src, ...props }) => src?.length && <MdxImage src={src} {...props} />,
  h1: ({ children, ...props }) => (
    <h1 className='xs:text-4xl text-3xl' {...props}>
      {children}
    </h1>
  ),
  // Earlier this fixed some kind of issue, but not sure what.
  // p: ({ children, ...props }) =>
  //   typeof children === 'string' ? <p {...props}>{children}</p> : children,
  a: ({ children, href, className }) => (
    <Link
      className={cn(
        'h-min p-0 text-primary underline',
        {
          'no-underline hover:underline': className?.match(/-h[1-3]$/),
        },
        className
      )}
      to={href || ''}
    >
      {children}
    </Link>
  ),
  Link: ({ children, href, className, referrerPolicy, ...props }) => (
    <Link
      className={cn(
        'h-min p-0 text-primary underline',
        {
          'no-underline hover:underline': className?.match(/-h[1-3]$/),
        },
        className
      )}
      href={href || ''}
      referrerPolicy={(props.target === '_blank' ? 'no-referrer' : undefined) || referrerPolicy}
      {...props}
    >
      {children}
    </Link>
  ),
  nav: ({ children, className, ...props }) => {
    if (className === 'toc' && showToc) {
      return <Toc toc={children} />;
    }

    if (className !== 'toc' && children) {
      return (
        <nav {...props} className={className}>
          {children}
        </nav>
      );
    }
    return <></>;
  },
  // @ts-expect-error raw property will be available via a custom plugin.
  pre: ({ children, raw = '', className, ...props }) => (
    <pre className={cn('relative', className)} {...props}>
      <CopyCode rawCode={raw} />
      {children}
    </pre>
  ),
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead: ({ className, children, ...props }) => (
    <TableHead className={cn('font-bold text-black dark:text-white', className)} {...props}>
      {children}
    </TableHead>
  ),
  TableBody,
  TableCell,
  TableFooter,
});
