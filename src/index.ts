import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

// import { serve } from "@hono/node-server";

import { home, modules, song } from "./routes";

const app = new Hono({ strict: false });

// middlewares
app.use("*", cors(), prettyJSON(), logger());

// routes
app.route("/", home);
app.route("/modules", modules);
app.route("/song", song);

const server = {
  port: +(process.env.PORT ?? 3000),
  fetch: app.fetch,
};

/* For Node.js */
// serve(server, (info) => {
//   console.log(`Server listening on ${info.address}:${info.port}`);
// });

/* For Vercel */
export { app };

export default server;
