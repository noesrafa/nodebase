import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";

export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ ctx }) => {
    console.log({ user: ctx.auth.user.id });

    return prisma.user.findMany({
      where: {
        id: ctx.auth.user.id,
      },
    });
  }),
});

export type AppRouter = typeof appRouter;
