import { createImageLinks } from "../lib/utils";
import {
  ArtistRecoRequest,
  ArtistRecoResponse,
  ChartRequest,
  ChartResponse,
  CityModRequest,
  CityModResponse,
  DiscoverRequest,
  DiscoverResponse,
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

/**
 * Utility function to convert the modules response to a more usable format
 *
 * @param m The modules request object
 * @returns The modules response object
 */
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
      "promo:vx:data:107": promo107Mod,
      "promo:vx:data:112": promo112Mod,
      "promo:vx:data:113": promo113Mod,
      "promo:vx:data:114": promo114Mod,
      "promo:vx:data:116": promo116Mod,
      "promo:vx:data:118": promo118Mod,
      "promo:vx:data:176": promo176Mod,
      "promo:vx:data:185": promo185Mod,
      "promo:vx:data:49": promo49Mod,
      "promo:vx:data:68": promo68Mod,
      "promo:vx:data:76": promo76Mod,
      "promo:vx:data:90": promo90Mod,
    },
    "promo:vx:data:107": promo107,
    "promo:vx:data:112": promo112,
    "promo:vx:data:113": promo113,
    "promo:vx:data:114": promo114,
    "promo:vx:data:116": promo116,
    "promo:vx:data:118": promo118,
    "promo:vx:data:176": promo176,
    "promo:vx:data:185": promo185,
    "promo:vx:data:49": promo49,
    "promo:vx:data:68": promo68,
    "promo:vx:data:76": promo76,
    "promo:vx:data:90": promo90,
  } = m;

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

    promo107: {
      title: promo107Mod?.title ?? "",
      subtitle: promo107Mod?.subtitle ?? "",
      featuredText: promo107Mod?.featured_text,
      data: promo107 ? promo107?.map(promoPayload) : [],
    },

    promo112: {
      title: promo112Mod?.title ?? "",
      subtitle: promo112Mod?.subtitle ?? "",
      featuredText: promo112Mod?.featured_text,
      data: promo112 ? promo112?.map(promoPayload) : [],
    },

    promo113: {
      title: promo113Mod?.title ?? "",
      subtitle: promo113Mod?.subtitle ?? "",
      featuredText: promo113Mod?.featured_text,
      data: promo113 ? promo113?.map(promoPayload) : [],
    },

    promo114: {
      title: promo114Mod?.title ?? "",
      subtitle: promo114Mod?.subtitle ?? "",
      featuredText: promo114Mod?.featured_text,
      data: promo114 ? promo114?.map(promoPayload) : [],
    },

    promo116: {
      title: promo116Mod?.title ?? "",
      subtitle: promo116Mod?.subtitle ?? "",
      featuredText: promo116Mod?.featured_text,
      data: promo116 ? promo116?.map(promoPayload) : [],
    },

    promo118: {
      title: promo118Mod?.title ?? "",
      subtitle: promo118Mod?.subtitle ?? "",
      featuredText: promo118Mod?.featured_text,
      data: promo118 ? promo118?.map(promoPayload) : [],
    },

    promo176: {
      title: promo176Mod?.title ?? "",
      subtitle: promo176Mod?.subtitle ?? "",
      featuredText: promo176Mod?.featured_text,
      data: promo176 ? promo176?.map(promoPayload) : [],
    },

    promo185: {
      title: promo185Mod?.title ?? "",
      subtitle: promo185Mod?.subtitle ?? "",
      featuredText: promo185Mod?.featured_text,
      data: promo185 ? promo185?.map(promoPayload) : [],
    },

    promo49: {
      title: promo49Mod?.title ?? "",
      subtitle: promo49Mod?.subtitle ?? "",
      featuredText: promo49Mod?.featured_text,
      data: promo49 ? promo49?.map(promoPayload) : [],
    },

    promo68: {
      title: promo68Mod?.title ?? "",
      subtitle: promo68Mod?.subtitle ?? "",
      featuredText: promo68Mod?.featured_text,
      data: promo68 ? promo68?.map(promoPayload) : [],
    },

    promo76: {
      title: promo76Mod?.title ?? "",
      subtitle: promo76Mod?.subtitle ?? "",
      featuredText: promo76Mod?.featured_text,
      data: promo76 ? promo76?.map(promoPayload) : [],
    },

    promo90: {
      title: promo90Mod?.title ?? "",
      subtitle: promo90Mod?.subtitle ?? "",
      featuredText: promo90Mod?.featured_text,
      data: promo90 ? promo90?.map(promoPayload) : [],
    },
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
    explicit: !!explicit_content,
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
    explicit: !!explicit_content,
    image: image,
    badge,
    isFeatured: !!is_featured,
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
    explicit: !!explicit_content,
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
    explicit: !!explicit_content,
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
    explicit: !!explicit_content,
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
    explicit: !!explicit_content,
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
    explicit: !!explicit_content,
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
    explicit: !!explicit_content,
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
    explicit: !!explicit_content,
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
