import { inngest } from "@/inngest/client";
import { createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { workflowsRouter } from "@/features/workflows/server/routers";

export const appRouter = createTRPCRouter({
  // ========= EXAMPLE ========= //
  // getUsers: protectedProcedure.query(({ ctx }) => {
  //   console.log({ user: ctx.auth.user.id });

  //   return prisma.user.findMany({
  //     where: {
  //       id: ctx.auth.user.id,
  //     },
  //   });
  // }),

  // ========= EXAMPLE ========= //
  // createWorkflow: protectedProcedure.mutation(async () => {
  //   console.log("Creating workflow ✅");

  //   await inngest.send({
  //     name: "test/hello.world",
  //     data: {
  //       email: "test@test.com",
  //     },
  //   });

  //   return prisma.workflow.create({
  //     data: {
  //       name: "New Workflow",
  //     },
  //   });
  // }),

  workflows: workflowsRouter,

  textAIWithInngest: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/run.ai",
      data: {
        prompt: "tell me a joke",
      },
    });

    return {
      message: "Generating AI response with Inngest ✅",
      success: true,
    };
  }),

  testAI: protectedProcedure.mutation(async () => {
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: "tell me a joke",
    });

    return text;
  }),

  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),

  createWorkflow: protectedProcedure.mutation(async () => {
    console.log("Creating workflow ✅");

    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "test@test.com",
      },
    });

    return {
      message: "Workflow created ✅",
      success: true,
    };
  }),
});

export type AppRouter = typeof appRouter;
