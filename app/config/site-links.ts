export const NAV_LINKS = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Blogs',
    path: '/blogs',
  },
  {
    name: 'Articles',
    path: '/articles',
  },
  {
    name: 'Marketplace',
    path: '/marketplace',
  },
  {
    name: 'Support',
    path: '/support',
  },
];

export const categories = [
  {
    name: 'Tutorial',
    originalName: 'tutorial',
    path: '/tutorial',
    description: 'Tutorial desc',
  },
];

export const Tags = [
  {
    name: 'LLM',
    originalName: 'llm',
    path: '/llm',
  },
  {
    name: 'AI',
    originalName: 'ai',
    path: '/ai',
  },
  {
    name: 'Next.js',
    originalName: 'next-js',
    path: '/next-js',
  },
];

export const CATEGORIES_ENUM = ['tutorial'] as const;
export const POST_TAGS_ENUM = ['llm', 'ai', 'next-js'] as const;
export const POST_TYPE = ['blog', 'article'] as const;
