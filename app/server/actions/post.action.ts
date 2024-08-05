import { ActionFunctionArgs, json } from '@remix-run/node';
import { z } from 'zod';
import { filterPosts } from '~/lib/hygraph';
import { filterPostSchema } from '~/validations/post.validation';

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== 'POST') {
    return json({ filteredPosts: [], status: 405, errMsg: 'Method not allowed' });
  }

  try {
    const body = await request.json();
    const parsedData = filterPostSchema.parse(body);

    const filteredPosts = await filterPosts(parsedData);

    if (!filteredPosts || filterPosts.length === 0) {
      return json({ filteredPosts: [], status: 404, errMsg: 'No post found' });
    }

    return json({ filteredPosts, status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return json({ filteredPosts: [], status: 422, errMsg: 'Failed to parse input data' });
    }

    return json({ filteredPosts: [], status: 500, errMsg: 'Internal server error' });
  }
};
