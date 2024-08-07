import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { rehypePrettyCode } from 'rehype-pretty-code';
import rehypeToc, { Options } from 'rehype-toc';
import { preProcess, postProcess } from './plugins/rehype-pre-raw';

import { compile } from '@mdx-js/mdx';

export const parseMarkdown = async (md: string) => {
  const code = await compile(md, {
    outputFormat: 'function-body',
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [
      preProcess,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          className: ['subheading-anchor'],
          ariaLabel: 'Link to section',
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: 'material-theme-ocean',
          defaultLang: 'shell',
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
            node.properties.className = ['line']; // add 'line' class to each line in the code block
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className?.push('line--highlighted');
          },
        },
      ],
      [
        rehypeToc,
        {
          headings: ['h1', 'h2', 'h3'],
          cssClasses: {
            link: 'xs:text-base sm:text-sm font-semibold text-zinc-800 py-1 dark:text-zinc-300 ',
          },
        } satisfies Options,
      ],
      postProcess,
    ],
  });

  return code;
};
