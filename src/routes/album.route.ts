import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import {
  isJioSaavnLink,
  parseBool,
  tokenFromLink,
  validLangs,
} from "../lib/utils";
import { albumPayload } from "../payloads/album.payload";
import { AlbumRequest, CAlbumResponse, CAlbumsResponse } from "../types/album";

const { id: i, link: l, recommend: r, same_year: s } = config.endpoint.album;

export const album = new Hono();

/* -----------------------------------------------------------------------------------------------
 * MIDDLEWARE to check if query params are provided and are valid
 * -----------------------------------------------------------------------------------------------*/

album.use("*", async (c, next) => {
  const { id, link, token, year } = c.req.query();
  const path = "/" + c.req.path.split("/").slice(2).join("/");

  if (path === "/") {
    if (!id && !link && !token)
      throw new Error("Please provide album id, link or a token");

    if (link && !(isJioSaavnLink(link) && link.includes("album"))) {
      throw new Error("Please provide a valid JioSaavn link");
    }
  }

  if (path === "/recommend") {
    if (!id) throw new Error("Please provide album id");
  }

  if (path === "/same-year") {
    if (!year) throw new Error("Please provide album year");
  }

  await next();
});

/* -----------------------------------------------------------------------------------------------
 * Album Details Route Handler - GET /album
 * -----------------------------------------------------------------------------------------------*/

album.get("/", async (c) => {
  const {
    id: albumid = "",
    link = "",
    token = "",
    raw = "",
    mini = "",
  } = c.req.query();

  const result: AlbumRequest = await api(albumid ? i : l, {
    query: {
      albumid,
      token: token ? token : tokenFromLink(link),
      type: "album",
    },
  });

  if (!result.id) {
    throw new Error("No album found, please check the id, link or token");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CAlbumResponse = {
    status: "Success",
    message: "✅ Album Details fetched successfully",
    data: albumPayload(result, parseBool(mini)),
  };

  return c.json(response);
});

/* -----------------------------------------------------------------------------------------------
 * Album Recommendations Route Handler - GET /album/recommend
 * -----------------------------------------------------------------------------------------------*/

album.get("/recommend", async (c) => {
  const { id: albumid, lang = "", raw = "", mini = "" } = c.req.query();

  const result = await api<AlbumRequest[]>(r, {
    query: { albumid, language: validLangs(lang) },
  });

  // if (!result.length) {
  //   throw new Error("No recommendations found, please check the id");
  // }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CAlbumsResponse = {
    status: "Success",
    message: "✅ Album Recommendations fetched successfully",
    data: result.map((a) => albumPayload(a, parseBool(mini))),
  };

  return c.json(response);
});

/* -----------------------------------------------------------------------------------------------
 * Albums from same year, Route Handler - GET /album/same-year
 * -----------------------------------------------------------------------------------------------*/

album.get("/same-year", async (c) => {
  const {
    year: album_year = "",
    lang = "",
    raw = "",
    mini = "",
  } = c.req.query();

  const result = await api<AlbumRequest[]>(s, {
    query: { album_year, album_lang: validLangs(lang) },
  });

  if (!result.length) {
    throw new Error("No albums found, please check the year");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CAlbumsResponse = {
    status: "Success",
    message: `✅ Albums from ${album_year} fetched successfully`,
    data: result.map((a) => albumPayload(a, parseBool(mini))),
  };

  return c.json(response);
});
