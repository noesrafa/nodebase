import { inngest } from "./client";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

const google = createGoogleGenerativeAI({
  apiKey: process.env.CUSTOM_GOOGLE_API_KEY,
});
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-10-seconds", "2s");
    return { message: `Hello ${event.data.email}` };
  }
);

export const run = inngest.createFunction(
  { id: "run-ai" },
  { event: "test/run.ai" },
  async ({ event, step }) => {
    const { steps: geminiSteps } = await step.ai.wrap(
      "generating-gemini-response",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system:
          "You are a helpful assistant that can answer questions and help with tasks.",
        prompt: "Whats is the capital of Mexico?",
      }
    );

    const { steps: openaiSteps } = await step.ai.wrap(
      "generating-openai-response",
      generateText,
      {
        model: openai("gpt-4o-mini"),
        system:
          "You are a helpful assistant that can answer questions and help with tasks.",
        prompt: "Whats is the capital of Mexico?",
      }
    );

    const { steps: anthropicSteps } = await step.ai.wrap(
      "generating-anthropic-response",
      generateText,
      {
        model: anthropic("claude-3-5-haiku"),
        system:
          "You are a helpful assistant that can answer questions and help with tasks.",
        prompt: "Whats is the capital of Mexico?",
      }
    );

    return {
      gemini: geminiSteps,
      openai: openaiSteps,
      anthropic: anthropicSteps,
    };
  }
);
