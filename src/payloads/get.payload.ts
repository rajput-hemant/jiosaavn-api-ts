import { decode } from "entities";

import { createImageLinks, parseBool } from "../lib/utils";
import {
  ChartRequest,
  ChartResponse,
  FeaturedPlaylistsRequest,
  FeaturedPlaylistsResponse,
  LabelRequest,
  LabelResponse,
  MixRequest,
  MixResponse,
  RadioRequest,
  RadioResponse,
  TopAlbumRequest,
  TopAlbumResponse,
  TopArtistRequest,
  TopArtistResponse,
  TopShowRequest,
  TopShowResponse,
  TopShowsRequest,
  TopShowsResponse,
  TrendingPodcastsRequest,
  TrendingPodcastsResponse,
  TrendingRequest,
  TrendingResponse,
} from "../types/get";
import { MiniResponse } from "../types/misc";
import { albumPayload } from "./album.payload";
import { miniPayload } from "./misc.payload";
import { playlistPayload } from "./playlist.payload";
import { songPayload } from "./song.payload";

export function trendingPayload(
  t: TrendingRequest,
  mini: boolean = false
): TrendingResponse | MiniResponse[] {
  return t.map((i) =>
    mini
      ? miniPayload(i)
      : i.type === "song"
      ? songPayload(i)
      : i.type === "album"
      ? albumPayload(i)
      : playlistPayload(i)
  );
}

export function featuredPlaylistsPayload(
  f: FeaturedPlaylistsRequest,
  mini: boolean = false
): FeaturedPlaylistsResponse {
  return {
    count: f.count,
    last_page: f.last_page,
    data: f.data.map((p) => (mini ? miniPayload(p) : playlistPayload(p))),
  };
}

export function chartPayload(c: ChartRequest): ChartResponse {
  const {
    id,
    title,
    subtitle,
    type,
    image,
    perma_url: url,
    explicit_content,
    listname,
    language,
    more_info,
  } = c;

  return {
    id,
    name: decode(title),
    listname,
    subtitle: decode(subtitle ?? ""),
    type,
    url,
    explicit: explicit_content ? parseBool(explicit_content) : false,
    image: createImageLinks(image),
    first_name: decode(more_info?.firstname ?? ""),
    language: language,
    count: c.count ?? more_info?.song_count,
  };
}

function topShowPayload(s: TopShowRequest): TopShowResponse {
  const {
    id,
    title,
    subtitle,
    type,
    image,
    perma_url: url,
    explicit_content,
    more_info: { badge, release_date, season_number },
  } = s;

  return {
    id,
    name: decode(title),
    subtitle: decode(subtitle),
    type,
    image: createImageLinks(image),
    url,
    explicit: parseBool(explicit_content),
    badge,
    release_date,
    season_number: +season_number,
  };
}

function trendingPodcastsPayload(
  p: TrendingPodcastsRequest
): TrendingPodcastsResponse {
  const {
    items,
    module: { title, subtitle },
  } = p;

  return {
    items: items.map((i) => ({
      id: i.id,
      name: decode(i.title),
      subtitle: decode(i.subtitle),
      type: i.type,
      image: createImageLinks(i.image),
      url: i.perma_url,
      explicit: parseBool(i.explicit_content),
    })),
    module: { title, subtitle, source: "client" },
  };
}
export function topShowsPayload(s: TopShowsRequest): TopShowsResponse {
  const { last_page, data, trendingPodcasts } = s;

  return {
    count: data.length,
    last_page: last_page,
    data: data.map(topShowPayload),
    trending_podcasts: trendingPodcasts.map(trendingPodcastsPayload),
  };
}

export function topArtistsPayload(a: TopArtistRequest): TopArtistResponse {
  return a.top_artists.map((a) => {
    const {
      artistid: id,
      name,
      image,
      perma_url: url,
      is_followed,
      follower_count,
    } = a;

    return {
      id,
      name: decode(name),
      image: createImageLinks(image),
      url,
      is_followed,
      follower_count,
    };
  });
}

export function topAlbumsPayload(
  a: TopAlbumRequest,
  mini: boolean = false
): TopAlbumResponse | MiniResponse[] {
  const { count, last_page, data } = a;

  return {
    count,
    last_page,
    data: data.map((a) =>
      mini
        ? miniPayload(a)
        : a.type === "song"
        ? songPayload(a)
        : albumPayload(a)
    ),
  };
}

export function radioPayload(r: RadioRequest): RadioResponse {
  const {
    id,
    title,
    subtitle,
    type,
    perma_url: url,
    explicit_content,
    image,
    more_info: {
      featured_station_type,
      language,
      station_display_text,
      color,
      description,
      query,
    },
  } = r;

  return {
    id,
    name: decode(title),
    subtitle: decode(subtitle),
    type,
    url,
    explicit: parseBool(explicit_content),
    image: createImageLinks(image),
    featured_station_type,
    language,
    station_display_text: station_display_text,
    color,
    description,
    query,
  };
}

export function mixPayload(m: MixRequest, mini: boolean = false): MixResponse {
  const {
    id,
    title,
    subtitle,
    header_desc,
    type,
    perma_url: url,
    image,
    language,
    year,
    play_count,
    explicit_content,
    list_count,
    list_type,
    list,
    more_info: {
      uid: user_id,
      last_updated,
      username,
      firstname,
      lastname,
      is_followed,
      share,
    },
    // modules: { list: l },
  } = m;

  return {
    id,
    name: decode(title),
    subtitle: decode(subtitle),
    header_desc: decode(header_desc),
    type,
    url,
    image: createImageLinks(image),
    language,
    year: +year,
    play_count: +play_count,
    explicit: parseBool(explicit_content),
    list_count: +list_count,
    list_type,
    songs: list.map((s) => songPayload(s, mini)),
    user_id,
    last_updated,
    username,
    firstname,
    lastname,
    is_followed: parseBool(is_followed),
    share: +share,
    // modules: {
    //   list: {
    //     title: l.title,
    //     subtitle: l.subtitle,
    //     source: "songs",
    //     position: l.position,
    //   },
    // },
  };
}

export function labelPayload(
  l: LabelRequest,
  mini: boolean = false
): LabelResponse {
  const {
    labelId: id,
    name,
    image,
    topSongs: { songs, total: s_t },
    topAlbums: { albums, total: a_t },
    urls,
    availableLanguages: available_languages,
  } = l;

  return {
    id,
    name: decode(name),
    image: createImageLinks(image),
    top_songs: { songs: songs.map((s) => songPayload(s, mini)), total: s_t },
    top_albums: {
      albums: albums.map((a) => (mini ? miniPayload(a) : albumPayload(a))),
      total: a_t,
    },
    urls,
    available_languages,
  };
}
