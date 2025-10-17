import { inngest } from "@/inngest/client";
import { createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";

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
