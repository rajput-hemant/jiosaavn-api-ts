import { PlaylistRequest, PlaylistResponse } from "../types/playlist";
import { artistMiniPayload } from "./artist";
import { songPayload } from "./song";

export function playlistPayload(p: PlaylistRequest): PlaylistResponse {
  const {
    id,
    title: name,
    subtitle,
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
      uid,
      username,
      video_count,
    },
  } = p;

  return {
    id,
    name,
    subtitle,
    type,
    url,
    image,
    language,
    year: +year,
    playCount: +play_count,
    explicit: !!explicit_content,
    listCount: +list_count,
    listType: list_type,
    userId: uid,
    isDolbyContent: is_dolby_content,
    lastUpdated: +last_updated,
    username,
    firstname,
    lastname,
    followerCount: +follower_count,
    fanCount: +fan_count.replace(/,/g, ""),
    share: +share,
    videoCount: +video_count,
    artists: artists.map(artistMiniPayload),
    songs: typeof list === "string" ? [] : list.map(songPayload),
    subtitleDesc: subtitle_desc,
  };
}
