"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  // BEST WAY TO USE TRPC
  const trpc = useTRPC();
  const { data: usersV2 } = useQuery(
    trpc.getUsers.queryOptions({ userId: "123" })
  );

  return <div>{usersV2?.greeting}</div>;
};

export default Page;
