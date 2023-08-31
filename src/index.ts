import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

// import { serve } from "@hono/node-server";

import { home } from "./routes";

const app = new Hono();
app.use("*", cors(), prettyJSON({ space: 4 }), logger());

app.route("/", home);

const server = {
  port: process.env.PORT ?? 3000,
  fetch: app.fetch,
};

/* For Node.js */
// serve(server);

/* For Vercel */
export { app };

export default server;
