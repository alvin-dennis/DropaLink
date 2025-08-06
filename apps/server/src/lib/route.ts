import { publicProcedure } from "./orpc";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
};
export type AppRouter = typeof appRouter;
