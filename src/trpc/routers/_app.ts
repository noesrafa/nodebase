import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  getUsers: baseProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `returning user ${opts.input.userId}`,
      };
    }),
});

export type AppRouter = typeof appRouter;
