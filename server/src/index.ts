import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { timing } from "hono/timing";
import type { ApiResponse } from "shared/dist";

export const app = new Hono()
  .use("*", logger())
  .use("*", cors())
  .use("*", csrf())
  .use("*", prettyJSON())
  .use("*", secureHeaders())
  .use("*", timing())

  .get("/", (c) => {
    return c.text("Hello Hono!");
  })

  .get("/hello", async (c) => {
    const data: ApiResponse = {
      message: "Hello BHVR!",
      success: true,
    };

    return c.json(data, { status: 200 });
  })

export default app;