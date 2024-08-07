import { visit } from 'unist-util-visit';

export const preProcess = () => (tree: any) => {
  visit(tree, (node: any) => {
    if (node?.type === 'element' && node?.tagName === 'pre') {
      const [codeEl] = node.children;
      if (codeEl.tagName !== 'code') return;

      node.raw = codeEl.children?.[0].value;
    }
  });
};

export const postProcess = () => (tree: any) => {
  visit(tree, 'element', (node: any) => {
    if (node?.type === 'element' && node?.tagName === 'figure' && node.raw.length !== 0) {
      const preNode = node.children.find((child: any) => child.tagName === 'pre');

      if (preNode.tagName === 'pre') {
        preNode.properties = {
          ...preNode.properties,
          raw: node.raw,
        };
      }
    }
  });
};
