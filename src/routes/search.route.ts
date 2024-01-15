import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import { parseBool } from "../lib/utils";
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
  AllSearchRequest,
  ArtistSearchRequest,
  CAllSearchResponse,
  CSearchXResponse,
  CTopSearchResponse,
  PlaylistSearchRequest,
  PodcastSearchRequest,
  PodcastSearchResposne,
  SongSearchRequest,
  TopSearchRequest,
} from "../types/search";

const {
  top_search: t,
  all,
  songs: s,
  albums: al,
  playlists: pl,
  artists: ar,
  more: m,
} = config.endpoint.search;

export const search = new Hono();

/* -----------------------------------------------------------------------------------------------
 * Search All Route Handler - /search
 * -----------------------------------------------------------------------------------------------*/

search.get("/", async (c) => {
  const { q: query = "", raw = "" } = c.req.query();

  const result: AllSearchRequest = await api(all, {
    query: { query },
    isVersion4: false,
  });

  if (!result.albums) {
    throw new Error("No search results found");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload: CAllSearchResponse = {
    status: "Success",
    message: "✅ Search results fetched successfully",
    data: allSearchPayload(result),
  };

  return c.json(payload);
});

search.get("/top", async (c) => {
  const { raw = "" } = c.req.query();

  const result: TopSearchRequest[] = await api(t, {});

  if (!result.length) {
    throw new Error("No top searches found");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload: CTopSearchResponse = {
    status: "Success",
    message: "✅ Top searches fetched successfully",
    data: result.map(topSearchesPayload),
  };

  return c.json(payload);
});

/* -----------------------------------------------------------------------------------------------
 * Search Songs, Albums, Playlists, Artists Route Handler - /search/{songs|albums|playlists|artists}
 * -----------------------------------------------------------------------------------------------*/

search.get("/:path{(songs|albums|playlists|artists)}", async (c) => {
  const path = c.req.path.split("/")[2];

  const { q = "", page: p = "", n = "", raw = "" } = c.req.query();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _artistSearchPayload = (a: ArtistSearchRequest, _?: boolean) =>
    artistSearchPayload(a);

  const [endpoint, payloadFn] = (
    {
      songs: [s, songSearchPayload],
      albums: [al, albumSearchPayload],
      playlists: [pl, playlistSearchPayload],
      artists: [ar, _artistSearchPayload],
    } as Record<string, [string, <T, U>(a: T) => Required<U>]>
  )[path];

  type A =
    | SongSearchRequest
    | AlbumSearchRequest
    | PlaylistSearchRequest
    | ArtistSearchRequest;

  const result: A = await api(endpoint, { query: { q, p, n } });

  if (!result.results.length) {
    throw new Error("No search results found");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CSearchXResponse = {
    status: "Success",
    message: "✅ Search results fetched successfully",
    data: payloadFn(result),
  };

  return c.json(response);
});

/* -----------------------------------------------------------------------------------------------
 * Search Podcasts Route Handler - /search/podcasts
 * -----------------------------------------------------------------------------------------------*/

search.get("/podcasts", async (c) => {
  const { q: query = "", page: p = "", n = "", raw = "" } = c.req.query();

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

  return c.json(payload);
});
