import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import {
  isJioSaavnLink,
  parseBool,
  tokenFromLink,
  validLangs,
} from "../lib/utils";
import {
  chartPayload,
  featuredPlaylistsPayload,
  labelPayload,
  megaMenuPayload,
  mixPayload,
  radioPayload,
  topAlbumsPayload,
  topArtistsPayload,
  topShowsPayload,
  trendingPayload,
} from "../payloads/get.payload";
import { miniPayload } from "../payloads/misc.payload";
import { songPayload } from "../payloads/song.payload";
import {
  CGetFooterDetails,
  CGetLabelResponse,
  CGetLyricsResponse,
  CGetMegaMenuResponse,
  CGetMixResponse,
  CGetTrendingResponse,
  CGetXResponse,
  ChartRequest,
  FeaturedPlaylistsRequest,
  FooterDetails,
  LabelRequest,
  Lyrics,
  MegaMenuRequest,
  MixRequest,
  RadioRequest,
  TopAlbumRequest,
  TopArtistRequest,
  TopShowsRequest,
  TrendingRequest,
} from "../types/get";
import { CSongsResponse, SongRequest } from "../types/song";

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
  lyrics: l,
  footer_details: fd,
  mega_menu: mm,
} = config.endpoint.get;

/* -----------------------------------------------------------------------------------------------
 * Trending Route Handler - /get/trending
 * -----------------------------------------------------------------------------------------------*/

get.get("/trending", async (c) => {
  const {
    type: entity_type = "",
    lang = "",
    raw = "",
    mini = "",
  } = c.req.query();

  if (entity_type && !["song", "album", "playlist"].includes(entity_type)) {
    throw new Error("Invalid entity type");
  }

  let result: TrendingRequest = await api(t, {
    query: { entity_type, entity_language: validLangs(lang).split(",")[0] },
  });

  if (!result.length) {
    result = await api(t, {
      query: { entity_language: validLangs(lang).split(",")[0] },
    });

    result = result.filter((t) => t.type === entity_type);

    if (!result.length) throw new Error("Failed to fetch trending items");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CGetTrendingResponse = {
    status: "Success",
    message: "✅ Currently Trending fetched successfully",
    data: trendingPayload(result, parseBool(mini)),
  };

  return c.json(response);
});

/* -----------------------------------------------------------------------------------------------
 * Featured Playlists/Charts/Top Shows/Top Artists/Top Albums/Featured Stations Route Handler
 * - /get/{featured-playlists|charts|top-shows|top-artists|top-albums|featured-stations}
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
  const {
    page: p = "1",
    n = "20",
    lang = "",
    raw = "",
    mini = "",
  } = c.req.query();

  const _featuredPlaylistsPayload = (f: FeaturedPlaylistsRequest) =>
    featuredPlaylistsPayload(f, parseBool(mini));

  const _chartPayload = (c: ChartRequest[]) =>
    c.map((c) => (mini ? miniPayload(c) : chartPayload(c)));

  const _topAlbumsPayload = (t: TopAlbumRequest) =>
    topAlbumsPayload(t, parseBool(mini));

  const [endpoint, payloadFn] = (
    {
      "featured-playlists": [fp, _featuredPlaylistsPayload],
      charts: [ch, _chartPayload],
      "top-shows": [ts, topShowsPayload],
      "top-artists": [tar, topArtistsPayload],
      "top-albums": [tal, _topAlbumsPayload],
      "featured-stations": [fs, (s: RadioRequest[]) => s.map(radioPayload)],
    } as Record<string, [Path, <T, U>(a: T) => Required<U>]>
  )[path];

  type A =
    | FeaturedPlaylistsRequest
    | ChartRequest[]
    | TopShowsRequest
    | TopArtistRequest
    | TopAlbumRequest
    | RadioRequest[];

  const result: A = await api(endpoint, {
    query: { p, n, languages: validLangs(lang) },
  });

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

  const response: CGetXResponse = {
    status: "Success",
    message: `✅ ${payloadName} fetched successfully`,
    data: payloadFn(result),
  };

  return c.json(response);
});

/* -----------------------------------------------------------------------------------------------
 * Actor Top Songs Route Handler - /get/actor-top-songs
 * -----------------------------------------------------------------------------------------------*/

get.get("/actor-top-songs", async (c) => {
  const {
    actor_id = "",
    song_id = "",
    lang = "",
    raw = "",
    mini = "",
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

  const response: CSongsResponse = {
    status: "Success",
    message: `✅ Actor Top Songs fetched successfully`,
    data: result.map((s) => songPayload(s, parseBool(mini))),
  };

  return c.json(response);
});

/* -----------------------------------------------------------------------------------------------
 * Footer Details Route Handler - /get/footer-details
 * -----------------------------------------------------------------------------------------------*/

get.get("/footer-details", async (c) => {
  const { lang = "", page: p = "", n = "", raw = "" } = c.req.query();

  if (!lang) throw new Error("Language param is required");

  const result: FooterDetails = await api(fd, {
    query: { language: validLangs(lang).split(",").at(0) ?? "hindi", p, n },
  });

  // if (!result.playlist.length) {
  //   throw new Error(
  //     "Failed to fetch footer details, please provide a valid language"
  //   );
  // }

  if (parseBool(raw)) return c.json(result);

  const response: CGetFooterDetails = {
    status: "Success",
    message: `✅ Footer Details fetched successfully`,
    data: result,
  };

  return c.json(response);
});

/* -----------------------------------------------------------------------------------------------
 * Lyrics Route Handler - /get/lyrics
 * -----------------------------------------------------------------------------------------------*/

get.get("/lyrics", async (c) => {
  const { id: lyrics_id = "", raw = "" } = c.req.query();

  if (!lyrics_id) throw new Error("Songs/Lyrics ID is required");

  const result: Lyrics = await api(l, { query: { lyrics_id } });

  if (!result.lyrics) {
    throw new Error("Invalid ID or Lyrics not available for the song");
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const response: CGetLyricsResponse = {
    status: "Success",
    message: `✅ Footer Details fetched successfully`,
    data: result,
  };

  return c.json(response);
});

/* -----------------------------------------------------------------------------------------------
 * Mix details Route Handler - /get/mix
 * -----------------------------------------------------------------------------------------------*/

get.get("/mix", async (c) => {
  const {
    token = "",
    link = "",
    page: p = "",
    n = "20",
    lang = "",
    raw = "",
    mini = "",
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

  const response: CGetMixResponse = {
    status: "Success",
    message: `✅ Mix Details fetched successfully`,
    data: mixPayload(result, parseBool(mini)),
  };

  return c.json(response);
});

/* -----------------------------------------------------------------------------------------------
 * Label details Route Handler - /get/label
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
    mini = "",
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

  const response: CGetLabelResponse = {
    status: "Success",
    message: `✅ Label Details fetched successfully`,
    data: labelPayload(result, parseBool(mini)),
  };

  return c.json(response);
});

/* -----------------------------------------------------------------------------------------------
 * Mega Menu Route Handler - /get/mega-menu
 * -----------------------------------------------------------------------------------------------*/

get.get("/mega-menu", async (c) => {
  const { entity = "", lang = "", raw = "" } = c.req.query();

  const result: MegaMenuRequest = await api(mm, {
    query: {
      is_entity_page: `${parseBool(entity)}`,
      language: validLangs(lang),
    },
  });

  if (parseBool(raw)) return c.json(result);

  const response: CGetMegaMenuResponse = {
    status: "Success",
    message: `✅ Mega Menu Details fetched successfully`,
    data: megaMenuPayload(result),
  };

  return c.json(response);
});
