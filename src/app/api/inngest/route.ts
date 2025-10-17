import { inngest } from "@/inngest/client";
import { helloWorld, run } from "@/inngest/functions";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld, run],
});
