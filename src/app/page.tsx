import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";

export default async function Home() {
  await requireAuth();
  const data = await caller.getUsers();
  console.log(data);

  return (
    <div>
      Protected Page <LogoutButton />{" "}
    </div>
  );
}
