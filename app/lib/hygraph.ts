import axios, { AxiosError } from 'axios';
import { POSTS_FILTER_SEARCH_RESULTS_LIMIT } from '~/config/infinite-search';
import { FilteredPaginatedPosts, Post, SearchResult } from '~/types/blog-types';
import { env } from '~/validations/env';
import { FilterPost } from '~/validations/post.validation';

// getHygraphData gets the data from hyfraph endpoint.
// Takes a graphql query of type string as parameter.
// Returns the response object and the hygraph data.
export const getHygraphData = async (query: string) => {
  try {
    const result = await axios.post(
      env.HYGRAPH_API_URL,
      { query },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.HYGRAPH_API_TOKEN}`,
        },
      }
    );

    return { response: result, data: result.data?.data ?? null };
  } catch (err) {
    if (err instanceof AxiosError) {
      return { response: err.response, data: null };
    }

    return { response: undefined, data: null };
  }
};

export const getPosts = async () => {
  const query = `
    query Posts {
      posts {
        id
        isFeatured
        publishDate
        category
        tag
        slug
        title
        excerpt {
          text
        }
        coverImg {
          url
        }
        author
      }
    }
  `;

  const { data } = await getHygraphData(query);

  return data?.posts as Omit<Post, 'content'>[];
};

export const getFeaturedPost = async () => {
  const query = `
    query Posts {
      posts(where: { isFeatured: true } ) {
        id
        isFeatured
        publishDate
        category
        tag
        slug
        title
        excerpt {
          text
        }
        coverImg {
          url
        }
        author
      }
    }
  `;

  const { data } = await getHygraphData(query);

  return data?.posts[0] as Omit<Post, 'content'>;
};

export const getPostsByCategory = async (category: string) => {
  const query = `
    query Posts {
      posts(where: { category_contains_some: "${category}" }) {
        id
        isFeatured
        publishDate
        updatedAt
        category
        tag
        slug
        title
        excerpt {
          text
        }
        coverImg {
          url
        }
        author
      }
    }
  `;

  const { data } = await getHygraphData(query);

  return data?.posts as Omit<Post, 'content'>[];
};

export const getPostBySlug = async ({ category, slug }: { slug: string; category: string }) => {
  const query = `
    query Posts {
      posts(where: { category_contains_some: "${category}", slug: "${slug}" } ) {
        id
        publishDate
        category
        tag
        slug
        title
        excerpt {
          text
        }
        coverImg {
          url
        }
        content {
          markdown
        }
        author
      }
    }
  `;

  const { data } = await getHygraphData(query);

  return data?.posts[0] as Post;
};

export const getPostsByTitle = async (title: string) => {
  const query = `
    query Posts {
      posts(where: { title_contains: "${title}" } ) {
        id
        isFeatured
        publishDate
        category
        tag
        slug
        title
        excerpt {
          text
        }
        coverImg {
          url
        }
      }
    }
  `;

  const { data } = await getHygraphData(query);

  return data?.posts as SearchResult[];
};

export const getPostsByTag = async (tag: string) => {
  const query = `
    query Posts {
      posts(where: { tag_contains_some: "${tag}" } ) {
        id
        publishDate
        category
        tag
        slug
        title
        excerpt {
          text
        }
        coverImg {
          url
        }
        content {
          markdown
        }
        author
      }
    }
  `;

  const { data } = await getHygraphData(query);

  return data?.posts as Post[];
};

export const getPostsByAuthor = async (authorName: string, limit: number = 6) => {
  const query = `
    query Posts {
      posts(where: { author_contains: "${authorName}" }, first: ${limit}) {
        id
        publishDate
        category
        tag
        slug
        title
        excerpt {
          text
        }
        coverImg {
          url
        }
        author
      }
    }
  `;

  const { data } = await getHygraphData(query);

  return data?.posts as Omit<Post, 'content'>[];
};

export const filterPosts = async (
  filters: FilterPost,
  { first = POSTS_FILTER_SEARCH_RESULTS_LIMIT, cursor = '' }: { first?: number; cursor?: string }
) => {
  const category = filters.category.map((c) => `"${c}"`);
  const tag = filters.tag.map((tag) => `"${tag}"`);

  const comma = category.length === 0 || tag.length === 0 ? '' : ',';

  const after = !cursor || cursor?.length === 0 ? '' : `, after: "${cursor}"`;

  const query = `
    query filteredPostsPaginated {
      postsConnection(where: { ${tag.length === 0 ? '' : `tag_contains_some: [${tag}]`} ${comma} ${category.length === 0 ? '' : `category_contains_some: [${category}]`} }, first: ${first}${after}) {
        edges {
          cursor
          node {
            id
            title
            category
            tag
            slug
            coverImg {
              url
            }
            excerpt {
              text
            }
            publishDate
            author
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
          pageSize
        }
      }
    }
  `;

  console.log(query);

  const { data } = (await getHygraphData(query)) as FilteredPaginatedPosts;

  return data?.postsConnection;
};
