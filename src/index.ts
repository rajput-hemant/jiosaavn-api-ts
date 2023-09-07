import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import { config } from "./lib/config";
import { rateLimitMiddleware } from "./lib/middleware";
import {
  album,
  artist,
  get,
  home,
  modules,
  playlist,
  radio,
  search,
  song,
} from "./routes";
import { CustomResponse } from "./types/response";

const app = new Hono({ strict: false });

/* middlewares */
app.use("*", cors(), prettyJSON(), logger(), rateLimitMiddleware());

/* routes */

/* home */
app.route("/", home);

/* modules */
app.route("/modules", modules);

/* details & recommendations */
app.route("/song", song);
app.route("/album", album);
app.route("/playlist", playlist);
app.route("/artist", artist);

/* search */
app.route("/search", search);
/* get */
app.route("/get", get);

/* radio */
app.route("/radio", radio);

/* 404 */
app.notFound((c) => {
  c.status(404);
  return c.json({
    status: "Failed",
    message: `Requested route not found, please check the documentation at ${config.urls.docsUrl}`,
  });
});

/* error */
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

export { app };

export default server;
