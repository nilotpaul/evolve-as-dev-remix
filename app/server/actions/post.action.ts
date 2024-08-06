import { ActionFunctionArgs, json } from '@remix-run/node';
import { z } from 'zod';
import { filterPosts } from '~/lib/hygraph';
import { filterPostSchema } from '~/validations/post.validation';

export type FilterPostActionType = Awaited<ReturnType<typeof action>>;

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== 'POST') {
    return json({
      status: 405,
      errMsg: 'Method not allowed',
    });
  }

  try {
    const body = await request.json();
    const parsedData = filterPostSchema.parse(body);

    // For testing if the infinite search pagination is working or not, add the
    // first property to increase or decrease the posts per page.
    const data = await filterPosts(parsedData, {
      // first: 2,
      cursor: parsedData.cursor,
    });

    if (!data.edges || data.edges.length === 0) {
      return json({
        status: 404,
        errMsg: 'No post found',
      });
    }

    return json({ data, status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return json({
        status: 422,
        errMsg: 'Failed to parse input data',
      });
    }

    return json({
      status: 500,
      errMsg: 'Internal server error',
    });
  }
};
