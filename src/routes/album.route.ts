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
import { albumPayload } from "../payloads/album.payload";
import { AlbumRequest, AlbumResponse } from "../types/album";
import { CustomResponse } from "../types/response";

export const album = new Hono();

const { id: _id, link: _link, recommend, same_year } = config.endpoint.album;

// middleware to check if query params are provided and are valid
album.use("*", async (c, next) => {
  const { id, link, token, year } = c.req.query();
  const path = "/" + c.req.path.split("/").slice(2).join("/");

  if (path === "/" && !token) {
    if (!id && !link) throw new Error("Please provide album id or link");

    if (id && link) throw new Error("Please provide either album id or link");

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

album.get("/", async (c) => {
  const {
    id: albumid = "",
    link = "",
    token = "",
    raw = "",
    camel = "",
  } = c.req.query();

  const result: AlbumRequest = await api(albumid ? _id : _link, {
    query: {
      albumid,
      token: token ? token : tokenFromLink(link),
      type: "album",
    },
  });

  if (!result.id) {
    throw new Error("No album found, please check the id or link");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload = albumPayload(result);

  const response: CustomResponse<AlbumResponse> = {
    status: "Success",
    message: "✅ Album Details fetched successfully",
    data: parseBool(camel) ? toCamelCase(payload) : payload,
  };

  return c.json(response);
});

album.get("/recommend", async (c) => {
  const { id: albumid, lang = "", raw = "", camel = "" } = c.req.query();

  const result = await api<AlbumRequest[]>(recommend, {
    query: { albumid, language: validLangs(lang) },
  });

  if (!result.length) {
    throw new Error("No recommendations found, please check the id");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload = result.map(albumPayload);

  const response: CustomResponse<AlbumResponse[]> = {
    status: "Success",
    message: "✅ Album Recommendations fetched successfully",
    data: parseBool(camel) ? toCamelCase(payload) : payload,
  };

  return c.json(response);
});

album.get("/same-year", async (c) => {
  const {
    year: album_year = "",
    lang = "",
    raw = "",
    camel = "",
  } = c.req.query();

  const result = await api<AlbumRequest[]>(same_year, {
    query: { album_year, album_lang: validLangs(lang) },
  });

  if (!result.length) {
    throw new Error("No albums found, please check the year");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload = result.map(albumPayload);

  const response: CustomResponse<AlbumResponse[]> = {
    status: "Success",
    message: `✅ Albums from ${album_year} fetched successfully`,
    data: parseBool(camel) ? toCamelCase(payload) : payload,
  };

  return c.json(response);
});
