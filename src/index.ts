import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

// import { serve } from "@hono/node-server";

import { config } from "./lib/config";
import { rateLimitMiddleware } from "./lib/middleware";
import { album, artist, home, modules, playlist, song } from "./routes";
import { CustomResponse } from "./types/response";

const app = new Hono({ strict: false });

// middlewares
app.use("*", cors(), prettyJSON(), logger(), rateLimitMiddleware());

// routes
app.route("/", home);
app.route("/modules", modules);
app.route("/song", song);
app.route("/album", album);
app.route("/playlist", playlist);
app.route("/artist", artist);

app.notFound((c) => {
  c.status(404);
  return c.json({
    status: "Failed",
    message: `Requested route not found, please check the documentation at ${config.urls.docsUrl}`,
  });
});

app.onError((err, c) => {
  const response: CustomResponse<null> = {
    status: "Failed",
    message: `❌ ${err.message}`,
    data: null,
  };

  c.status(400);
  return c.json(response);
});

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
