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
    allowMethods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  })
);
app.use("/*", csrf({ origin: env.CORS_ORIGIN || "" }));
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
  return c.text("DropaLink Server is running");
});
app.get("/health", (c) => {
  return c.json({ status: "Running", timestamp: new Date().toLocaleString() });
});

app.onError(errorHandler);

export default app;
