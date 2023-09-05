import { createImageLinks, parseBool } from "../lib/utils";
import {
  ArtistRecoRequest,
  ArtistRecoResponse,
  ChartRequest,
  ChartResponse,
  CityModRequest,
  CityModResponse,
  DiscoverRequest,
  DiscoverResponse,
  Module,
  ModuleResponse,
  ModulesRequest,
  PromoRequest,
  PromoResponse,
  RadioRequest,
  RadioResponse,
  TagMixRequest,
  TagMixResponse,
} from "../types/modules";
import { albumPayload } from "./album";
import { playlistPayload } from "./playlist";
import { songPayload } from "./song";

export function modulesPayload(m: ModulesRequest): ModuleResponse {
  const {
    artist_recos,
    browse_discover,
    charts,
    city_mod,
    global_config,
    new_albums,
    new_trending,
    radio,
    tag_mixes,
    top_playlists,
    modules: {
      artist_recos: artistRecosMod,
      charts: chartsMod,
      city_mod: cityModMod,
      new_albums: newAlbumsMod,
      new_trending: newTrendingMod,
      radio: radioMod,
      tag_mixes: tagMixesMod,
      top_playlists: topPlaylistsMod,
    },
  } = m;

  const promos = Object.keys(m)
    .filter((key) => key.includes("promo"))
    .reduce(
      (acc, key, i) => {
        acc[`promo${i}`] = {
          title: m.modules[key].title,
          subtitle: m.modules[key].subtitle,
          position: m.modules[key].position,
          source: `promo${i}`,
          featured_text: m.modules[key].featured_text,
          data: m[key].map(promoPayload),
        };

        return acc;
      },
      {} as Record<string, Module<PromoResponse>>
    );

  return {
    trending: {
      title: newTrendingMod.title,
      subtitle: newTrendingMod.subtitle,
      position: newTrendingMod.position,
      source: "/get/trending",
      featured_text: newTrendingMod.featured_text,
      data: new_trending.map((i) =>
        i.type === "song"
          ? songPayload(i)
          : i.type === "album"
          ? albumPayload(i)
          : playlistPayload(i)
      ),
    },

    charts: {
      title: chartsMod.title,
      subtitle: chartsMod.subtitle,
      position: chartsMod.position,
      source: "/get/charts",
      featured_text: chartsMod?.featured_text,
      data: charts.map(chartPayload),
    },

    albums: {
      title: newAlbumsMod.title,
      subtitle: newAlbumsMod.subtitle,
      position: newAlbumsMod.position,
      source: "/get/albums",
      featured_text: newAlbumsMod.featured_text,
      data: new_albums.map((a) =>
        a.type === "song" ? songPayload(a) : albumPayload(a)
      ),
    },

    playlists: {
      title: topPlaylistsMod.title,
      subtitle: topPlaylistsMod.subtitle,
      position: topPlaylistsMod.position,
      source: "/get/featured-playlists",
      featured_text: topPlaylistsMod.featured_text,
      data: top_playlists.map(playlistPayload),
    },

    radio: {
      title: radioMod.title,
      subtitle: radioMod.subtitle,
      position: radioMod.position,
      source: "/get/featured-stations",
      featured_text: radioMod.featured_text,
      data: radio.map(radioPayload),
    },

    artist_recos: {
      title: artistRecosMod?.title ?? "",
      subtitle: artistRecosMod?.subtitle ?? "",
      position: artistRecosMod?.position ?? -1,
      source: "artist_recos|artistRecos",
      featured_text: artistRecosMod?.featured_text,
      data: artist_recos ? artist_recos.map(artistRecoPayload) : [],
    },

    discover: {
      title: "",
      subtitle: "",
      position: -1,
      source: "N/A",
      data: browse_discover.map(discoverPayload),
    },

    city_mod: {
      title: cityModMod?.title ?? "",
      subtitle: cityModMod?.subtitle ?? "",
      position: cityModMod?.position ?? -1,
      source: "city_mod|cityMod",
      featured_text: cityModMod?.featured_text,
      data: city_mod ? city_mod.map(cityModPayload) : [],
    },

    mixes: {
      title: tagMixesMod?.title ?? "",
      subtitle: tagMixesMod?.subtitle ?? "",
      position: tagMixesMod?.position ?? -1,
      source: "mixes",
      featured_text: tagMixesMod?.featured_text,
      data: tag_mixes ? tag_mixes.map(tagMixPayload) : [],
    },

    ...promos,

    global_config: global_config,
  };
}

function artistRecoPayload(a: ArtistRecoRequest): ArtistRecoResponse {
  const {
    id,
    title: name,
    subtitle,
    type,
    image,
    perma_url: url,
    explicit_content,
    more_info: { featured_station_type, query, station_display_text },
  } = a;

  return {
    id,
    name,
    subtitle,
    type,
    url,
    image: createImageLinks(image),
    explicit: parseBool(explicit_content),
    query,
    featured_station_type,
    station_display_text,
  };
}

function discoverPayload(d: DiscoverRequest): DiscoverResponse {
  const {
    id,
    title: name,
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
    name,
    subtitle,
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

function chartPayload(c: ChartRequest): ChartResponse {
  const {
    id,
    title: name,
    subtitle,
    type,
    image,
    perma_url: url,
    explicit_content,
  } = c;

  return {
    id,
    name,
    subtitle,
    type,
    url,
    explicit: explicit_content ? parseBool(explicit_content) : undefined,
    image: createImageLinks(image),
    first_name: c.more_info?.firstname,
    song_count: c.more_info?.song_count,
  };
}

function cityModPayload(c: CityModRequest): CityModResponse {
  const {
    id,
    title: name,
    subtitle,
    type,
    image,
    perma_url: url,
    explicit_content,
  } = c;

  return {
    id,
    name,
    subtitle,
    type,
    url,
    image: createImageLinks(image),
    explicit: parseBool(explicit_content),
  };
}

function radioPayload(r: RadioRequest): RadioResponse {
  const {
    id,
    title: name,
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
    name,
    subtitle,
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

function tagMixPayload(t: TagMixRequest): TagMixResponse {
  const {
    id,
    title: name,
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
    name,
    subtitle,
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
    title: name,
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
    name,
    subtitle,
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
