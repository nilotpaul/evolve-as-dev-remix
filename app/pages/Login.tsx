import { useQuery } from "@tanstack/react-query";

const Login = () => {
  const { data, isPending } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");

      return res.json();
    },
  });

  if (isPending) {
    return "loading...";
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default Login;
