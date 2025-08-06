import { RPCHandler } from "@orpc/server/fetch";
import { createContext } from "./lib/context";
import { appRouter } from "./lib/route";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { timing } from "hono/timing";
import { env } from "./config/env";

import errorHandler from "./middleware/error.middleware";

const app = new Hono();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: env.CORS_ORIGIN || "",
    allowMethods: ["GET", "POST", "OPTIONS"],
  })
);
app.use("/*", csrf({}));
app.use("/*", secureHeaders());
app.use("/*", timing());
app.use("/*", prettyJSON());

const handler = new RPCHandler(appRouter);
app.use("/rpc/*", async (c, next) => {
  const context = await createContext({ context: c });
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/rpc",
    context: context,
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }
  await next();
});

app.get("/", (c) => {
  return c.text("OK");
});
app.onError(errorHandler);

export default app;
