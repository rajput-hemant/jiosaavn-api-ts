import { createDownloadLinks, createImageLinks, parseBool } from "../lib/utils";
import {
  SongModulesRequest,
  SongModulesResponse,
  SongObjRequest,
  SongObjResponse,
  SongRequest,
  SongResponse,
} from "../types/song";
import { artistMapPayload } from "./artist.payload";

export function songObjPayload(s: SongObjRequest): SongObjResponse {
  const { songs, modules } = s;

  return {
    songs: songs.map(songPayload),
    modules: modules ? songModulesPayload(modules) : undefined,
  };
}

export function songPayload(s: SongRequest): SongResponse {
  const {
    id,
    title: name,
    subtitle,
    type,
    header_desc,
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
      music,
      album_id,
      album,
      label,
      song,
      origin,
      is_dolby_content,
      "320kbps": _320kbps,
      encrypted_media_url,
      album_url,
      duration,
      rights,
      has_lyrics,
      lyrics_snippet,
      starred,
      artistMap,
      release_date,
      triller_available,
      copyright_text,
      lyrics_id,
      label_url,
      vcode,
      vlink,
    },
  } = s;

  return {
    id,
    name,
    subtitle,
    type,
    url,
    image: createImageLinks(image),
    language,
    year: +year,
    header_desc,
    play_count: +play_count,
    explicit: parseBool(explicit_content),
    list,
    list_type,
    list_count: +list_count,
    music,
    artist_map: artistMapPayload(artistMap),
    song,
    album,
    album_id,
    album_url,
    label,
    label_url,
    origin,
    is_dolby_content,
    "320kbps": parseBool(_320kbps),
    download_url: createDownloadLinks(encrypted_media_url),
    duration: +duration,
    rights,
    has_lyrics: parseBool(has_lyrics),
    lyrics_id,
    lyrics_snippet,
    starred: parseBool(starred),
    release_date: release_date ?? "",
    triller_available,
    copyright_text,
    vcode,
    vlink,
  };
}

export function songModulesPayload(s: SongModulesRequest): SongModulesResponse {
  const {
    reco: r,
    currentlyTrending: c,
    songsBysameArtists: s_ar,
    songsBysameActors: s_ac,
    artists: a,
  } = s;

  return {
    recommend: {
      title: r.title,
      subtitle: r.subtitle,
      position: r.position,
      source: "/song/recommend",
      params: {
        id: r.source_params.pid,
        lang: r.source_params.language,
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
    songs_by_same_artists: {
      title: s_ar.title,
      subtitle: s_ar.subtitle,
      position: s_ar.position,
      source: "/artist/top-songs",
      params: {
        artist_id: s_ar.source_params.artist_ids,
        song_id: s_ar.source_params.song_id,
        lang: s_ar.source_params.language,
      },
    },
    songs_by_same_actors: {
      title: s_ac.title,
      subtitle: s_ac.subtitle,
      position: s_ac.position,
      source: "/get/actor-top-songs",
      params: {
        actor_id: s_ac.source_params.actor_ids,
        song_id: s_ac.source_params.song_id,
        lang: s_ac.source_params.language,
      },
    },
    artists: {
      title: a.title,
      subtitle: a.subtitle,
      position: a.position,
      source: a.source,
    },
  };
}
