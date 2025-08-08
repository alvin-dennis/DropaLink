import { authRoutes } from "../routes/auth.routes";
import { dashboardRoutes } from "../routes/dashboard.routes";
import { publicProcedure } from "./orpc";

const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),

  auth: authRoutes,
  dashboard: dashboardRoutes,
};

export { appRouter };
export type AppRouter = typeof appRouter;
