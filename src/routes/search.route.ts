import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import { parseBool, toCamelCase } from "../lib/utils";
import {
  albumSearchPayload,
  allSearchPayload,
  artistSearchPayload,
  playlistSearchPayload,
  podcastsSearchPayload,
  songSearchPayload,
  topSearchesPayload,
} from "../payloads/search.payload";
import { CustomResponse } from "../types/response";
import {
  AlbumSearchRequest,
  AlbumSearchResponse,
  AllSearchRequest,
  AllSearchResponse,
  ArtistSearchRequest,
  ArtistSearchResponse,
  PlaylistSearchRequest,
  PlaylistSearchResponse,
  PodcastSearchRequest,
  PodcastSearchResposne,
  SongSearchRequest,
  SongSearchResponse,
  TopSearchRequest,
  TopSearchResponse,
} from "../types/search";

export const search = new Hono();

const {
  top_search: t,
  all,
  songs: s,
  albums: al,
  playlists: pl,
  artists: ar,
  more: m,
} = config.endpoint.search;

search.get("/", async (c) => {
  const { q: query = "", raw = "", camel = "" } = c.req.query();

  const result: AllSearchRequest = await api(all, { query: { query } });

  if (!result.albums) {
    throw new Error("No search results found");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload: CustomResponse<AllSearchResponse> = {
    status: "Success",
    message: "✅ Search results fetched successfully",
    data: allSearchPayload(result),
  };

  return c.json(parseBool(camel) ? toCamelCase(payload) : payload);
});

search.get("/top", async (c) => {
  const { raw = "", camel = "" } = c.req.query();

  const result: TopSearchRequest[] = await api(t, {});

  if (!result.length) {
    throw new Error("No top searches found");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload: CustomResponse<TopSearchResponse[]> = {
    status: "Success",
    message: "✅ Top searches fetched successfully",
    data: result.map(topSearchesPayload),
  };

  return c.json(parseBool(camel) ? toCamelCase(payload) : payload);
});

search.get("/songs", async (c) => {
  const { q = "", page: p = "", n = "", raw = "", camel = "" } = c.req.query();

  const result: SongSearchRequest = await api(s, { query: { q, p, n } });

  if (!result.results.length) {
    throw new Error("No search results found");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload: CustomResponse<SongSearchResponse> = {
    status: "Success",
    message: "✅ Search results fetched successfully",
    data: songSearchPayload(result),
  };

  return c.json(parseBool(camel) ? toCamelCase(payload) : payload);
});

search.get("/albums", async (c) => {
  const { q = "", page: p = "", n = "", raw = "", camel = "" } = c.req.query();

  const result: AlbumSearchRequest = await api(al, { query: { q, p, n } });

  if (!result.results.length) {
    throw new Error("No search results found");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload: CustomResponse<AlbumSearchResponse> = {
    status: "Success",
    message: "✅ Search results fetched successfully",
    data: albumSearchPayload(result),
  };

  return c.json(parseBool(camel) ? toCamelCase(payload) : payload);
});

search.get("/playlists", async (c) => {
  const { q = "", page: p = "", n = "", raw = "", camel = "" } = c.req.query();

  const result: PlaylistSearchRequest = await api(pl, { query: { q, p, n } });

  if (!result.results.length) {
    throw new Error("No search results found");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload: CustomResponse<PlaylistSearchResponse> = {
    status: "Success",
    message: "✅ Search results fetched successfully",
    data: playlistSearchPayload(result),
  };

  return c.json(parseBool(camel) ? toCamelCase(payload) : payload);
});

search.get("/artists", async (c) => {
  const { q = "", page: p = "", n = "", raw = "", camel = "" } = c.req.query();

  const result: ArtistSearchRequest = await api(ar, { query: { q, p, n } });

  if (!result.results.length) {
    throw new Error("No search results found");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload: CustomResponse<ArtistSearchResponse> = {
    status: "Success",
    message: "✅ Search results fetched successfully",
    data: artistSearchPayload(result),
  };

  return c.json(parseBool(camel) ? toCamelCase(payload) : payload);
});

search.get("/podcasts", async (c) => {
  const {
    q: query = "",
    page: p = "",
    n = "",
    raw = "",
    camel = "",
  } = c.req.query();

  const result: PodcastSearchRequest = await api(m, {
    query: { query, p, n, params: '{ "type": "podcasts" }' },
  });

  if (!result.results.length) {
    throw new Error("No search results found");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload: CustomResponse<PodcastSearchResposne> = {
    status: "Success",
    message: "✅ Search results fetched successfully",
    data: podcastsSearchPayload(result),
  };

  return c.json(parseBool(camel) ? toCamelCase(payload) : payload);
});
