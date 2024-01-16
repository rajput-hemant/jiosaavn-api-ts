import { decode } from "entities";

import { createImageLinks, parseBool } from "../lib/utils";
import { MiniResponse } from "../types/misc";
import {
  ArtistRecoRequest,
  ArtistRecoResponse,
  CityModRequest,
  CityModResponse,
  DiscoverRequest,
  DiscoverResponse,
  Module,
  ModuleResponse,
  ModulesMiniResponse,
  ModulesRequest,
  PromoRequest,
  PromoResponse,
  TagMixRequest,
  TagMixResponse,
} from "../types/modules";
import { albumPayload } from "./album.payload";
import { chartPayload, radioPayload, trendingPayload } from "./get.payload";
import { miniPayload } from "./misc.payload";
import { playlistPayload } from "./playlist.payload";
import { songPayload } from "./song.payload";

export function modulesPayload(
  m: ModulesRequest,
  mini: boolean = false
): ModuleResponse | ModulesMiniResponse {
  const {
    artist_recos: ar,
    browse_discover: bd,
    charts: c,
    city_mod: cm,
    global_config: { random_songs_listid: rsl, weekly_top_songs_listid: wts },
    new_albums: na,
    new_trending: nt,
    radio: r,
    tag_mixes: tm,
    top_playlists: tp,
    modules: {
      artist_recos: ar_mod,
      charts: c_mod,
      city_mod: cm_mod,
      new_albums: na_mod,
      new_trending: nt_mod,
      radio: r_mod,
      tag_mixes: tm_mod,
      top_playlists: tp_mod,
    },
  } = m;

  const promos = Object.keys(m)
    .filter((key) => key.includes("promo"))
    .reduce(
      (acc, key, i) => {
        acc[`promo${i}`] = {
          title: decode(m.modules[key].title),
          subtitle: decode(m.modules[key].subtitle),
          position: m.modules[key].position,
          source: `promo${i}`,
          featured_text: decode(m.modules[key].featured_text ?? ""),
          data: m[key].map((p) => (mini ? miniPayload(p) : promoPayload(p))),
        };

        return acc;
      },
      {} as Record<string, Module<PromoResponse | MiniResponse>>
    );

  return {
    trending: {
      title: decode(nt_mod.title),
      subtitle: decode(nt_mod.subtitle),
      position: nt_mod.position,
      source: "/get/trending",
      featured_text: decode(nt_mod.featured_text ?? ""),
      data: mini ? nt.map(miniPayload) : trendingPayload(nt),
    },

    charts: {
      title: decode(c_mod.title),
      subtitle: decode(c_mod.subtitle),
      position: c_mod.position,
      source: "/get/charts",
      featured_text: decode(c_mod?.featured_text ?? ""),
      data: c.map((c) => (mini ? miniPayload(c) : chartPayload(c))),
    },

    albums: {
      title: decode(na_mod.title),
      subtitle: decode(na_mod.subtitle),
      position: na_mod.position,
      source: "/get/albums",
      featured_text: decode(na_mod.featured_text ?? ""),
      data: na.map((a) =>
        mini
          ? miniPayload(a)
          : a.type === "song"
            ? songPayload(a)
            : albumPayload(a)
      ),
    },

    playlists: {
      title: decode(tp_mod.title),
      subtitle: decode(tp_mod.subtitle),
      position: tp_mod.position,
      source: "/get/featured-playlists",
      featured_text: decode(tp_mod.featured_text ?? ""),
      data: tp.map((p) => (mini ? miniPayload(p) : playlistPayload(p))),
    },

    radio: {
      title: decode(r_mod.title),
      subtitle: decode(r_mod.subtitle),
      position: r_mod.position,
      source: "/get/featured-stations",
      featured_text: decode(r_mod.featured_text ?? ""),
      data: r.map((r) => (mini ? miniPayload(r) : radioPayload(r))),
    },

    artist_recos: {
      title: decode(ar_mod?.title ?? ""),
      subtitle: decode(ar_mod?.subtitle ?? ""),
      position: ar_mod?.position ?? 0,
      source: "artist_recos|artistRecos",
      featured_text: decode(ar_mod?.featured_text ?? ""),
      data: ar
        ? ar.map((a) => (mini ? miniPayload(a) : artistRecoPayload(a)))
        : [],
    },

    discover: {
      title: "",
      subtitle: "",
      position: 0,
      source: "discover",
      data: bd.map((d) => (mini ? miniPayload(d) : discoverPayload(d))),
    },

    city_mod: {
      title: decode(cm_mod?.title ?? ""),
      subtitle: decode(cm_mod?.subtitle ?? ""),
      position: cm_mod?.position ?? 0,
      source: "city_mod|cityMod",
      featured_text: decode(cm_mod?.featured_text ?? ""),
      data: cm
        ? cm.map((c) => (mini ? miniPayload(c) : cityModPayload(c)))
        : [],
    },

    mixes: {
      title: decode(tm_mod?.title ?? ""),
      subtitle: decode(tm_mod?.subtitle ?? ""),
      position: tm_mod?.position ?? 0,
      source: "mixes",
      featured_text: decode(tm_mod?.featured_text ?? ""),
      data: tm ? tm.map((t) => (mini ? miniPayload(t) : tagMixPayload(t))) : [],
    },

    ...promos,

    global_config: {
      random_songs_listid: rsl,
      weekly_top_songs_listid: wts,
    },
  };
}

function artistRecoPayload(a: ArtistRecoRequest): ArtistRecoResponse {
  const {
    id,
    title,
    subtitle,
    type,
    image,
    perma_url: url,
    explicit_content,
    more_info: { featured_station_type, query, station_display_text },
  } = a;

  return {
    id,
    name: decode(title),
    subtitle: decode(subtitle),
    type,
    url,
    image: createImageLinks(image),
    explicit: parseBool(explicit_content),
    query,
    featured_station_type,
    station_display_text: decode(station_display_text),
  };
}

function discoverPayload(d: DiscoverRequest): DiscoverResponse {
  const {
    id,
    title,
    subtitle,
    type,
    image,
    perma_url: url,
    explicit_content,
    more_info: {
      badge,
      is_featured,
      sub_type,
      video_thumbnail,
      video_url,
      tags,
    },
  } = d;

  return {
    id,
    name: decode(title),
    subtitle: decode(subtitle),
    type,
    url,
    explicit: parseBool(explicit_content),
    image: image,
    badge,
    is_featured: parseBool(is_featured),
    video_thumbnail,
    video_url,
    sub_type,
    tags,
  };
}

function cityModPayload(c: CityModRequest): CityModResponse {
  const {
    id,
    title,
    subtitle,
    type,
    image,
    perma_url: url,
    explicit_content,
    more_info,
  } = c;

  return {
    id,
    name: decode(title),
    subtitle: decode(subtitle),
    type,
    url,
    image: createImageLinks(image),
    explicit: parseBool(explicit_content),
    query: more_info?.query,
    album_id: more_info?.album_id,
    featured_station_type: more_info?.featured_station_type,
  };
}

function tagMixPayload(t: TagMixRequest): TagMixResponse {
  const {
    id,
    title,
    subtitle,
    type,
    perma_url: url,
    explicit_content,
    image,
    language,
    list,
    list_count,
    list_type,
    play_count,
    year,
    more_info: { firstname: first_name, lastname: last_name },
  } = t;

  return {
    id,
    name: decode(title),
    subtitle: decode(subtitle),
    type,
    url,
    explicit: parseBool(explicit_content),
    image: createImageLinks(image),
    first_name,
    last_name,
    language,
    list,
    list_count: +list_count,
    list_type: list_type,
    play_count: +play_count,
    year: +year,
  };
}

function promoPayload(p: PromoRequest): PromoResponse {
  const {
    id,
    title,
    subtitle,
    type,
    perma_url: url,
    explicit_content,
    image,
    language,
    list,
    list_type,
    play_count,
    year,
    more_info: { editorial_language, release_year, square_image },
    list_count,
  } = p;

  return {
    id,
    name: decode(title),
    subtitle: decode(subtitle),
    type,
    url,
    explicit: parseBool(explicit_content),
    image: createImageLinks(square_image ?? image),
    language,
    list,
    list_count: list_count ? +list_count : undefined,
    list_type: list_type,
    play_count: play_count ? +play_count : undefined,
    year: year ? +year : undefined,
    editorial_language,
    release_year: release_year ? +release_year : undefined,
  };
}
