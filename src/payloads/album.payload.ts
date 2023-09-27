import { createImageLinks, parseBool } from "../lib/utils";
import {
  AlbumModulesRequest,
  AlbumModulesResponse,
  AlbumRequest,
  AlbumResponse,
} from "../types/album";
import { artistMapPayload } from "./artist.payload";
import { songPayload } from "./song.payload";

export function albumPayload(
  a: AlbumRequest,
  mini: boolean = false
): AlbumResponse {
  const {
    id,
    title: name,
    type,
    subtitle,
    language,
    play_count,
    explicit_content,
    year,
    perma_url: url,
    header_desc,
    list_count,
    list_type,
    image,
    more_info: {
      artistMap,
      song_count,
      is_dolby_content,
      copyright_text,
      label_url,
    },
    list,
    modules,
  } = a;

  return {
    id,
    name,
    subtitle:
      subtitle ||
      (artistMap ? artistMap.artists.map((a) => a.name).join(", ") : ""),
    type,
    language,
    play_count: +play_count,
    explicit: parseBool(explicit_content),
    year: +year,
    url,
    header_desc,
    list_count: +list_count,
    list_type,
    image: createImageLinks(image),
    artist_map: artistMap ? artistMapPayload(artistMap) : undefined,
    song_count: song_count ? +song_count : undefined,
    is_dolby_content,
    copyright_text,
    label_url,
    songs:
      !list || typeof list === "string"
        ? []
        : list.map((s) => songPayload(s, mini)),
    modules: modules ? albumModulesPayload(modules) : undefined,
  };
}

export function albumModulesPayload(
  a: AlbumModulesRequest
): AlbumModulesResponse {
  const {
    reco: r,
    currentlyTrending: c,
    topAlbumsFromSameYear: t,
    artists: ar,
  } = a;

  return {
    recommend: {
      title: r.title,
      subtitle: r.subtitle,
      position: r.position,
      source: "/album/recommend",
      params: {
        id: r.source_params.albumid,
      },
    },
    currently_trending: {
      title: c.title,
      subtitle: c.subtitle,
      position: c.position,
      source: "/get/trending",
      params: {
        type: c.source_params.entity_type,
        lang: c.source_params.entity_language,
      },
    },
    top_albums_from_same_year: {
      title: t.title,
      subtitle: t.subtitle,
      position: t.position,
      source: "/album/same-year",
      params: {
        year: t.source_params.album_year,
        lang: t.source_params.album_lang,
      },
    },
    artists: {
      title: ar.title,
      subtitle: ar.subtitle,
      position: ar.position,
      source: ar.source,
    },
  };
}
