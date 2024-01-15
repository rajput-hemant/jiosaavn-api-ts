import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import {
  isJioSaavnLink,
  parseBool,
  tokenFromLink,
  validLangs,
} from "../lib/utils";
import { songObjPayload, songPayload } from "../payloads/song.payload";
import {
  CSongResponse,
  CSongsResponse,
  SongObjRequest,
  SongRequest,
} from "../types/song";

const { id: i, link: l, recommend: r } = config.endpoint.song;

export const song = new Hono();

/* -----------------------------------------------------------------------------------------------
 * MIDDLEWARE to check if query params are provided and are valid
 * -----------------------------------------------------------------------------------------------*/

song.use("*", async (c, next) => {
  const { id, link, token } = c.req.query();
  const path = c.req.path.split("/").slice(2).join("/");

  if (path === "") {
    if (!id && !link && !token) {
      throw new Error("Please provide song id(s), link or a token");
    }

    if (link && !(isJioSaavnLink(link) && link.includes("song"))) {
      throw new Error("Please provide a valid JioSaavn link");
    }
  }

  if (path === "/recommend") {
    if (!id) throw new Error("Please provide song id");
  }

  await next();
});

/* -----------------------------------------------------------------------------------------------
 * Songs Details Route Handler - GET /song
 * -----------------------------------------------------------------------------------------------*/

song.get("/", async (c) => {
  const {
    id: pids = "",
    link = "",
    token = "",
    raw = "",

    mini = "",
  } = c.req.query();

  const result: SongObjRequest = await api(pids ? i : l, {
    query: { pids, token: token ? token : tokenFromLink(link), type: "song" },
  });

  if (!("songs" in result)) {
    throw new Error("Song not found, please check the id, link or token");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CSongResponse = {
    status: "Success",
    message: "✅ Song(s) Details fetched successfully",
    data: songObjPayload(result, parseBool(mini)),
  };

  return c.json(response);
});

/* -----------------------------------------------------------------------------------------------
 * Songs Recommendations Route Handler - GET /song/recommend
 * -----------------------------------------------------------------------------------------------*/

song.get("/recommend", async (c) => {
  const { id: pid, lang = "", raw = "", mini = "" } = c.req.query();

  const result: SongRequest[] = await api(r, {
    query: { pid, language: validLangs(lang) },
  });

  if (!result) {
    throw new Error("No recommendations found, please check the id");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CSongsResponse = {
    status: "Success",
    message: "✅ Song Recommendations fetched successfully",
    data: result.map((s) => songPayload(s, parseBool(mini))),
  };

  return c.json(response);
});
