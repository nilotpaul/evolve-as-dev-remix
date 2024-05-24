import { MetaFunction, defer } from "@remix-run/cloudflare";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Remix Test App",
    },
    {
      name: "description",
      content: "desc",
    },
  ];
};

export const loader = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  return defer({
    data: res.json(),
  });
};

const Home = () => {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div>
      <Suspense fallback="loading...">
        <Await resolve={data}>{(data) => JSON.stringify(data)}</Await>
      </Suspense>
    </div>
  );
};

export default Home;
