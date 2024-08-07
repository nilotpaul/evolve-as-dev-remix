export type Post = {
  id: string;
  isFeatured: boolean;
  publishDate: string;
  updatedAt: string;
  category: string[];
  tag: string[];
  slug: string;
  title: string;
  excerpt: {
    text: string;
  };
  coverImg: {
    url: string;
  };
  content: string;
  author: string;
};

export type FilteredPaginatedPosts = {
  data: {
    postsConnection: {
      edges: Array<{
        cursor: string;
        node: {
          id: string;
          title: string;
          category: string[];
          tag: string[];
          slug: string;
          coverImg: {
            url: string;
          };
          excerpt: {
            text: string;
          };
          publishDate: string;
          author: string;
        };
      }>;
      pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string;
        endCursor: string;
        pageSize: number;
      };
    };
  };
};

export type FeaturedPost = Omit<Post, 'content'>;

export type TrendingPost = Omit<Post, 'content'>;

export type SearchResult = Omit<Post, 'content' | 'updatedAt'>;
