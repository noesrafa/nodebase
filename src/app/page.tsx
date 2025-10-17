"use client";
import { LogoutButton } from "./logout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: workflows } = useQuery(trpc.getWorkflows.queryOptions());

  const createWorkflow = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Workflow created ✅");
      },
    })
  );

  const testAI = useMutation(
    trpc.testAI.mutationOptions({
      onSuccess: (data) => {
        toast.success(`AI response: ${data}`);
      },
    })
  );

  console.log(workflows);

  return (
    <div>
      Protected Page <LogoutButton />{" "}
      <Button
        onClick={() => {
          createWorkflow.mutate();
        }}
        disabled={createWorkflow.isPending}
      >
        Create Workflow
      </Button>
      <Button
        onClick={() => {
          testAI.mutate();
        }}
        disabled={testAI.isPending}
      >
        Test AI
      </Button>
    </div>
  );
}
