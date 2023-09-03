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
  ModulePlaylistRequest,
  ModulePlaylistResponse,
  ModuleResponse,
  ModulesRequest,
  PromoRequest,
  PromoResponse,
  RadioRequest,
  RadioResponse,
  TagMixRequest,
  TagMixResponse,
  TrendingRequest,
  TrendingResponse,
} from "../types/modules";
import { albumPayload } from "./album";

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
          featuredText: m.modules[key].featured_text,
          data: m[key].map(promoPayload),
        };

        return acc;
      },
      {} as Record<string, Module<PromoResponse>>
    );

  return {
    albums: {
      title: newAlbumsMod.title ?? "",
      subtitle: newAlbumsMod.subtitle ?? "",
      featuredText: newAlbumsMod.featured_text,
      data: new_albums ? new_albums.map(albumPayload) : [],
    },

    artistRecos: {
      title: artistRecosMod?.title ?? "",
      subtitle: artistRecosMod?.subtitle ?? "",
      featuredText: artistRecosMod?.featured_text,
      data: artist_recos ? artist_recos.map(artistRecoPayload) : [],
    },

    discover: browse_discover.map(discoverPayload),

    charts: {
      title: chartsMod?.title ?? "",
      subtitle: chartsMod?.subtitle ?? "",
      featuredText: chartsMod?.featured_text,
      data: charts.map(chartPayload),
    },

    cityMod: {
      title: cityModMod?.title ?? "",
      subtitle: cityModMod?.subtitle ?? "",
      featuredText: cityModMod?.featured_text,
      data: city_mod ? city_mod.map(cityModPayload) : [],
    },

    globalConfig: global_config,

    trending: {
      title: newTrendingMod?.title ?? "",
      subtitle: newTrendingMod?.subtitle ?? "",
      featuredText: newTrendingMod?.featured_text,
      data: new_trending.map(trendingPayload),
    },

    radio: {
      title: radioMod?.title ?? "",
      subtitle: radioMod?.subtitle ?? "",
      featuredText: radioMod?.featured_text,
      data: radio.map(radioPayload),
    },

    mixes: {
      title: tagMixesMod?.title ?? "",
      subtitle: tagMixesMod?.subtitle ?? "",
      featuredText: tagMixesMod?.featured_text,
      data: tag_mixes ? tag_mixes.map(tagMixPayload) : [],
    },

    playlists: {
      title: topPlaylistsMod?.title ?? "",
      subtitle: topPlaylistsMod?.subtitle ?? "",
      featuredText: topPlaylistsMod?.featured_text,
      data: top_playlists ? top_playlists?.map(modulePlaylistPayload) : [],
    },

    ...promos,
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
    explicit: parseBool(explicit_content),
    image: createImageLinks(image),
    featuredStationtype: featured_station_type,
    query: query,
    stationDisplayText: station_display_text,
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
    more_info: { badge, is_featured, sub_type, video_thumbnail, video_url },
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
    isFeatured: parseBool(is_featured),
    videoThumbnail: video_thumbnail,
    videoUrl: video_url,
    subtype: sub_type,
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
    explicit: parseBool(explicit_content),
    image: createImageLinks(image),
    firstname: c.more_info?.firstname,
    songCount: c.more_info?.song_count,
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

function trendingPayload(t: TrendingRequest): TrendingResponse {
  const {
    id,
    title: name,
    subtitle,
    type,
    image,
    perma_url: url,
    explicit_content,
    language,
    list,
    list_count,
    list_type,
    play_count,
    year,
  } = t;

  return {
    id,
    name,
    subtitle,
    type,
    url,
    explicit: parseBool(explicit_content),
    image: createImageLinks(image),
    language,
    list,
    listCount: +list_count,
    listtype: list_type,
    playCount: +play_count,
    year: +year,
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
    featuredStationtype: featured_station_type,
    language,
    stationDisplayText: station_display_text,
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
    more_info: { firstname, lastname },
  } = t;

  return {
    id,
    name,
    subtitle,
    type,
    url,
    explicit: parseBool(explicit_content),
    image: createImageLinks(image),
    firstname,
    lastname,
    language,
    list,
    listCount: +list_count,
    listtype: list_type,
    playCount: +play_count,
    year: +year,
  };
}

function modulePlaylistPayload(
  p: ModulePlaylistRequest
): ModulePlaylistResponse {
  const {
    id,
    title: name,
    subtitle,
    type,
    perma_url: url,
    explicit_content,
    image,
    more_info: {
      firstname,
      follower_count,
      last_updated,
      song_count,
      uid: userId,
    },
  } = p;

  return {
    id,
    name,
    subtitle,
    type,
    url,
    explicit: parseBool(explicit_content),
    image: createImageLinks(image),
    firstname,
    followerCount: +follower_count,
    lastUpdated: +last_updated,
    songCount: +song_count,
    userId,
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
    more_info,
  } = p;

  return {
    id,
    name,
    subtitle,
    type,
    url,
    explicit: parseBool(explicit_content),
    image: createImageLinks(image),
    language,
    list,
    listCount: +(p.list_count ?? 0),
    listType: list_type,
    playCount: +(play_count ?? 0),
    year: +(year ?? 0),
    editorialLanguage: more_info?.editorial_language,
    position: +(more_info?.position ?? 0),
    releaseYear: +(more_info?.release_year ?? 0),
    squareImage: more_info?.square_image,
  };
}
