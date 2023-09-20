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
import { songObjPayload, songPayload } from "../payloads/song.payload";
import { CustomResponse } from "../types/response";
import {
  SongObjRequest,
  SongObjResponse,
  SongRequest,
  SongResponse,
} from "../types/song";

export const song = new Hono();

const { id: _id, link: _link, recommend } = config.endpoint.song;

// middleware to check if query params are provided and are valid
song.use("*", async (c, next) => {
  const { id, link, token } = c.req.query();
  const path = c.req.path.split("/").slice(2).join("/");

  if (path === "" && !token) {
    if (!id && !link) throw new Error("Please provide song id(s) or a link");

    if (id && link)
      throw new Error("Please provide either song id(s) or a link");

    if (link && !(isJioSaavnLink(link) && link.includes("song"))) {
      throw new Error("Please provide a valid JioSaavn link");
    }
  }

  if (path === "/recommend") {
    if (!id) throw new Error("Please provide song id");
  }

  await next();
});

song.get("/", async (c) => {
  const {
    id: pids = "",
    link = "",
    token = "",
    raw = "",
    camel = "",
  } = c.req.query();

  const result: SongObjRequest = await api(pids ? _id : _link, {
    query: { pids, token: token ? token : tokenFromLink(link), type: "song" },
  });

  if (!("songs" in result)) {
    throw new Error("Song not found, please check the id or link");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload = songObjPayload(result);

  const response: CustomResponse<SongObjResponse> = {
    status: "Success",
    message: "✅ Song(s) Details fetched successfully",
    data: parseBool(camel) ? toCamelCase(payload) : payload,
  };

  return c.json(response);
});

song.get("/recommend", async (c) => {
  const { id: pid, lang = "", raw = "", camel = "" } = c.req.query();

  const result: SongRequest[] = await api(recommend, {
    query: { pid, language: validLangs(lang) },
  });

  if (!result) {
    throw new Error("No recommendations found, please check the id");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload = result.map(songPayload);

  const response: CustomResponse<SongResponse[]> = {
    status: "Success",
    message: "✅ Song Recommendations fetched successfully",
    data: parseBool(camel) ? toCamelCase(payload) : payload,
  };

  return c.json(response);
});
