import { LoaderFunctionArgs, json } from '@remix-run/cloudflare';
import { getEnv } from '~/validations/env.server';

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const { CLIENT_DOMAIN, ...env } = getEnv(context.cloudflare.env);
  const prefix = 'api/v1';

  const servicesMap = {
    'auth-service': env.AUTH_SERVICE_URL,
    'vote-service': env.VOTE_SERVICE_URL,
    'comment-service': env.COMMENT_SERVICE_URL,
  };

  const url = new URL(request.url);

  const reqMethod = request.method;
  const targetService = url.pathname.split('/').filter((v) => v)[0];

  if (reqMethod !== 'GET') {
    return json({ errorMsg: `mathod not allowed: ${reqMethod}` }, 405);
  }

  const serviceUrl = Object.entries(servicesMap).find(([key]) => key === targetService);

  if (!serviceUrl) {
    return json({ errorMsg: 'invalid service url' }, 400);
  }

  const reqUrl = request.url
    .replace(CLIENT_DOMAIN, serviceUrl[1])
    .replace(targetService, `${prefix}`);

  try {
    const res = await fetch(reqUrl, {
      method: reqMethod,
      headers: request.headers,
    });

    if (!res.ok) {
      return json((await res.json()) ?? { errorMsg: 'proxy failed' }, {
        headers: res.headers,
        status: res.status,
        statusText: res.statusText,
      });
    }

    return json(await res.json(), {
      headers: res.headers,
      status: res.status,
      statusText: res.statusText,
    });
  } catch (err) {
    console.error('proxy error: ', err);

    return json({ errorMsg: 'proxy failed' }, 500);
  }
};

export const action = async ({ context, request }: LoaderFunctionArgs) => {
  const { CLIENT_DOMAIN, ...env } = getEnv(context.cloudflare.env);
  const prefix = 'api/v1';

  const servicesMap = {
    'auth-service': env.AUTH_SERVICE_URL,
    'vote-service': env.VOTE_SERVICE_URL,
    'comment-service': env.COMMENT_SERVICE_URL,
  };

  const url = new URL(request.url);

  const reqMethod = request.method;
  const targetService = url.pathname.split('/').filter((v) => v)[0];

  if (reqMethod === 'GET') {
    return json({ errorMsg: `mathod not allowed: ${reqMethod}` }, 405);
  }

  const serviceUrl = Object.entries(servicesMap).find(([key]) => key === targetService);

  if (!serviceUrl) {
    return json({ errorMsg: 'invalid service url' }, 400);
  }

  const reqUrl = request.url
    .replace(CLIENT_DOMAIN, serviceUrl[1])
    .replace(targetService, `${prefix}`);

  let body = undefined;
  if (request.headers.has('Content-Length') && Number(request.headers.get('Content-Length')) > 0) {
    body = await request.json();
  }

  try {
    const res = await fetch(reqUrl, {
      method: reqMethod,
      body: JSON.stringify(body),
      headers: request.headers,
    });

    if (!res.ok) {
      return json((await res.json()) ?? { errorMsg: 'proxy failed' }, {
        headers: res.headers,
        status: res.status,
        statusText: res.statusText,
      });
    }

    return json(await res.json(), {
      headers: res.headers,
      status: res.status,
      statusText: res.statusText,
    });
  } catch (err) {
    console.error('proxy error: ', err);

    return json({ errorMsg: 'proxy failed' }, 500);
  }
};
