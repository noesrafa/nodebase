import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-10-seconds", "2s");
    return { message: `Hello ${event.data.email}` };
  }
);
