import { caller } from "@/trpc/server";

const EasyTRPC = async () => {
  // EASY WAY TO USE TRPC
  const users = await caller.getUsers({ userId: "123" });

  return <div>{users.greeting}</div>;
};

export default EasyTRPC;
