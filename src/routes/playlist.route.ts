import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import {
  isJioSaavnLink,
  parseBool,
  toCamelCase,
  tokenFromLink,
  validLangs,
} from "../lib/utils";
import { playlistPayload } from "../payloads/playlist.payload";
import { PlaylistRequest, PlaylistResponse } from "../types/playlist";
import { CustomResponse } from "../types/response";

export const playlist = new Hono();

const { id: _id, link: _link, recommend } = config.endpoint.playlist;

// middleware to check if query params are provided and are valid
playlist.use("*", async (c, next) => {
  const { id, link, token } = c.req.query();
  const path = "/" + c.req.path.split("/").slice(2).join("/");

  if (path === "/" && !token) {
    if (!id && !link) throw new Error("Please provide playlist id or link");

    if (id && link)
      throw new Error("Please provide either playlist id or link");

    if (link && !(isJioSaavnLink(link) && link.includes("featured"))) {
      throw new Error("Please provide a valid JioSaavn link");
    }
  }

  if (path === "/recommend") {
    if (!id) throw new Error("Please provide playlist id");
  }

  await next();
});

playlist.get("/", async (c) => {
  const {
    id: listid = "",
    link = "",
    token = "",
    raw = "",
    camel = "",
  } = c.req.query();

  const result: PlaylistRequest = await api(listid ? _id : _link, {
    query: {
      listid,
      token: token ? token : tokenFromLink(link),
      type: "playlist",
    },
  });

  if (!result.id) {
    throw new Error("No playlist found, please check the id or link");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload = playlistPayload(result);

  const response: CustomResponse<PlaylistResponse> = {
    status: "Success",
    message: "✅ Playlist Details fetched successfully",
    data: parseBool(camel) ? toCamelCase(payload) : payload,
  };

  return c.json(response);
});

playlist.get("/recommend", async (c) => {
  const { id: listid, lang = "", raw = "", camel = "" } = c.req.query();

  if (!listid) {
    throw new Error("Please provide playlist id");
  }

  const result = await api<PlaylistRequest[]>(recommend, {
    query: { listid, language: validLangs(lang) },
  });

  if (!result.length) {
    throw new Error("No recommendations found, please check the id");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload = result.map(playlistPayload);

  const response: CustomResponse<PlaylistResponse[]> = {
    status: "Success",
    message: "✅ Playlist Recommendations fetched successfully",
    data: parseBool(camel) ? toCamelCase(payload) : payload,
  };

  return c.json(response);
});
