import { decode } from "entities";

import { dedupArtists, parseBool } from "../lib/utils";
import {
  PlaylistModulesRequest,
  PlaylistModulesResponse,
  PlaylistRequest,
  PlaylistResponse,
} from "../types/playlist";
import { artistMiniPayload } from "./artist.payload";
import { songPayload } from "./song.payload";

export function playlistPayload(
  p: PlaylistRequest,
  mini: boolean = false
): PlaylistResponse {
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
      artists,
      fan_count,
      firstname,
      follower_count,
      is_dolby_content,
      last_updated,
      lastname,
      share,
      subtitle_desc,
      uid: user_id,
      username,
      video_count,
    },
    modules,
  } = p;

  function getSongs() {
    return !list || typeof list === "string" ? [] : list;
  }

  return {
    id,
    name: decode(title),
    subtitle: decode(subtitle),
    type,
    header_desc: decode(header_desc ?? ""),
    url,
    image,
    language,
    year: year ? +year : undefined,
    play_count: play_count ? +play_count : undefined,
    explicit: parseBool(explicit_content),
    list_count: list_count ? +list_count : undefined,
    list_type,
    user_id,
    is_dolby_content,
    last_updated: last_updated
      ? new Date(+last_updated * 1000).toISOString()
      : undefined,
    username,
    firstname,
    lastname,
    follower_count: follower_count ? +follower_count : undefined,
    fan_count: fan_count ? +fan_count.replace(/,/g, "") : undefined,
    share: share ? +share : undefined,
    video_count: video_count ? +video_count : undefined,
    artists: artists
      ? dedupArtists(artists?.map(artistMiniPayload))
      : undefined,
    songs: getSongs().map((s) => songPayload(s, mini)),
    subtitle_desc: subtitle_desc,
    modules: modules ? playlistModulesPayload(modules) : undefined,
  };
}

type PlaylistModulesPayload = (
  m: PlaylistModulesRequest
) => PlaylistModulesResponse;

export const playlistModulesPayload: PlaylistModulesPayload = (m) => {
  const { relatedPlaylist: r, currentlyTrendingPlaylists: c, artists: a } = m;

  return {
    related_playlist: {
      title: r.title,
      subtitle: r.subtitle,
      source: "/playlist/recommend",
      position: r.position,
      params: {
        id: r.source_params.listid,
      },
    },
    currently_trending_playlists: {
      title: c.title,
      subtitle: c.subtitle,
      source: "/get/trending",
      position: c.position,
      params: {
        type: c.source_params.entity_type,
        lang: c.source_params.entity_language,
      },
    },
    artists: {
      title: a.title,
      subtitle: a.subtitle,
      source: a.source,
      position: a.position,
    },
  };
};
