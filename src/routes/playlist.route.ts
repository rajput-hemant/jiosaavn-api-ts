import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import {
  isJioSaavnLink,
  parseBool,
  tokenFromLink,
  validLangs,
} from "../lib/utils";
import { playlistPayload } from "../payloads/playlist.payload";
import {
  CPlaylistResponse,
  CPlaylistsResponse,
  PlaylistRequest,
} from "../types/playlist";

const { id: i, link: l, recommend: r } = config.endpoint.playlist;

export const playlist = new Hono();

/* -----------------------------------------------------------------------------------------------
 * MIDDLEWARE to check if query params are provided and are valid
 * -----------------------------------------------------------------------------------------------*/

playlist.use("*", async (c, next) => {
  const { id, link, token } = c.req.query();
  const path = "/" + c.req.path.split("/").slice(2).join("/");

  if (path === "/") {
    if (!id && !link && !token)
      throw new Error("Please provide playlist id, link or a token");

    if (link && !(isJioSaavnLink(link) && link.includes("featured"))) {
      throw new Error("Please provide a valid JioSaavn link");
    }
  }

  if (path === "/recommend") {
    if (!id) throw new Error("Please provide playlist id");
  }

  await next();
});

/* -----------------------------------------------------------------------------------------------
 * Playlist Details Route Handler - GET /playlist
 * -----------------------------------------------------------------------------------------------*/

playlist.get("/", async (c) => {
  const {
    id: listid = "",
    link = "",
    token = "",
    raw = "",
    mini = "",
  } = c.req.query();

  const result: PlaylistRequest = await api(listid ? i : l, {
    query: {
      listid,
      token: token ? token : tokenFromLink(link),
      type: "playlist",
      p: "1",
      n: "50",
    },
  });

  if (!result.id) {
    throw new Error("No playlist found, please check the id, link or token");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CPlaylistResponse = {
    status: "Success",
    message: "✅ Playlist Details fetched successfully",
    data: playlistPayload(result, parseBool(mini)),
  };

  return c.json(response);
});

/* -----------------------------------------------------------------------------------------------
 * Playlist Recommendations Route Handler - GET /playlist/recommend
 * -----------------------------------------------------------------------------------------------*/

playlist.get("/recommend", async (c) => {
  const { id: listid, lang = "", raw = "", mini = "" } = c.req.query();

  if (!listid) {
    throw new Error("Please provide playlist id");
  }

  const result = await api<PlaylistRequest[]>(r, {
    query: { listid, language: validLangs(lang) },
  });

  if (!result.length) {
    throw new Error("No recommendations found, please check the id");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CPlaylistsResponse = {
    status: "Success",
    message: "✅ Playlist Recommendations fetched successfully",
    data: result.map((p) => playlistPayload(p, parseBool(mini))),
  };

  return c.json(response);
});
