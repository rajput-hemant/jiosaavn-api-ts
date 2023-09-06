import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import { parseBool, toCamelCase } from "../lib/utils";
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
    lang: entity_language = "",
    page: p = "",
    n = "10",
    raw = "",
    camel = "",
  } = c.req.query();

  const result: TrendingRequest = await api(t, {
    query: { year, entity_type, entity_language, p, n },
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

get.get("/featured-playlists", async (c) => {
  const { page: p = "", n = "10", raw = "", camel = "" } = c.req.query();

  const result: FeaturedPlaylistsRequest = await api(fp, { query: { p, n } });

  if (!result.data.length) {
    throw new Error("Failed to fetch featured playlists");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CustomResponse<FeaturedPlaylistsResponse> = {
    status: "Success",
    message: `✅ Featured Playlists fetched successfully`,
    data: featuredPlaylistsPayload(result),
  };

  return c.json(parseBool(camel) ? toCamelCase(response) : response);
});

get.get("/charts", async (c) => {
  const { page: p = "", n = "", raw = "", camel = "" } = c.req.query();

  const result: ChartRequest[] = await api(ch, { query: { p, n } });

  if (!result.length) {
    throw new Error("Failed to fetch charts");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CustomResponse<ChartResponse[]> = {
    status: "Success",
    message: `✅ Charts fetched successfully`,
    data: result.map(chartPayload),
  };

  return c.json(parseBool(camel) ? toCamelCase(response) : response);
});

get.get("/top-shows", async (c) => {
  const { page: p = "", n = "10", raw = "", camel = "" } = c.req.query();

  const result: TopShowsRequest = await api(ts, { query: { p, n } });

  if (!result.data.length) {
    throw new Error("Failed to fetch top shows");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CustomResponse<TopShowsResponse> = {
    status: "Success",
    message: `✅ Top Shows fetched successfully`,
    data: topShowsPayload(result),
  };

  return c.json(parseBool(camel) ? toCamelCase(response) : response);
});

get.get("/top-artists", async (c) => {
  const { page: p = "", n = "", raw = "", camel = "" } = c.req.query();

  const result: TopArtistRequest = await api(tar, { query: { p, n } });

  if (!result.top_artists.length) {
    throw new Error("Failed to fetch top artists");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CustomResponse<TopArtistResponse> = {
    status: "Success",
    message: `✅ Top Artists fetched successfully`,
    data: topArtistsPayload(result),
  };

  return c.json(parseBool(camel) ? toCamelCase(response) : response);
});

get.get("/top-albums", async (c) => {
  const { page: p = "", n = "10", raw = "", camel = "" } = c.req.query();

  const result: TopAlbumRequest = await api(tal, { query: { p, n } });

  if (!result.data.length) {
    throw new Error("Failed to fetch top albums");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CustomResponse<TopAlbumResponse> = {
    status: "Success",
    message: `✅ Top Albums fetched successfully`,
    data: topAlbumsPayload(result),
  };

  return c.json(parseBool(camel) ? toCamelCase(response) : response);
});

get.get("/featured-stations", async (c) => {
  const { page: p = "", n = "10", raw = "", camel = "" } = c.req.query();

  const result: RadioRequest[] = await api(fs, { query: { p, n } });

  if (!result.length) {
    throw new Error("Failed to fetch Featured Radio Stations");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CustomResponse<RadioResponse[]> = {
    status: "Success",
    message: `✅ Featured Radio Stations fetched successfully`,
    data: result.map(radioPayload),
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

  const query = { actor_ids: actor_id, song_id, language: lang };

  const result: SongRequest[] = await api(ats, { query });

  if (!result.length) {
    throw new Error(
      "Failed to fetch actor top songs, please provide a valid ID(s)"
    );
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CustomResponse<SongResponse[]> = {
    status: "Success",
    message: `✅ Actor Top Songs fetched successfully`,
    data: result.map(songPayload),
  };

  return c.json(parseBool(camel) ? toCamelCase(response) : response);
});

get.get("/footer-details", async (c) => {
  const {
    lang: language = "",
    page: p = "",
    n = "",
    raw = "",
    camel = "",
  } = c.req.query();

  if (!language) throw new Error("Language param is required");

  const result: FooterDetails = await api(fd, { query: { language, p, n } });

  if (!result.playlist.length) {
    throw new Error(
      "Failed to fetch footer details, please provide a valid language"
    );
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

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
