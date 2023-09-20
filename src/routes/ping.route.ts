import { Hono } from "hono";

export const ping = new Hono();

/* test route to check if the server is up and running */
ping.get("*", async (c) => {
  const headers = c.req.header();

  let text = `Pong! 🏓\n`;
  text += `\nurl: ${c.req.url}\n\nheaders:\n`;

  Object.entries(headers).forEach(([k, v]) => {
    text += `\n${k}: ${v}`;
  });

  return c.text(text);
});
