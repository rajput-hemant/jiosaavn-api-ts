import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import { parseBool, toCamelCase, validLangs } from "../lib/utils";
import {
  chartPayload,
  featuredPlaylistsPayload,
  radioPayload,
  topAlbumsPayload,
  topArtistsPayload,
  topShowsPayload,
  trendingPayload,
} from "../payloads/get.payload";
import { songPayload } from "../payloads/song.payload";
import {
  ChartRequest,
  ChartResponse,
  FeaturedPlaylistsRequest,
  FeaturedPlaylistsResponse,
  FooterDetails,
  Lyrics,
  RadioRequest,
  RadioResponse,
  TopAlbumRequest,
  TopAlbumResponse,
  TopArtistRequest,
  TopArtistResponse,
  TopShowsRequest,
  TopShowsResponse,
  TrendingRequest,
  TrendingResponse,
} from "../types/get";
import { CustomResponse } from "../types/response";
import { SongRequest, SongResponse } from "../types/song";

export const get = new Hono();

const {
  trending: t,
  featured_playlists: fp,
  charts: ch,
  top_shows: ts,
  top_artists: tar,
  top_albums: tal,
  featured_stations: fs,
  actor_top_songs: ats,
  footer_details: fd,
  lyrics: l,
} = config.endpoint.get;

get.get("/trending", async (c) => {
  const {
    year = new Date().getFullYear().toString(),
    type: entity_type = "",
    lang = "",
    page: p = "",
    n = "10",
    raw = "",
    camel = "",
  } = c.req.query();

  const result: TrendingRequest = await api(t, {
    query: { year, entity_type, entity_language: validLangs(lang), p, n },
  });

  if (!result.length) {
    throw new Error("Failed to fetch trending, please provide a valid year");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CustomResponse<TrendingResponse> = {
    status: "Success",
    message: `✅ Currently Trending from ${year} fetched successfully`,
    data: trendingPayload(result),
  };

  return c.json(parseBool(camel) ? toCamelCase(response) : response);
});

const Paths = [
  "featured-playlists",
  "charts",
  "top-shows",
  "top-artists",
  "top-albums",
  "featured-stations",
] as const;

type Path = (typeof Paths)[number];

get.get(`/:path{(${Paths.join("|")})}`, async (c) => {
  const path = c.req.path.split("/").slice(2)[0] as Path;
  const { page: p = "", n = "", raw = "", camel = "" } = c.req.query();

  const [endpoint, payloadFn] = (
    {
      "featured-playlists": [fp, featuredPlaylistsPayload],
      charts: [ch, (c: ChartRequest[]) => c.map(chartPayload)],
      "top-shows": [ts, topShowsPayload],
      "top-artists": [tar, topArtistsPayload],
      "top-albums": [tal, topAlbumsPayload],
      "featured-stations": [fs, (s: RadioRequest[]) => s.map(radioPayload)],
    } as Record<string, [Path, <T, U>(a: T) => Required<U>]>
  )[path];

  type Response =
    | FeaturedPlaylistsRequest
    | ChartRequest[]
    | TopShowsRequest
    | TopArtistRequest
    | TopAlbumRequest
    | RadioRequest[];

  const result: Response = await api(endpoint, { query: { p, n } });

  const isEmpty = <T>(v: T) => (Array.isArray(v) ? !v.length : false);

  const isError =
    (["charts", "featured-stations"].includes(path) && isEmpty(result)) ||
    (path === "top-artists" &&
      isEmpty((result as TopArtistRequest).top_artists)) ||
    isEmpty((result as TopAlbumRequest).data);

  const payloadName = path
    .split("-")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(" ");

  if (isError) throw new Error(`Failed to fetch ${payloadName}`);

  if (parseBool(raw)) return c.json(result);

  type Payload =
    | FeaturedPlaylistsResponse
    | ChartResponse[]
    | TopShowsResponse
    | TopArtistResponse
    | TopAlbumResponse
    | RadioResponse[];

  const response: CustomResponse<Payload> = {
    status: "Success",
    message: `✅ ${payloadName} fetched successfully`,
    data: payloadFn(result),
  };

  return c.json(parseBool(camel) ? toCamelCase(response) : response);
});

get.get("/actor-top-songs", async (c) => {
  const {
    actor_id = "",
    song_id = "",
    lang = "",
    raw = "",
    camel = "",
  } = c.req.query();

  if (!actor_id) throw new Error("Actor ID(s) param is required");
  if (!song_id) throw new Error("Song ID param is required");

  const query = { actor_ids: actor_id, song_id, language: validLangs(lang) };

  const result: SongRequest[] = await api(ats, { query });

  if (!result.length) {
    throw new Error(
      "Failed to fetch actor top songs, please provide a valid ID(s)"
    );
  }

  if (parseBool(raw)) return c.json(result);

  const response: CustomResponse<SongResponse[]> = {
    status: "Success",
    message: `✅ Actor Top Songs fetched successfully`,
    data: result.map(songPayload),
  };

  return c.json(parseBool(camel) ? toCamelCase(response) : response);
});

get.get("/footer-details", async (c) => {
  const {
    lang = "",
    page: p = "",
    n = "",
    raw = "",
    camel = "",
  } = c.req.query();

  if (!lang) throw new Error("Language param is required");

  const result: FooterDetails = await api(fd, {
    query: { language: validLangs(lang), p, n },
  });

  if (!result.playlist.length) {
    throw new Error(
      "Failed to fetch footer details, please provide a valid language"
    );
  }

  if (parseBool(raw)) return c.json(result);

  const response: CustomResponse<FooterDetails> = {
    status: "Success",
    message: `✅ Footer Details fetched successfully`,
    data: result,
  };

  return c.json(parseBool(camel) ? toCamelCase(response) : response);
});

get.get("/lyrics", async (c) => {
  const { id: lyrics_id = "", raw = "", camel = "" } = c.req.query();

  if (!lyrics_id) throw new Error("Songs/Lyrics ID is required");

  const result: Lyrics = await api(l, { query: { lyrics_id } });

  if (!result.lyrics) {
    throw new Error("Invalid ID or Lyrics not available for the song");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CustomResponse<Lyrics> = {
    status: "Success",
    message: `✅ Footer Details fetched successfully`,
    data: result,
  };

  return c.json(parseBool(camel) ? toCamelCase(response) : response);
});
