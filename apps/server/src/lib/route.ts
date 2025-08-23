import { authRoutes } from "../routes/auth.routes";
import { dashboardRoutes } from "../routes/dashboard.routes";
import { publicProcedure, protectedProcedure } from "./orpc";

const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),

  auth: authRoutes,
  dashboard: protectedProcedure.router(dashboardRoutes),
};

export { appRouter };
export type AppRouter = typeof appRouter;
