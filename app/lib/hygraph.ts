import axios from 'axios';
import { Post, SearchResult } from '~/types/blog-types';
import { env } from '~/validations/env';

// getHygraphData gets the data from hyfraph endpoint.
// Takes a graphql query of type string as parameter.
// Returns the response object and the hygraph data.
export const getHygraphData = async (query: string) => {
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
};

export const getPosts = async () => {
  const query = `
    query Posts {
      posts {
        id
        isDownloadable
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
        isDownloadable
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
        isDownloadable
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
        isDownloadable
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
        isDownloadable
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
        isDownloadable
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
