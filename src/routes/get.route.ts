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
import {
  chartPayload,
  featuredPlaylistsPayload,
  labelPayload,
  mixPayload,
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
  LabelRequest,
  LabelResponse,
  Lyrics,
  MixRequest,
  MixResponse,
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
  mix_details: md,
  label_details: ld,
  featured_stations: fs,
  actor_top_songs: ats,
  footer_details: fd,
  lyrics: l,
} = config.endpoint.get;

/* -----------------------------------------------------------------------------------------------
 * trending songs/albums/playlists
 * -----------------------------------------------------------------------------------------------*/

get.get("/trending", async (c) => {
  const {
    type: entity_type = "",
    lang = "",
    raw = "",
    camel = "",
  } = c.req.query();

  if (entity_type && !["song", "album", "playlist"].includes(entity_type)) {
    throw new Error("Invalid entity type");
  }

  const result: TrendingRequest = await api(t, {
    query: { entity_type, entity_language: validLangs(lang).split(",")[0] },
  });

  if (!result.length) throw new Error("Failed to fetch trending items");

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CustomResponse<TrendingResponse> = {
    status: "Success",
    message: "✅ Currently Trending fetched successfully",
    data: trendingPayload(result),
  };

  return c.json(parseBool(camel) ? toCamelCase(response) : response);
});

/* -----------------------------------------------------------------------------------------------
 * featured-playlists | charts | top-shows | top-artists | top-albums | featured-stations
 * -----------------------------------------------------------------------------------------------*/

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

/* -----------------------------------------------------------------------------------------------
 * actor's top songs
 * -----------------------------------------------------------------------------------------------*/

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

/* -----------------------------------------------------------------------------------------------
 * footer details
 * -----------------------------------------------------------------------------------------------*/

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

/* -----------------------------------------------------------------------------------------------
 * lyrics
 * -----------------------------------------------------------------------------------------------*/

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

/* -----------------------------------------------------------------------------------------------
 * mix's details
 * -----------------------------------------------------------------------------------------------*/

get.get("/mix", async (c) => {
  const {
    token = "",
    link = "",
    page: p = "",
    n = "20",
    lang = "",
    raw = "",
    camel = "",
  } = c.req.query();

  if (!link && !token) throw new Error("Please provide a valid token or link");
  if (link && !(isJioSaavnLink(link) && link.includes("mix")))
    throw new Error("Please provide a valid link");

  const query = {
    token: token ? token : tokenFromLink(link),
    type: "mix",
    p,
    n,
    language: validLangs(lang),
  };

  const result: MixRequest = await api(md, { query });

  if (!result.id) {
    throw new Error(
      "Failed to fetch mix details, please provide a valid token or link"
    );
  }

  if (parseBool(raw)) return c.json(result);

  const response: CustomResponse<MixResponse> = {
    status: "Success",
    message: `✅ Mix Details fetched successfully`,
    data: mixPayload(result),
  };

  return c.json(parseBool(camel) ? toCamelCase(response) : response);
});

/* -----------------------------------------------------------------------------------------------
 * label details
 * -----------------------------------------------------------------------------------------------*/

get.get("/label", async (c) => {
  const {
    token = "",
    link = "",
    page: p = "",
    n_song = "10",
    n_album = "10",
    cat: category = "", // ["latest", "alphabetical", "popularity"]
    sort: sort_order = "", // ["asc", "desc"]
    lang = "",
    raw = "",
    camel = "",
  } = c.req.query();

  if (!link && !token) throw new Error("Please provide a token or a link");
  if (link && !(isJioSaavnLink(link) && link.includes("label")))
    throw new Error("Please provide a valid link");

  const query = {
    token: token ? token : tokenFromLink(link),
    type: "label",
    p,
    n_song,
    n_album,
    category,
    sort_order,
    language: validLangs(lang),
  };

  const result: LabelRequest = await api(ld, { query });

  if (!result.labelId) {
    throw new Error(
      "Failed to fetch label details, please provide a valid token or link"
    );
  }

  if (parseBool(raw)) return c.json(result);

  const response: CustomResponse<LabelResponse> = {
    status: "Success",
    message: `✅ Label Details fetched successfully`,
    data: labelPayload(result),
  };

  return c.json(parseBool(camel) ? toCamelCase(response) : response);
});
